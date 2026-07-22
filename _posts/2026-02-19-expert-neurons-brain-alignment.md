---
layout: post
title: "Do a Language Model's Expert Neurons Think Like a Brain?"
date: 2026-02-19
excerpt_separator: <!--more-->
categories: [machine-learning, research, projects]
tags: [interpretability, expert-neurons, RSA, fMRI, GPT-2, brain-alignment, neuroscience]
image: /assets/images/experts_concept_graph.png
---

Language models align with human brain activity during language processing — but why? Is it because every neuron contributes a little, or because a sparse set of "expert" neurons carries the semantics? For my Artificial and Biological Neural Systems project at Trento, I took the expert neurons out of GPT-2 and compared their representational geometry directly against fMRI recordings from nine people.

<!--more-->

*By Juan Camacho*

## The Question

Prior work on model-brain alignment mostly *imposes* the alignment: fit a linear map from model activations to brain activity, or prune features against human data until they match. Both assume brain-aligned structure has to be built by optimizing against human measurements.

Mechanistic interpretability suggests something more interesting: maybe that structure is already in the model. The [ExpertLens](https://arxiv.org/abs/2510.10154) line of work identifies **expert neurons** — sparse, concept-specific units whose overlap patterns reconstruct human similarity judgments with no transformation at all. Those experts were validated against *behavioral* judgments, though. Whether they match how the brain actually encodes those same concepts was untested.

So: **do expert neurons align with fMRI better than the dense layer embeddings they're drawn from?**

## Methodology

The project has no diagram in the report, so here is the pipeline in one picture. The 60 concrete nouns from Mitchell et al. (2008) are the shared input: one branch runs them through GPT-2, the other through the brain, and Representational Similarity Analysis compares the two geometries.

<div class="figure-svg">
<svg viewBox="0 0 640 810" role="img" aria-label="Methodology pipeline: 60 concrete nouns feed a model branch (sentence generation, GPT-2 activations, expert scoring, unique-expert filtering, expert RDM) and a brain branch (fMRI responses, tessellation, brain RDM), which converge in Representational Similarity Analysis and a paired statistical test." xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--border-color)"/>
    </marker>
    <style>
      .bx { fill: var(--code-bg); stroke: var(--border-color); stroke-width: 1; }
      .bx-accent { fill: var(--callout-bg); stroke: var(--accent); stroke-width: 1.5; }
      .t { font-family: "Red Hat Display", sans-serif; font-size: 13px; font-weight: 700; fill: var(--heading-color); }
      .d { font-family: "Red Hat Display", sans-serif; font-size: 11px; fill: var(--text-color); }
      .lane { font-family: "Red Hat Display", sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; fill: var(--accent); }
      .ln { stroke: var(--border-color); stroke-width: 1.5; fill: none; }
    </style>
  </defs>

  <rect class="bx" x="170" y="16" width="300" height="54" rx="10"/>
  <text class="t" x="320" y="38" text-anchor="middle">60 concrete nouns</text>
  <text class="d" x="320" y="56" text-anchor="middle">Mitchell et al. (2008), 12 semantic categories</text>

  <path class="ln" d="M 320 70 V 88 H 160 V 110" marker-end="url(#ar)"/>
  <path class="ln" d="M 320 70 V 88 H 480 V 110" marker-end="url(#ar)"/>

  <text class="lane" x="20" y="106">MODEL SIDE</text>
  <text class="lane" x="340" y="106">BRAIN SIDE</text>

  <rect class="bx" x="20" y="116" width="280" height="78" rx="10"/>
  <text class="t" x="36" y="140">Sentence generation</text>
  <text class="d" x="36" y="160">Qwen3-30B, chain-of-thought via DSPy</text>
  <text class="d" x="36" y="178">400 positive / 1,000 negative per concept</text>

  <rect class="bx" x="340" y="116" width="280" height="78" rx="10"/>
  <text class="t" x="356" y="140">fMRI responses</text>
  <text class="d" x="356" y="160">9 participants viewing each noun</text>
  <text class="d" x="356" y="178">6 presentations averaged per word</text>

  <path class="ln" d="M 160 194 V 214" marker-end="url(#ar)"/>
  <path class="ln" d="M 480 194 V 214" marker-end="url(#ar)"/>

  <rect class="bx" x="20" y="214" width="280" height="78" rx="10"/>
  <text class="t" x="36" y="238">GPT-2 Small activations</text>
  <text class="d" x="36" y="258">12 blocks &#215; 4 sub-layers</text>
  <text class="d" x="36" y="276">82,944 neurons recorded per sentence</text>

  <rect class="bx" x="340" y="214" width="280" height="78" rx="10"/>
  <text class="t" x="356" y="238">Tessellation</text>
  <text class="d" x="356" y="258">2 &#215; 10 &#215; 5 grid = 100 spatial bins</text>
  <text class="d" x="356" y="276">~87 regions with at least 5 voxels</text>

  <path class="ln" d="M 160 292 V 312" marker-end="url(#ar)"/>
  <path class="ln" d="M 480 292 V 312" marker-end="url(#ar)"/>

  <rect class="bx" x="20" y="312" width="280" height="78" rx="10"/>
  <text class="t" x="36" y="336">Expert scoring</text>
  <text class="d" x="36" y="356">Average Precision per neuron</text>
  <text class="d" x="36" y="374">keep AP &#8805; &#964;, pool across 60 concepts</text>

  <rect class="bx" x="340" y="312" width="280" height="78" rx="10"/>
  <text class="t" x="356" y="336">Brain RDM</text>
  <text class="d" x="356" y="356">60 &#215; 60 per region</text>
  <text class="d" x="356" y="374">1 &#8722; correlation of voxel patterns</text>

  <path class="ln" d="M 160 390 V 410" marker-end="url(#ar)"/>

  <rect class="bx-accent" x="20" y="410" width="280" height="78" rx="10"/>
  <text class="t" x="36" y="434">Unique experts</text>
  <text class="d" x="36" y="454">correlation graph, connected components</text>
  <text class="d" x="36" y="472">keep highest-AP neuron per group</text>

  <path class="ln" d="M 160 488 V 508" marker-end="url(#ar)"/>

  <rect class="bx" x="20" y="508" width="280" height="78" rx="10"/>
  <text class="t" x="36" y="532">Expert RDM</text>
  <text class="d" x="36" y="552">60 &#215; 60 over pooled expert units</text>
  <text class="d" x="36" y="570">1 &#8722; correlation of activation patterns</text>

  <path class="ln" d="M 160 586 V 604 H 220 V 620" marker-end="url(#ar)"/>
  <path class="ln" d="M 480 390 V 604 H 420 V 620" marker-end="url(#ar)"/>

  <rect class="bx-accent" x="120" y="620" width="400" height="70" rx="10"/>
  <text class="t" x="320" y="648" text-anchor="middle">Representational Similarity Analysis</text>
  <text class="d" x="320" y="668" text-anchor="middle">Spearman correlation over the 1,770 upper-triangle pairs</text>

  <path class="ln" d="M 320 690 V 724" marker-end="url(#ar)"/>

  <rect class="bx" x="120" y="724" width="400" height="70" rx="10"/>
  <text class="t" x="320" y="752" text-anchor="middle">Expert vs dense embeddings</text>
  <text class="d" x="320" y="772" text-anchor="middle">paired t-test per region, Benjamini-Hochberg FDR</text>
