---
layout: post
title: "Which Log Parser Should You Actually Use?"
date: 2025-05-31
excerpt_separator: <!--more-->
categories: [applied-ai, freelance]
tags: [log-analysis, benchmarking, anomaly-detection, PyOD, unsupervised-learning, systems]
image: /assets/images/logbench_accuracy_f1.png
---

A freelance contract early in 2025 handed me a question that sounds mundane and turns out to be surprisingly deep: given a machine producing mountains of logs, which method should you use to make sense of them? I answered it the honest way — by studying the landscape of approaches and then benchmarking them properly. This is a write-up of that journey, from surveying methods to a data-backed recommendation.

<!--more-->

*Freelance / contract work, early 2025. Everything below is about open-source algorithms on public benchmark datasets — no client data or systems are described.*

## Before You Can Detect Anything, You Have to Parse

Logs are the exhaust of running software: semi-structured text, often the only record of what a system actually did. But raw log lines are a mix of two things — a fixed **template** and the **variable parts** that change every time.

![The anatomy of a log line: header fields, then static template versus dynamic parameters](/assets/images/logbench_log_structure.png)
*A single log line splits into a header (timestamp, level, component) and a message, and the message itself into static fields (the template) and dynamic ones (the parameters). Diagram from El-Masri et al. (2020).*

Log **parsing** is the job of recovering that template: turning `Connection to node-42 closed after 30ms` into `Connection to <*> closed after <*>ms`. Everything downstream — anomaly detection, failure prediction, root-cause analysis — depends on it. Get parsing wrong and no clever detector further down the line can save you.

So the real first question wasn't "which anomaly detector?" It was "which parser?"

## Studying the Landscape

Log parsing turns out to be a small field with a dozen genuinely different ideas. Before benchmarking anything I mapped the approaches, because the design philosophy tells you a lot about where each one will break:

- **Fixed-depth tree** (Drain) — stream logs through a shallow parse tree with a cache. Fast, online, boringly reliable.
- **Streaming with longest-common-subsequence** (Spell) — compare each new line against known templates by LCS.
- **Iterative partitioning** (IPLoM) — split logs by length, then token position, then bijection.
- **n-gram dictionaries** (Logram) — count token n-grams; anything frequent is template.
- **Evolutionary search** (MoLFI) — frame parsing as multi-objective optimisation and search with a genetic algorithm.
- **Clustering** (LogSig, LogMine, SHISO) — group similar lines, then abstract each cluster.
- **Heuristics** (AEL), and a **bidirectional parallel tree** (Brain) built around the longest common patterns.

One unglamorous but important filter at this stage was **licensing**: several parsers are GPL, which rules them out of a commercial product regardless of how well they score. That screen quietly removed a few candidates before a single benchmark ran.

## The Benchmark

I built a harness to run 13 parsers over the public [LogHub](https://github.com/logpai/logparser) datasets (HDFS and friends) and score them on the axes that actually matter in production, not just accuracy:

- **Accuracy** and **F1** on template extraction
- **Throughput** (MB/s) and **memory usage**
- **Memory-to-file ratio** — memory consumed relative to input size
- **Parameter count** — a proxy for how much tuning each one needs

![Average F1 and accuracy for all 13 parsers](/assets/images/logbench_accuracy_f1.png)
*F1 is high almost everywhere (>0.98), but accuracy is where the algorithms separate. A high F1 with low accuracy means an algorithm is producing plausible-looking but imprecise templates.*

The most useful thing the benchmark surfaced is that **F1 hides the differences** — nearly every parser clears 0.98 F1, so on that number alone they look interchangeable. Accuracy tells the real story:

- **Drain** is the boring winner: 0.97 accuracy, decent speed, modest memory. If you deploy one parser and stop thinking about it, deploy this.
- **Brain** is the most accurate (0.971) but pays for it in memory (3× the lean options).
- **Logram** is the speed demon (3.1 MB/s, ~3× the pack) but trades away accuracy (0.72).
- **LenMa** is quietly excellent when resources are tight: high accuracy, lowest memory, a single parameter.
- **ULP** is the cautionary tale — good F1, but accuracy of 0.41. It confidently produces the wrong templates.

I ended up recommending **five** complementary parsers rather than one, so the choice could follow the constraint: Drain as the default, Logram when speed dominates, LenMa for constrained environments, Spell for streaming, AEL for high-volume-with-accuracy.

## The Second Half: Anomaly Detection

With logs turned into structured templates, the features you feed a detector are largely **categorical and high-dimensional** — which template fired, in what sequence, how often. The engagement's second track was choosing an anomaly-detection method for exactly that kind of data.

The existing benchmark supported five detectors. I extended it to **49** — the full family of [PyOD](https://github.com/yzhao062/pyod) algorithms that inherit from its base detector — spanning classical methods (Isolation Forest, LOF, One-Class SVM, HBOS), deep models (autoencoders, DeepSVDD), ensembles, and GAN-based detectors. Making that many algorithms comparable meant more harness than model:

- **per-algorithm memory tracking**, because a detector that needs 30 GB is a non-starter no matter its AUC;
- **dimensionality reduction** — MCA for the categorical features, then UMAP — to actually *see* the structure and the outliers rather than trusting a score blindly;
- **YAML-driven configuration and comparative ranking**, so adding an algorithm was a config entry, not a code change.

## What I Took Away

- **The parser matters more than the detector.** A sloppy template upstream poisons everything downstream, and it's the step people skip past.
- **There is no single best algorithm — only best-for-a-constraint.** Almost every "winner" here won on one axis and lost on another. The deliverable wasn't an algorithm, it was a way to choose.
- **The harness outlives the result.** The reusable benchmark — memory tracking, license screening, config-driven runs, ranking — was worth more to the client than any one number in it, and it's the part I'm still proud of.
- **Boring wins.** Drain, a shallow tree from 2017, quietly beat far fancier methods. That's a lesson I've watched repeat in every domain since.
