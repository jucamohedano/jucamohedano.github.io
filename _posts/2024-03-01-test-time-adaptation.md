---
layout: post
title: "Adventures in Test-Time Adaptation: Making ML Models Adapt on the Fly"
date: 2024-03-01
reading_time: 8
excerpt_separator: <!--more-->
categories: [machine-learning, research, projects]
tags: [test-time-adaptation, vision-language-models, CLIP, distribution-shift, cache-based-adaptation]
image: /assets/images/tda_waiting_list.png
---

Hello fellow ML enthusiasts! I'm excited to share our journey exploring the fascinating world of Test-Time Adaptation (TTA) that I embarked on with my amazing teammates Samuele Bolotta and Andrea De Carlo during our master's program. Get ready for some real talk about making stubborn ML models more flexible in the wild!

<!--more-->

## The Problem: When Your Model Meets the Real World

We've all been there - you train a beautiful model on pristine data, it performs wonderfully in the lab, and then... *reality hits*. Suddenly your model is encountering data it's never seen before, and performance drops faster than my motivation during finals week.

This is the classic problem of **distribution shift** - when test data differs significantly from training data. It's like preparing for a swimming competition but showing up to find out it's actually a marathon on sand. Not ideal, right?

## Enter Test-Time Adaptation (TTA)

Test-Time Adaptation is like giving your model a crash course right at the moment it needs to perform. Instead of the traditional "train once, deploy forever" approach, TTA enables models to dynamically adjust to new data distributions on the fly, without needing to be retrained or requiring labeled target data.

After diving deep into the literature (coffee-fueled late nights included), we categorized TTA approaches into five main strategies:

1. **Model Adaptation**: Directly tweaking the model's parameters
2. **Normalization Adaptation**: Adjusting the statistics in normalization layers
3. **Sample Adaptation**: Processing input samples before feeding them to the model
4. **Prompt Adaptation**: Optimizing the prompts given to models (especially for vision-language models)
5. **Inference Adaptation**: Modifying how inference works with techniques like caching

## Our Focus: Efficient TTA

For our project, we decided to focus on **Inference Adaptation** approaches, specifically Training Dynamic Adapter (TDA), which offers a clever way to adapt models without breaking the bank on computational resources.

Why TDA caught our attention:
- It uses a **caching mechanism** (think of it as a quick-reference guide for your model)
- It manages both **positive** and **negative** caches (knowing what something is NOT can be just as valuable)
- It's computationally efficient (no grad student wants to wait 3 days for results!)

## Experiments: The Fun Part!

We tested TDA across various datasets, including:

- **Out-of-Distribution (OOD) datasets**: ImageNet variants like ImageNet-A and ImageNet-R
- **Cross-Domain (CD) datasets**: Aircraft, Cars, Flowers102, and SUN397
- **Challenging corrupted datasets**: CIFAR10-C with corruptions like Gaussian noise and defocus blur

Our experiments covered both i.i.d. (independent and identically distributed) and non-i.i.d. data streams. The latter is particularly challenging because samples are temporally correlated - just like in real life!

![TDA accuracy on the Cross-Domain benchmark](/assets/images/tda_cd_benchmark.png)
*TDA performance across the Cross-Domain benchmark datasets from our experiments.*

### The Hyperparameter Rabbit Hole

Oh, the joys of hyperparameter tuning! We performed extensive ablation studies to understand how different parameters affect performance:

- **Cache parameters**: How important is the residual ratio (α) vs. the sharpness ratio (β)?
- **Entropy thresholds**: When should we consider a prediction confident enough?
- **Number of seen samples**: How quickly does the model adapt?

One interesting finding: when using the positive cache, accuracy improves as α approaches 1, suggesting that prior knowledge from the base model (CLIP in our case) and few-shot knowledge from the cache are equally important.

![Positive cache hyperparameter ablations](/assets/images/tda_positive_hyperparams.png)
*Our ablations on the positive cache: accuracy as the residual ratio and sharpness ratio vary.*

For the negative cache, we found that a strong presence can sometimes worsen performance depending on the dataset.

## Our Innovation: The Waiting List

After many late-night discussions (and possibly too much pizza), we had an idea: what if we could prioritize processing confident samples first, while putting uncertain ones on a "waiting list" for later?

Our hypothesis was that revisiting uncertain samples after refining the cache with confident predictions might lead to more informed decisions.

![Waiting list mechanism diagram](/assets/images/tda_waiting_list.png)
*The waiting list mechanism: confident samples update the cache first, and uncertain samples are revisited once the cache has improved.*

The results?
- On ImageNet, the waiting list approach showed improvements! It helped capture more relevant features for samples in the waiting list.
- On CIFAR10-C, we saw minimal improvements for some corruptions. The delayed classification encouraged a better distribution of classes in the cache.

## Lessons Learned & Future Work

Working on this project taught us several valuable lessons:

1. **Real-world data is messy**: Non-i.i.d. data streams are challenging but represent real-world scenarios better than i.i.d. assumptions.
2. **Hyperparameters matter**: Small changes can significantly impact performance.
3. **Order matters**: The sequence in which samples are processed can affect the model's adaptation.

For future work, we're excited about further exploring if the waiting list approach could be more effective with:
- Synthetic datasets containing elements representative of basic concepts related to harder-to-understand concepts
- Different ordering strategies for processing samples
- Adaptive thresholds that change as the model adapts

## Conclusion

Test-Time Adaptation is a promising field that addresses a real-world problem in ML deployment. Our experiments with Training Dynamic Adapter and our waiting list innovation show that there's significant potential for making models more robust in the wild without expensive retraining.

Special thanks to my amazing teammates Samuele Bolotta and Andrea De Carlo for making this journey both educational and fun. Here's to more adventures in the ML wilderness!

If you're interested in checking out our code and implementation details, the project is available on [GitHub](https://github.com/jucamohedano/my_TDA). 