</svg>
</div>

*The pipeline. The accent-coloured boxes are where this project departs from prior work: the unique-expert filter, and the RSA comparison against brain data that had not been done before.*

A few details worth pulling out of that diagram:

**Defining a concept by discrimination, not definition.** Each of the 60 nouns gets 400 sentences that contain it and 1,000 that don't, stratified over the other 59 concepts. Every neuron is then treated as a binary classifier for "is this concept present?", and scored by Average Precision — the area under its precision-recall curve when sentences are ranked by activation. Neurons above a threshold are that concept's experts. With AP ≥ 0.5, concepts average 819 experts out of 82,944 neurons, ranging from 224 (*glass*) to 2,018 (*screwdriver*).

**Filtering redundant experts.** This was my methodological addition. Some experts have near-identical activation profiles, so they inflate a concept's apparent footprint. Naively dropping the weaker neuron of each correlated pair is order-dependent and misses transitivity: if A-B and B-C both correlate but A-C doesn't, all three still belong together. Modelling it as a graph and taking connected components gives a deterministic grouping, from which I keep the single highest-AP representative. Redundancy turned out to be low — under 3% at a 0.8 correlation threshold, and 27 of 60 concepts had none at all at 0.9.

## Experts Organise Concepts Like People Do

Before touching brain data, a sanity check: do expert sets reproduce human semantic categories? Measuring Jaccard overlap between concepts' expert sets and laying them out by multidimensional scaling gives clear category structure.

