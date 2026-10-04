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

*By Juan Camacho Mohedano, MSc in Artificial Intelligence Systems, University of Trento. Thesis supervised by [Elisa Ricci](https://mhug.disi.unitn.it/people/elisa-ricci/) and [Marco Garosi](https://www.marcogarosi.it/). All figures below are from my thesis and defence presentation unless noted otherwise.*

<!--more-->

## The Problem Nobody Can Score

Large multimodal models can look at a photo and name what's in it in free-form text, with no fixed label set. That's what makes open-world recognition possible, and it's also what makes evaluation surprisingly hard.

![Four levels of specificity for one photograph, all true of the image, but flat accuracy marks three of them wrong](/assets/images/thesis_specificity_ladder.png)
*Every rung is true of the photograph, but standard accuracy designates exactly one as the target. Figure from my defence presentation.*

This is not a corner case, it's the central difficulty. When a model answers "dog" for a Labrador, accuracy alone cannot tell you whether the model lacked the knowledge or simply answered at the wrong level of detail. Those are completely different failures with completely different fixes, and a single number blends them together.

## The Detour That Became the Thesis

I began with a method, not a measurement problem. **Test-Time Warm-Up** ([full report, PDF](/assets/files/TTW_research_project.pdf)) adapts the model to each individual image, label-free, before it answers. And it worked: it lifted zero-shot performance on fine-grained datasets, with the largest breadth gain on Oxford Pets.

![Test-Time Warm-Up gains across five datasets: breadth improves while specificity stays flat or falls](/assets/images/thesis_ttw_results.png)
*Warm-up raises breadth (blue) while specificity (red) stays flat or falls. Datasets: Oxford Pets, Flowers102, UCF101, DTD, Caltech101. Figure from my defence presentation.*

Watching *how* it worked was the turning point. The blue bars go up and the red bars don't: warm-up widened the set of answers the model was willing to consider without sharpening the one it actually produced. The model noticed more about each image, yet still had no idea how specific an answer the task wanted.

![Qualitative examples where warm-up finds the right region of concept space but stops short of the target entity](/assets/images/thesis_ttw_qualitative.png)
*The same pattern per image: warm-up moves the prediction closer without reaching the ground-truth entity. Images from Flowers102 (Nilsback and Zisserman, 2008) and Oxford-IIIT Pets (Parkhi et al., 2012).*

Chasing accuracy on a target that was never well-defined suddenly looked like the wrong goal. So I changed the question from "how do I raise this number" to "what does this number actually measure".

## Measuring Knowledge Instead of Guessing At It

The framework runs on **OVEN** (Hu et al., ICCV 2023), an open-domain recognition benchmark whose entities are grounded in Wikidata, so every answer can be placed on a real taxonomy rather than compared as a string.

![The OVEN task: an image and a question map to a Wikidata entity, which sits on a subclass chain from specific entity up to root](/assets/images/thesis_oven_task.png)
*OVEN maps each image to a Wikipedia/Wikidata entity, which gives every target a subclass chain. A parent label always exists, so the gap between the generic and the specific answer can be measured. Figure from my defence presentation; benchmark by Hu et al. (2023).*

That taxonomy is what makes the measurement possible. For each image the framework draws **256 stochastic samples**, checks each with a second language model acting as judge, and maps predictions onto the Wikidata subclass chain so near-misses earn partial credit instead of being discarded.

![The evaluation pipeline: sample 256 rollouts, judge each one, map onto the taxonomy, then split into coverage and reliability](/assets/images/thesis_pipeline.png)
*Sample, judge, map, then split the result two ways instead of averaging it into one number. Figure from my defence presentation.*

The key design decision is the split on the right:

- **Coverage** (pass@256): does the correct entity appear *anywhere* across the samples?
- **Reliability** (pass@1): does the model produce it on the *first* attempt?

Keeping them apart immediately shows something a single score hides. The 2B model reaches the correct entity for 73% of images but leads with it in only 16%. Conventional single-attempt evaluation would file that away as a 16% model: it knows roughly four and a half times more than it reliably says.

## The Result I Didn't Expect

Coverage alone produces something strange: the 2B model appears to cover *more* of the visual world (0.731) than the 4B (0.651) and 8B (0.611) models. Scale seemingly runs backwards.

It doesn't. The judge was told to accept answers at the question's level of specificity, and the small model exploits that by answering with parent categories. So I added a **specificity-preserving audit**: an answer counts only if it is verifiably at least as specific as the ground truth.

![Slopegraph: under a lenient judge 2B ranks second, under the specificity audit it ranks last](/assets/images/thesis_ranking_flip.png)
*Same models, same images, same samples. Only the definition of "correct" changes, and 2B falls from second to last. Figure from my defence presentation.*

Under the audit the ordering becomes cleanly monotonic (0.311, 0.319, 0.334, 0.512), and bigger is unambiguously better at every sampling budget. The 2B model's apparent breadth was an artifact of a lenient judge, not a fact about its knowledge. The receipts are in the under-specificity rate: **7.9%** of the 2B model's accepted answers name a parent category rather than the target entity, against **1.3%** for the 32B.

The obvious objection is that I simply picked a bad judge. So I re-ran the comparison with different judge models.

![The same ranking reversal reproduced with a Gemma judge](/assets/images/thesis_judge_class.png)
*The reversal reproduces across judges. It is a property of the instrument class, not of one model's quirks. Figure from my defence presentation.*

This is a **granularity leniency**, and as far as I can tell it is a distinct failure mode from the position, verbosity, and self-enhancement biases already documented for LLM judges.

## Can the Hidden Knowledge Be Surfaced?

If the knowledge is in there, can we get it out reliably? Three attempts, three different answers.

**Recombining the model's own samples** helps at small sampling budgets, but only reorganises knowledge the model already has: with the same 16 candidate answers it nearly doubles coverage, yet adds nothing new to the pool.

**A structured prompt that walks the model down the taxonomy** genuinely does raise specificity at test time.

![The taxonomy traversal prompt and the specificity gains it produces](/assets/images/thesis_traversal.png)
*Walking the model down the taxonomy (structure, building, place of worship, Notre-Dame de Paris) buys specificity at inference time. Figure from my defence presentation.*

**Training that behaviour in with outcome-only reinforcement learning** (GRPO) sharpens the *format* the prompt already produced without making the answers more accurate. Taxonomy-aware reasoning, in short, can be prompted for but not cheaply trained in.

## What I'd Take Away

The thread running through all of it is that measurement instruments have opinions. A lenient judge and a strict audit ranked the same four models on the same data in different orders, and neither ranking is wrong: they answer different questions. Open-world systems should be measured with several metrics under several notions of correctness, and **the gap between those measurements is often the most informative quantity you have**. The distance between what a model knows and what it says is exactly where the interesting research problems live.

The code for the whole thing (the sampling harness, the judge, the taxonomy mapping and the GRPO training) is at [oven-mllm-eval](https://github.com/jucamohedano/oven-mllm-eval).

---

### Sources

- Figures are from my MSc thesis and defence presentation, University of Trento, 2026.
- **OVEN benchmark**: Hu, Luan, Chen, Khandelwal, Joshi, Lee, Toutanova and Chang, *Open-domain Visual Entity Recognition: Towards Recognizing Millions of Wikipedia Entities*, ICCV 2023.
- **Entity taxonomy**: [Wikidata](https://www.wikidata.org) P279 subclass relations.
- **Models evaluated**: the Qwen3-VL family at 2B, 4B, 8B and 32B.
- **Datasets in the warm-up experiments**: Oxford-IIIT Pets (Parkhi et al., 2012), Flowers102 (Nilsback and Zisserman, 2008), UCF101 (Soomro et al., 2012), DTD (Cimpoi et al., 2014), Caltech101 (Fei-Fei et al., 2007).
