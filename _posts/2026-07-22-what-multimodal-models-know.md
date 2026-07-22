---
layout: post
title: "What Multimodal Models Know but Don't Say"
date: 2026-07-22
excerpt_separator: <!--more-->
categories: [machine-learning, research, projects, thesis]
tags: [multimodal, vision-language-models, evaluation, LLM-as-judge, OVEN, Qwen3-VL, reinforcement-learning]
image: /assets/images/thesis_ranking_flip.png
---

My MSc thesis started as an attempt to make vision-language models more accurate at open-world recognition. It ended up somewhere more interesting: showing that the instruments we measure these models with are not neutral, and that a lenient judge and a strict audit can flip the ranking of the same models on the same data.

<!--more-->

*By Juan Camacho Mohedano — MSc thesis, University of Trento*

## The Problem Nobody Can Score

Large multimodal models can look at a photo and name what's in it in free-form text, with no fixed label set. That's what makes open-world recognition possible — and evaluation surprisingly hard.

![Four levels of specificity, all correct](/assets/images/thesis_specificity_ladder.png)
*The specificity problem in one picture. Standard accuracy fixes one rung as the target and marks the others wrong.*

This is not a corner case, it's the central difficulty. When a model answers "dog" for a Labrador, accuracy alone cannot tell you whether the model lacked the knowledge or simply answered at the wrong level of detail. Those are completely different failures with completely different fixes, and a single number blends them together.

## The Detour That Became the Thesis

I began with a method, not a measurement problem. **Test-Time Warm-Up** adapts the model to each individual image, label-free, before it answers. It worked — it lifted zero-shot performance on fine-grained datasets.

But watching *how* it worked was the turning point. Warm-up widened the set of answers the model was willing to consider without sharpening the one it actually produced. The model noticed more about each image, yet still had no idea how specific an answer the task wanted. Chasing accuracy on a target that was never well-defined suddenly looked like the wrong goal, so I changed the question from "how do I raise this number" to "what does this number actually measure".

## Measuring Knowledge Instead of Guessing At It

The framework I built runs on [OVEN](https://open-vision-language.github.io/oven/), an open-domain recognition benchmark whose entities are grounded in the Wikidata taxonomy. For each image it draws **256 stochastic samples** from the model, checks each with a second language model acting as judge, and maps predictions onto the taxonomy so near-misses can be scored rather than discarded.

The key design decision is to keep two things apart that accuracy normally fuses:

- **Coverage** (pass@256) — does the correct entity appear *anywhere* across the samples?
- **Reliability** (pass@1) — does the model produce it on the *first* attempt?

Separating them immediately shows something a single score hides.

![Coverage versus reliability for four model sizes](/assets/images/thesis_knows_vs_says.png)
*Each bar spans what a model says once to what it knows somewhere. The gap is the hidden knowledge.*

The 2B model reaches the correct entity for 73% of images but leads with it in only 16%. Conventional single-attempt evaluation would file that away as a 16% model. It knows roughly four and a half times more than it reliably says.

## The Result I Didn't Expect

Coverage alone produces something strange: the 2B model appears to cover *more* of the visual world (0.731) than the 4B (0.651) and 8B (0.611) models. Scale seemingly runs backwards.

It doesn't. The judge was told to accept answers at the question's level of specificity, and the small model exploits that by answering with parent categories. So I added a **specificity-preserving audit**: an answer counts only if it is verifiably at least as specific as the ground truth.

![The model ranking flips between the two scoring rules](/assets/images/thesis_ranking_flip.png)
*Same models, same images, same samples. Only the definition of "correct" changes — and the order changes with it.*

Under the audit the ordering becomes cleanly monotonic — 0.311, 0.319, 0.334, 0.512 — and bigger is unambiguously better at every sampling budget. The 2B model's apparent breadth was an artifact of a lenient judge, not a fact about its knowledge. The receipts are in the under-specificity rate: **7.9%** of the 2B model's accepted answers name a parent category rather than the target entity, against **1.3%** for the 32B.

This is a granularity leniency, and as far as I can tell it's a distinct failure mode from the position, verbosity, and self-enhancement biases already documented for LLM judges.

## Can the Hidden Knowledge Be Surfaced?

If the knowledge is in there, can we get it out reliably? Three attempts, three different answers:

- **Recombining the model's own samples** helps at small sampling budgets, but it only reorganises knowledge the model already has. No new knowledge appears.
- **A structured prompt that walks the model down the taxonomy** genuinely does raise specificity at test time.
- **Training that behaviour in with outcome-only reinforcement learning** (GRPO) sharpens the *format* the prompt already produced without making the answers more accurate.

Taxonomy-aware reasoning, in short, can be prompted for but not cheaply trained in.

## What I'd Take Away

The thread running through all of it is that measurement instruments have opinions. A lenient judge and a strict audit ranked the same four models on the same data in different orders, and neither ranking is wrong — they answer different questions. Open-world systems should be measured with several metrics under several notions of correctness, and **the gap between those measurements is often the most informative quantity you have**. The distance between what a model knows and what it says is exactly where the interesting research problems live.

---

*The figures in this post were generated with [tldraw](https://tldraw.dev) driven programmatically and exported to SVG — the technique is written up in the repo if you're curious.*