![Concept similarity graph from expert neuron overlap](/assets/images/experts_concept_graph.png)
*Concepts positioned by expert-set overlap. Clothing, vegetables, and vehicles form visible clusters without any supervision from human judgments.*

The strongest pairs are exactly the ones you'd predict: *dress-skirt* (27.3%), *lettuce-tomato* (19.8%), *arm-leg* (18.3%), *car-truck* (16.8%). Clothing dominates the top five. Cross-category overlap is substantially lower.

## The Brain Comparison

Now the actual question. For each of 87 valid brain regions and each GPT-2 sub-layer, I compared the expert RDM and the dense RDM against the brain RDM, then ran a paired t-test across the nine subjects.

![Expert vs dense RSA correlation per brain region](/assets/images/experts_rsa_scatter.png)
*Each point is a brain region, for the best MLP condition. Points above the diagonal are regions where expert neurons beat the dense embedding.*

**Expert neurons do align better than dense embeddings — modestly, and not everywhere.** The MLP projection layer is the standout: at AP ≥ 0.6 it reaches a mean effect size of *d* = 0.627 over the dense baseline, with 30 regions significant before correction and 3 surviving FDR. Attention layers help too, but need stricter filtering (best at AP ≥ 0.7, *d* = 0.536).

![RSA by component](/assets/images/experts_rsa_by_component.png)
*Alignment across all four sub-layer types. MLP components carry more brain-aligned semantic signal than attention.*

Two findings I didn't expect:

**Where the effect is largest isn't where correlation is highest.** Experts in `mlp.c_proj` correlate slightly *worse* with brain data than those in `mlp.c_fc` (ρ = 0.011 vs 0.017), yet show a much bigger advantage over dense (d = 0.627 vs 0.443). The reason is that the dense projection layer aligns poorly on its own (ρ = -0.005), so the expert signal stands out against a weaker baseline. The MLP output bottleneck concentrates semantics that the full layer dilutes.

**More selective is not better.** Push the AP threshold to 0.9 and alignment collapses — dramatically for attention (d = -0.929), where experts end up *worse* than dense. Extreme selectivity leaves too few neurons to describe a concept's geometry.

## Being Honest About the Numbers

The raw correlations are small (mean ρ ≈ 0.01) and most regions don't survive FDR correction across 87 comparisons. This is preliminary evidence, not a settled result. What holds up is the *direction*: the effect sizes are consistently positive for the best-performing layers, and consistent across subjects. Sparse, interpretable features appear to capture something of how the brain organises semantics — which is a claim worth testing at larger scale, with better-powered statistics and per-voxel normalisation.

## Takeaways

- Expert neurons align with fMRI representational geometry better than the dense embeddings containing them, in the layers where semantics concentrate.
- MLP sub-layers carry more brain-aligned signal than attention, and the MLP output projection shows the largest gain over its dense baseline.
- Selectivity has a sweet spot: moderate AP thresholds (0.5-0.7) work; very strict ones destroy the geometry.
- Expert redundancy in GPT-2 is low, so unique-expert filtering is a small correction here — it may matter more in larger models.

Code is at [experts-ml-selfcond](https://github.com/jucamohedano/experts-ml-selfcond), and the generated sentence dataset is [on Hugging Face](https://huggingface.co/datasets/jucamohedano/Qwen3-30B-A3B-Instruct-2507_custom_60_cot).
