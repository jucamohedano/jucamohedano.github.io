---
layout: post
title: "Right Answer, Wrong Reasons: Hunting Reasoning Shortcuts on RAVEN"
date: 2026-06-22
excerpt_separator: <!--more-->
categories: [machine-learning, research, projects]
tags: [neuro-symbolic, reasoning-shortcuts, RAVEN, DeepProbLog, rsbench, abstract-reasoning]
image: /assets/images/raven_3x3x3_example.png
---

Can a model get the right answer for the wrong reasons? For my Advanced ML project at Trento I extended the rsbench benchmark suite to Raven's Progressive Matrices, built a neuro-symbolic solver with DeepProbLog, and caught it red-handed: up to 0.91 answer F1 while two of its three concepts were pure noise.

<!--more-->

*By Juan Camacho*

## The Problem: Reasoning Shortcuts

Neuro-Symbolic (NeSy) models pair a neural perception module with a symbolic reasoning layer. The network extracts high-level concepts from raw inputs, and the reasoning layer combines those concepts with prior knowledge to produce an answer. The promise is trustworthiness: if the model answers correctly, it should be because it learned the right concepts and reasoned correctly over them.

Recent work on [rsbench](https://unitn-sml.github.io/rsbench/) showed this promise can fail quietly. A NeSy model can reach high task accuracy while assigning the *wrong meaning* to the concepts it learns: it finds a different concept-to-label mapping that still satisfies the knowledge on the training data. These are called **reasoning shortcuts**, and they make explanations and verification unreliable exactly where NeSy models are supposed to shine. Whether Raven's Progressive Matrices are susceptible to them was listed as an open question in the original rsbench paper, so that became the project.

## The Task: Raven's Progressive Matrices

A RAVEN problem is a 3x3 matrix of small greyscale images with the bottom-right cell missing. The first two rows establish rules over attributes like **Type** (shape), **Size**, and **Color**; the solver must pick which of eight candidate panels correctly completes the third row.

![Example RAVEN problem](/assets/images/raven_example_problem.png)
*An example RAVEN-style problem: the context matrix on top, the eight candidate panels below. Figure from the RAVEN paper's supplementary material.*

RAVEN is a great testbed for reasoning shortcuts because it has a clean perception/reasoning split: the generation grammar gives a precise list of ground-truth concepts and rules, so we can check exactly what the model *should* have learned. A symbolic solver with perfect perception scores 100%: the whole difficulty is grounding the concepts.

## RAVEN-3x3x3: A Dataset We Can Actually Reason Over

The original RAVEN attribute domains (5 types, 6 sizes, 10 colors) blow up the concept space beyond what a Deep Probabilistic Logic pipeline can handle cleanly. Filtering the existing dataset down didn't work: almost no samples survived. So we regenerated it from scratch: a single centered object with exactly **three values per attribute** (triangle/pentagon/circle, small/medium/large, white/grey/black), keeping all four rule families (Constant, Progression, Arithmetic, Distribute Three). We generated 5,000 problems in about 96 seconds, and the built-in symbolic solver verifies 100% on them.

![RAVEN-3x3x3 example problem](/assets/images/raven_3x3x3_example.png)
*A RAVEN-3x3x3 problem from our regenerated dataset: context matrix with the missing panel (left) and the eight candidates with the correct one highlighted (right).*

## The Model: RavenDPL

Our solver has two parts. A small shared MLP maps each of the 16 panels (8 context + 8 candidates) to per-attribute concept distributions. The reasoning layer then scores each candidate with pre-compiled logic tensors: a worlds-queries matrix answers "which rules does this row satisfy?", and an AND-rule table checks that the same rule explains all three rows. The whole thing is differentiable, so it trains end-to-end from just the answer index, and the concepts are never supervised directly.

One practical war story: in probability space the gradient starves at initialization (the gradient norm collapsed below 1e-7 within 5 steps), so all the scoring runs in log-space, with an entropy regularizer to keep the concept distributions from collapsing one-hot on the first step.

## The Shortcut Emerges

With entropy regularization and no concept supervision, three of five seeds escape the plateau and reach answer F1 up to **0.91**. Sounds great, until you look at the per-attribute concept quality:

![Per-attribute concept confusion matrices](/assets/images/raven_concept_confusions.png)
*Per-attribute concept confusion matrices for a representative run: Type (left) and Size (middle) are at chance, while Color (right) is recovered perfectly.*

**Color reaches F1 = 1.0, while Type and Size sit at chance (F1 around 0.33).** The model grounds one attribute, then covers for the other two by pairing each Color with a fixed Size:

![Size by Color pairwise confusion](/assets/images/raven_size_color_collapse.png)
*The Size-by-Color pairwise confusion: predictions concentrate on a few (Size, Color) cells instead of spreading over all nine: the model predicts Size from Color.*

That is a textbook reasoning shortcut: high label accuracy coexisting with corrupted concept semantics, completely invisible if you only monitor answer accuracy.

## Mitigation: A Little Supervision Goes a Long Way

Supervising concepts on just **1% of training samples** breaks the shortcut, but only if you supervise the right attributes. Supervising Type and Size together lifts answer F1 to **0.98** with all three attributes perfectly grounded and zero concept collapse. Supervising only one ignored attribute is not enough, and supervising Color does nothing (the model had already grounded it on its own).

## Does It Scale? RAVEN-4x4x4

We repeated the study with four values per attribute. Learning gets much harder: a stronger entropy weight and warmup are needed before any seed escapes, and the best unsupervised answer F1 drops to 0.54. But the shortcut itself is unchanged: Color gets grounded perfectly, Type and Size don't, and the same 1% concept supervision removes it (answer F1 0.96). The difficulty changes; the failure mode doesn't.

## Takeaways

- Raven's Progressive Matrices do admit reasoning shortcuts under NeSy training, answering the open question from the rsbench paper in the affirmative.
- The shortcut is invisible to task metrics and per-attribute collapse alone; you need per-attribute concept F1 and pairwise/joint collapse to see it.
- A tiny amount of targeted concept supervision (1% of samples, on the attributes the model ignores) removes it entirely.

The code lives in my [rsbench fork (raven branch)](https://github.com/jucamohedano/rsbench-code/tree/raven), with experiment logs on Weights & Biases for both [RAVEN-3x3x3](https://wandb.ai/jucamohedano/raven-3x3x3) and [RAVEN-4x4x4](https://wandb.ai/jucamohedano/raven-4x4x4).
