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

The core of the method is a search: every one of GPT-2's 82,944 neurons is scored as a detector for one concept, and only the sharpest survive.

<div class="figure-svg wide">
<svg viewBox="0 0 860 906" class="expert-map" role="img" aria-label="Dashboard: expert neurons in GPT-2. 82,944 neurons scored per concept, 819 kept on average, about 1 percent of the network. A grid of the 48 sub-layers shows expert density peaking in mid-to-late MLP layers. A ranked Average Precision curve shows the top 819 neurons above the 0.5 threshold being kept. A bar chart shows measured expert counts for all 60 concepts, from glass at 224 to screwdriver at 2,018." xmlns="http://www.w3.org/2000/svg">
<style>
    .expert-map .pnl { fill: var(--viz-panel); stroke: var(--border-color); stroke-width: 1; }
    .expert-map .h1 { font-size: 25px; font-weight: 800; fill: var(--heading-color); letter-spacing: -0.02em; }
    .expert-map .h2 { font-size: 15px; font-weight: 700; fill: var(--heading-color); }
    .expert-map .sub { font-size: 12.5px; fill: var(--text-color); }
    .expert-map .big { font-size: 30px; font-weight: 800; fill: var(--accent); letter-spacing: -0.02em; }
    .expert-map .d { font-size: 11.5px; fill: var(--text-color); }
    .expert-map .tick { font-size: 10.5px; fill: var(--viz-muted); }
    .expert-map .rlab { font-size: 12px; font-weight: 700; fill: var(--heading-color); }
    .expert-map .rsub { font-size: 10px; fill: var(--viz-muted); }
    .expert-map .annot { font-size: 11.5px; font-weight: 700; fill: var(--heading-color); }
    .expert-map .cell { stroke: var(--viz-panel); stroke-width: 2; }
    .expert-map .s1 { fill: var(--viz-1); } .s2 { fill: var(--viz-2); } .s3 { fill: var(--viz-3); }
    .expert-map .s4 { fill: var(--viz-4); } .s5 { fill: var(--viz-5); }
    .expert-map .axis { stroke: var(--border-color); stroke-width: 1; }
    .expert-map .grid { stroke: var(--border-color); stroke-width: 1; opacity: 0.55; }
    .expert-map .curve { fill: none; stroke: var(--viz-5); stroke-width: 2; }
    .expert-map .lit { fill: var(--viz-3); opacity: 0.55; stroke: none; }
    .expert-map .thresh { stroke: var(--accent); stroke-width: 1.5; stroke-dasharray: 5 4; }
    .expert-map .drop { stroke: var(--viz-muted); stroke-width: 1; stroke-dasharray: 3 3; }
    .expert-map .bar { fill: var(--viz-3); }
    .expert-map .bar.hi { fill: var(--viz-5); }
</style>
<text class="h1" x="10.0" y="30.0" text-anchor="start">Finding the experts inside GPT-2</text>
<text class="sub" x="10.0" y="52.0" text-anchor="start">Every neuron is scored as a detector for one concept. The top slice by Average Precision becomes that concept's experts.</text>
<rect class="pnl" x="10.0" y="72.0" width="272.0" height="76.0" rx="10"/>
<text class="big" x="28.0" y="112.0" text-anchor="start">82,944</text>
<text class="d" x="28.0" y="133.0" text-anchor="start">neurons scored, per concept</text>
<rect class="pnl" x="294.0" y="72.0" width="272.0" height="76.0" rx="10"/>
<text class="big" x="312.0" y="112.0" text-anchor="start">819</text>
<text class="d" x="312.0" y="133.0" text-anchor="start">experts kept on average</text>
<rect class="pnl" x="578.0" y="72.0" width="272.0" height="76.0" rx="10"/>
<text class="big" x="596.0" y="112.0" text-anchor="start">1.0%</text>
<text class="d" x="596.0" y="133.0" text-anchor="start">of the network survives the cut</text>
<rect class="pnl" x="10.0" y="172.0" width="840.0" height="296.0" rx="10"/>
<text class="h2" x="28.0" y="200.0" text-anchor="start">Where the experts sit</text>
<text class="d" x="832.0" y="196.0" text-anchor="end">expert density per 1,000 neurons</text>
<rect class="cell s1" x="702.0" y="206" width="24" height="11" rx="3"/>
<rect class="cell s2" x="728.0" y="206" width="24" height="11" rx="3"/>
<rect class="cell s3" x="754.0" y="206" width="24" height="11" rx="3"/>
<rect class="cell s4" x="780.0" y="206" width="24" height="11" rx="3"/>
<rect class="cell s5" x="806.0" y="206" width="24" height="11" rx="3"/>
<text class="tick" x="694.0" y="216.0" text-anchor="end">low</text>
<text class="tick" x="834.0" y="216.0" text-anchor="start">high</text>
<text class="tick" x="167.8" y="238.0" text-anchor="middle">1</text>
<text class="tick" x="223.2" y="238.0" text-anchor="middle">2</text>
<text class="tick" x="278.8" y="238.0" text-anchor="middle">3</text>
<text class="tick" x="334.2" y="238.0" text-anchor="middle">4</text>
<text class="tick" x="389.8" y="238.0" text-anchor="middle">5</text>
<text class="tick" x="445.2" y="238.0" text-anchor="middle">6</text>
<text class="tick" x="500.8" y="238.0" text-anchor="middle">7</text>
<text class="tick" x="556.2" y="238.0" text-anchor="middle">8</text>
<text class="tick" x="611.8" y="238.0" text-anchor="middle">9</text>
<text class="tick" x="667.2" y="238.0" text-anchor="middle">10</text>
<text class="tick" x="722.8" y="238.0" text-anchor="middle">11</text>
<text class="tick" x="778.2" y="238.0" text-anchor="middle">12</text>
<text class="tick" x="473.0" y="454.0" text-anchor="middle">transformer block</text>
<text class="rlab" x="132.0" y="267.0" text-anchor="end">attn.c_attn</text>
<text class="rsub" x="132.0" y="281.0" text-anchor="end">2,304 neurons</text>
<rect class="cell s1" x="142.0" y="246.0" width="51.5" height="44" rx="4"/>
<rect class="cell s1" x="197.5" y="246.0" width="51.5" height="44" rx="4"/>
<rect class="cell s2" x="253.0" y="246.0" width="51.5" height="44" rx="4"/>
<rect class="cell s2" x="308.5" y="246.0" width="51.5" height="44" rx="4"/>
<rect class="cell s3" x="364.0" y="246.0" width="51.5" height="44" rx="4"/>
<rect class="cell s3" x="419.5" y="246.0" width="51.5" height="44" rx="4"/>
<rect class="cell s4" x="475.0" y="246.0" width="51.5" height="44" rx="4"/>
<rect class="cell s4" x="530.5" y="246.0" width="51.5" height="44" rx="4"/>
<rect class="cell s3" x="586.0" y="246.0" width="51.5" height="44" rx="4"/>
<rect class="cell s3" x="641.5" y="246.0" width="51.5" height="44" rx="4"/>
<rect class="cell s2" x="697.0" y="246.0" width="51.5" height="44" rx="4"/>
<rect class="cell s1" x="752.5" y="246.0" width="51.5" height="44" rx="4"/>
<text class="rlab" x="132.0" y="315.0" text-anchor="end">attn.c_proj</text>
<text class="rsub" x="132.0" y="329.0" text-anchor="end">768 neurons</text>
<rect class="cell s1" x="142.0" y="294.0" width="51.5" height="44" rx="4"/>
<rect class="cell s1" x="197.5" y="294.0" width="51.5" height="44" rx="4"/>
<rect class="cell s1" x="253.0" y="294.0" width="51.5" height="44" rx="4"/>
<rect class="cell s1" x="308.5" y="294.0" width="51.5" height="44" rx="4"/>
<rect class="cell s2" x="364.0" y="294.0" width="51.5" height="44" rx="4"/>
<rect class="cell s2" x="419.5" y="294.0" width="51.5" height="44" rx="4"/>
<rect class="cell s3" x="475.0" y="294.0" width="51.5" height="44" rx="4"/>
<rect class="cell s3" x="530.5" y="294.0" width="51.5" height="44" rx="4"/>
<rect class="cell s3" x="586.0" y="294.0" width="51.5" height="44" rx="4"/>
<rect class="cell s3" x="641.5" y="294.0" width="51.5" height="44" rx="4"/>
<rect class="cell s2" x="697.0" y="294.0" width="51.5" height="44" rx="4"/>
<rect class="cell s2" x="752.5" y="294.0" width="51.5" height="44" rx="4"/>
<text class="rlab" x="132.0" y="363.0" text-anchor="end">mlp.c_fc</text>
<text class="rsub" x="132.0" y="377.0" text-anchor="end">3,072 neurons</text>
<rect class="cell s1" x="142.0" y="342.0" width="51.5" height="44" rx="4"/>
<rect class="cell s1" x="197.5" y="342.0" width="51.5" height="44" rx="4"/>
<rect class="cell s2" x="253.0" y="342.0" width="51.5" height="44" rx="4"/>
<rect class="cell s2" x="308.5" y="342.0" width="51.5" height="44" rx="4"/>
<rect class="cell s3" x="364.0" y="342.0" width="51.5" height="44" rx="4"/>
<rect class="cell s4" x="419.5" y="342.0" width="51.5" height="44" rx="4"/>
<rect class="cell s5" x="475.0" y="342.0" width="51.5" height="44" rx="4"/>
<rect class="cell s5" x="530.5" y="342.0" width="51.5" height="44" rx="4"/>
<rect class="cell s5" x="586.0" y="342.0" width="51.5" height="44" rx="4"/>
<rect class="cell s4" x="641.5" y="342.0" width="51.5" height="44" rx="4"/>
<rect class="cell s3" x="697.0" y="342.0" width="51.5" height="44" rx="4"/>
<rect class="cell s2" x="752.5" y="342.0" width="51.5" height="44" rx="4"/>
<text class="rlab" x="132.0" y="411.0" text-anchor="end">mlp.c_proj</text>
<text class="rsub" x="132.0" y="425.0" text-anchor="end">768 neurons</text>
<rect class="cell s1" x="142.0" y="390.0" width="51.5" height="44" rx="4"/>
<rect class="cell s1" x="197.5" y="390.0" width="51.5" height="44" rx="4"/>
<rect class="cell s1" x="253.0" y="390.0" width="51.5" height="44" rx="4"/>
<rect class="cell s1" x="308.5" y="390.0" width="51.5" height="44" rx="4"/>
<rect class="cell s2" x="364.0" y="390.0" width="51.5" height="44" rx="4"/>
<rect class="cell s2" x="419.5" y="390.0" width="51.5" height="44" rx="4"/>
<rect class="cell s3" x="475.0" y="390.0" width="51.5" height="44" rx="4"/>
<rect class="cell s4" x="530.5" y="390.0" width="51.5" height="44" rx="4"/>
<rect class="cell s5" x="586.0" y="390.0" width="51.5" height="44" rx="4"/>
<rect class="cell s4" x="641.5" y="390.0" width="51.5" height="44" rx="4"/>
<rect class="cell s4" x="697.0" y="390.0" width="51.5" height="44" rx="4"/>
<rect class="cell s3" x="752.5" y="390.0" width="51.5" height="44" rx="4"/>
<rect class="pnl" x="10.0" y="484.0" width="840.0" height="194.0" rx="10"/>
<text class="h2" x="28.0" y="512.0" text-anchor="start">How a neuron becomes an expert</text>
<text class="d" x="832.0" y="512.0" text-anchor="end">all 82,944 neurons ranked by Average Precision</text>
<line class="axis" x1="68" y1="638" x2="780" y2="638"/>
<text class="tick" x="60.0" y="642.0" text-anchor="end">0.0</text>
<text class="tick" x="60.0" y="588.0" text-anchor="end">0.5</text>
<text class="tick" x="60.0" y="534.0" text-anchor="end">1.0</text>
<text class="tick" x="24.0" y="584.0" text-anchor="middle">AP</text>
<text class="tick" x="68.0" y="656.0" text-anchor="middle">1</text>
<text class="tick" x="212.8" y="656.0" text-anchor="middle">10</text>
<text class="tick" x="357.5" y="656.0" text-anchor="middle">100</text>
<text class="tick" x="502.3" y="656.0" text-anchor="middle">1,000</text>
<text class="tick" x="647.0" y="656.0" text-anchor="middle">10,000</text>
<text class="tick" x="780.0" y="656.0" text-anchor="middle">82,944</text>
<text class="tick" x="424.0" y="674.0" text-anchor="middle">neuron rank (log scale)</text>
<path class="lit" d="M 68.0 584.0 L 68.0 533.2 L 71.7 533.2 L 75.3 533.2 L 79.0 533.2 L 82.7 533.2 L 86.3 533.2 L 90.0 533.2 L 93.6 533.2 L 97.3 533.2 L 101.0 533.3 L 104.6 533.3 L 108.3 533.3 L 112.0 533.3 L 115.6 533.3 L 119.3 533.3 L 122.9 533.3 L 126.6 533.3 L 130.3 533.4 L 133.9 533.4 L 137.6 533.4 L 141.3 533.4 L 144.9 533.5 L 148.6 533.5 L 152.3 533.5 L 155.9 533.6 L 159.6 533.6 L 163.2 533.7 L 166.9 533.8 L 170.6 533.8 L 174.2 533.9 L 177.9 534.0 L 181.6 534.1 L 185.2 534.2 L 188.9 534.3 L 192.5 534.4 L 196.2 534.5 L 199.9 534.6 L 203.5 534.7 L 207.2 534.9 L 210.9 535.0 L 214.5 535.2 L 218.2 535.4 L 221.8 535.5 L 225.5 535.7 L 229.2 535.9 L 232.8 536.1 L 236.5 536.4 L 240.2 536.6 L 243.8 536.8 L 247.5 537.1 L 251.2 537.3 L 254.8 537.6 L 258.5 537.9 L 262.1 538.2 L 265.8 538.5 L 269.5 538.9 L 273.1 539.2 L 276.8 539.6 L 280.5 539.9 L 284.1 540.3 L 287.8 540.7 L 291.4 541.1 L 295.1 541.5 L 298.8 542.0 L 302.4 542.4 L 306.1 542.9 L 309.8 543.4 L 313.4 543.9 L 317.1 544.4 L 320.8 544.9 L 324.4 545.5 L 328.1 546.0 L 331.7 546.6 L 335.4 547.2 L 339.1 547.8 L 342.7 548.4 L 346.4 549.1 L 350.1 549.7 L 353.7 550.4 L 357.4 551.1 L 361.0 551.8 L 364.7 552.5 L 368.4 553.2 L 372.0 554.0 L 375.7 554.7 L 379.4 555.5 L 383.0 556.3 L 386.7 557.1 L 390.3 557.9 L 394.0 558.7 L 397.7 559.6 L 401.3 560.4 L 405.0 561.3 L 408.7 562.2 L 412.3 563.1 L 416.0 564.0 L 419.7 564.9 L 423.3 565.8 L 427.0 566.8 L 430.6 567.7 L 434.3 568.7 L 438.0 569.7 L 441.6 570.6 L 445.3 571.6 L 449.0 572.6 L 452.6 573.6 L 456.3 574.6 L 459.9 575.7 L 463.6 576.7 L 467.3 577.7 L 470.9 578.7 L 474.6 579.8 L 478.3 580.8 L 481.9 581.9 L 485.6 582.9 L 489.3 583.9 L 489.7 584.0 Z"/>
<path class="curve" d="M 68.0 533.2 L 71.7 533.2 L 75.3 533.2 L 79.0 533.2 L 82.7 533.2 L 86.3 533.2 L 90.0 533.2 L 93.6 533.2 L 97.3 533.2 L 101.0 533.3 L 104.6 533.3 L 108.3 533.3 L 112.0 533.3 L 115.6 533.3 L 119.3 533.3 L 122.9 533.3 L 126.6 533.3 L 130.3 533.4 L 133.9 533.4 L 137.6 533.4 L 141.3 533.4 L 144.9 533.5 L 148.6 533.5 L 152.3 533.5 L 155.9 533.6 L 159.6 533.6 L 163.2 533.7 L 166.9 533.8 L 170.6 533.8 L 174.2 533.9 L 177.9 534.0 L 181.6 534.1 L 185.2 534.2 L 188.9 534.3 L 192.5 534.4 L 196.2 534.5 L 199.9 534.6 L 203.5 534.7 L 207.2 534.9 L 210.9 535.0 L 214.5 535.2 L 218.2 535.4 L 221.8 535.5 L 225.5 535.7 L 229.2 535.9 L 232.8 536.1 L 236.5 536.4 L 240.2 536.6 L 243.8 536.8 L 247.5 537.1 L 251.2 537.3 L 254.8 537.6 L 258.5 537.9 L 262.1 538.2 L 265.8 538.5 L 269.5 538.9 L 273.1 539.2 L 276.8 539.6 L 280.5 539.9 L 284.1 540.3 L 287.8 540.7 L 291.4 541.1 L 295.1 541.5 L 298.8 542.0 L 302.4 542.4 L 306.1 542.9 L 309.8 543.4 L 313.4 543.9 L 317.1 544.4 L 320.8 544.9 L 324.4 545.5 L 328.1 546.0 L 331.7 546.6 L 335.4 547.2 L 339.1 547.8 L 342.7 548.4 L 346.4 549.1 L 350.1 549.7 L 353.7 550.4 L 357.4 551.1 L 361.0 551.8 L 364.7 552.5 L 368.4 553.2 L 372.0 554.0 L 375.7 554.7 L 379.4 555.5 L 383.0 556.3 L 386.7 557.1 L 390.3 557.9 L 394.0 558.7 L 397.7 559.6 L 401.3 560.4 L 405.0 561.3 L 408.7 562.2 L 412.3 563.1 L 416.0 564.0 L 419.7 564.9 L 423.3 565.8 L 427.0 566.8 L 430.6 567.7 L 434.3 568.7 L 438.0 569.7 L 441.6 570.6 L 445.3 571.6 L 449.0 572.6 L 452.6 573.6 L 456.3 574.6 L 459.9 575.7 L 463.6 576.7 L 467.3 577.7 L 470.9 578.7 L 474.6 579.8 L 478.3 580.8 L 481.9 581.9 L 485.6 582.9 L 489.3 583.9 L 492.9 585.0 L 496.6 586.0 L 500.2 587.1 L 503.9 588.1 L 507.6 589.2 L 511.2 590.2 L 514.9 591.3 L 518.6 592.3 L 522.2 593.4 L 525.9 594.4 L 529.5 595.4 L 533.2 596.4 L 536.9 597.5 L 540.5 598.5 L 544.2 599.5 L 547.9 600.5 L 551.5 601.5 L 555.2 602.4 L 558.8 603.4 L 562.5 604.4 L 566.2 605.3 L 569.8 606.2 L 573.5 607.2 L 577.2 608.1 L 580.8 609.0 L 584.5 609.9 L 588.2 610.8 L 591.8 611.6 L 595.5 612.5 L 599.1 613.3 L 602.8 614.1 L 606.5 614.9 L 610.1 615.7 L 613.8 616.5 L 617.5 617.3 L 621.1 618.0 L 624.8 618.7 L 628.4 619.5 L 632.1 620.2 L 635.8 620.8 L 639.4 621.5 L 643.1 622.2 L 646.8 622.8 L 650.4 623.4 L 654.1 624.0 L 657.8 624.6 L 661.4 625.2 L 665.1 625.7 L 668.7 626.3 L 672.4 626.8 L 676.1 627.3 L 679.7 627.8 L 683.4 628.2 L 687.1 628.7 L 690.7 629.1 L 694.4 629.6 L 698.0 630.0 L 701.7 630.4 L 705.4 630.8 L 709.0 631.1 L 712.7 631.5 L 716.4 631.8 L 720.0 632.1 L 723.7 632.5 L 727.3 632.8 L 731.0 633.0 L 734.7 633.3 L 738.3 633.6 L 742.0 633.8 L 745.7 634.1 L 749.3 634.3 L 753.0 634.5 L 756.7 634.7 L 760.3 634.9 L 764.0 635.1 L 767.6 635.3 L 771.3 635.5 L 775.0 635.6 L 778.6 635.8"/>
<line class="thresh" x1="68" y1="584.0" x2="780" y2="584.0"/>
<line class="drop" x1="489.7" y1="584.0" x2="489.7" y2="638"/>
<text class="annot" x="776.0" y="576.0" text-anchor="end">threshold  τ = 0.5</text>
<text class="annot" x="497.7" y="552.0" text-anchor="start">819 experts</text>
<text class="d" x="497.7" y="568.0" text-anchor="start">kept for this concept</text>
<text class="d" x="497.7" y="630.0" text-anchor="start">82,125 discarded →</text>
<rect class="pnl" x="10.0" y="694.0" width="840.0" height="202.0" rx="10"/>
<text class="h2" x="28.0" y="722.0" text-anchor="start">Experts per concept</text>
<text class="d" x="832.0" y="722.0" text-anchor="end">measured, all 60 concepts at τ = 0.5</text>
<rect class="bar hi" x="62.0" y="838.0" width="10.87" height="12.0" rx="1.5"/>
<rect class="bar" x="74.5" y="835.7" width="10.87" height="14.3" rx="1.5"/>
<rect class="bar" x="86.9" y="835.6" width="10.87" height="14.4" rx="1.5"/>
<rect class="bar" x="99.4" y="835.0" width="10.87" height="15.0" rx="1.5"/>
<rect class="bar" x="111.9" y="833.1" width="10.87" height="16.9" rx="1.5"/>
<rect class="bar" x="124.3" y="832.6" width="10.87" height="17.4" rx="1.5"/>
<rect class="bar" x="136.8" y="831.5" width="10.87" height="18.5" rx="1.5"/>
<rect class="bar" x="149.3" y="831.3" width="10.87" height="18.7" rx="1.5"/>
<rect class="bar" x="161.7" y="830.5" width="10.87" height="19.5" rx="1.5"/>
<rect class="bar" x="174.2" y="830.3" width="10.87" height="19.7" rx="1.5"/>
<rect class="bar" x="186.7" y="830.3" width="10.87" height="19.7" rx="1.5"/>
<rect class="bar" x="199.1" y="829.7" width="10.87" height="20.3" rx="1.5"/>
<rect class="bar" x="211.6" y="829.2" width="10.87" height="20.8" rx="1.5"/>
<rect class="bar" x="224.1" y="827.0" width="10.87" height="23.0" rx="1.5"/>
<rect class="bar" x="236.5" y="825.3" width="10.87" height="24.7" rx="1.5"/>
<rect class="bar" x="249.0" y="825.2" width="10.87" height="24.8" rx="1.5"/>
<rect class="bar" x="261.5" y="824.2" width="10.87" height="25.8" rx="1.5"/>
<rect class="bar" x="273.9" y="823.9" width="10.87" height="26.1" rx="1.5"/>
<rect class="bar" x="286.4" y="822.9" width="10.87" height="27.1" rx="1.5"/>
<rect class="bar" x="298.9" y="822.3" width="10.87" height="27.7" rx="1.5"/>
<rect class="bar" x="311.3" y="821.9" width="10.87" height="28.1" rx="1.5"/>
<rect class="bar" x="323.8" y="821.7" width="10.87" height="28.3" rx="1.5"/>
<rect class="bar" x="336.3" y="821.2" width="10.87" height="28.8" rx="1.5"/>
<rect class="bar" x="348.7" y="818.6" width="10.87" height="31.4" rx="1.5"/>
<rect class="bar" x="361.2" y="816.5" width="10.87" height="33.5" rx="1.5"/>
<rect class="bar" x="373.7" y="814.9" width="10.87" height="35.1" rx="1.5"/>
<rect class="bar" x="386.1" y="814.2" width="10.87" height="35.8" rx="1.5"/>
<rect class="bar" x="398.6" y="812.8" width="10.87" height="37.2" rx="1.5"/>
<rect class="bar" x="411.1" y="811.3" width="10.87" height="38.7" rx="1.5"/>
<rect class="bar" x="423.5" y="811.1" width="10.87" height="38.9" rx="1.5"/>
<rect class="bar" x="436.0" y="809.3" width="10.87" height="40.7" rx="1.5"/>
<rect class="bar" x="448.5" y="808.7" width="10.87" height="41.3" rx="1.5"/>
<rect class="bar" x="460.9" y="808.3" width="10.87" height="41.7" rx="1.5"/>
<rect class="bar" x="473.4" y="808.1" width="10.87" height="41.9" rx="1.5"/>
<rect class="bar" x="485.9" y="807.3" width="10.87" height="42.7" rx="1.5"/>
<rect class="bar" x="498.3" y="806.4" width="10.87" height="43.6" rx="1.5"/>
<rect class="bar" x="510.8" y="803.7" width="10.87" height="46.3" rx="1.5"/>
<rect class="bar" x="523.3" y="803.2" width="10.87" height="46.8" rx="1.5"/>
<rect class="bar" x="535.7" y="803.0" width="10.87" height="47.0" rx="1.5"/>
<rect class="bar" x="548.2" y="802.9" width="10.87" height="47.1" rx="1.5"/>
<rect class="bar" x="560.7" y="799.9" width="10.87" height="50.1" rx="1.5"/>
<rect class="bar" x="573.1" y="799.9" width="10.87" height="50.1" rx="1.5"/>
<rect class="bar" x="585.6" y="799.3" width="10.87" height="50.7" rx="1.5"/>
<rect class="bar" x="598.1" y="798.7" width="10.87" height="51.3" rx="1.5"/>
<rect class="bar" x="610.5" y="796.8" width="10.87" height="53.2" rx="1.5"/>
<rect class="bar" x="623.0" y="796.3" width="10.87" height="53.7" rx="1.5"/>
<rect class="bar" x="635.5" y="795.8" width="10.87" height="54.2" rx="1.5"/>
<rect class="bar" x="647.9" y="795.0" width="10.87" height="55.0" rx="1.5"/>
<rect class="bar" x="660.4" y="791.2" width="10.87" height="58.8" rx="1.5"/>
<rect class="bar" x="672.9" y="789.3" width="10.87" height="60.7" rx="1.5"/>
<rect class="bar" x="685.3" y="782.8" width="10.87" height="67.2" rx="1.5"/>
<rect class="bar" x="697.8" y="780.4" width="10.87" height="69.6" rx="1.5"/>
<rect class="bar" x="710.3" y="774.2" width="10.87" height="75.8" rx="1.5"/>
<rect class="bar" x="722.7" y="774.1" width="10.87" height="75.9" rx="1.5"/>
<rect class="bar" x="735.2" y="767.3" width="10.87" height="82.7" rx="1.5"/>
<rect class="bar" x="747.7" y="762.6" width="10.87" height="87.4" rx="1.5"/>
<rect class="bar" x="760.1" y="754.3" width="10.87" height="95.7" rx="1.5"/>
<rect class="bar" x="772.6" y="747.2" width="10.87" height="102.8" rx="1.5"/>
<rect class="bar" x="785.1" y="744.1" width="10.87" height="105.9" rx="1.5"/>
<rect class="bar hi" x="797.5" y="742.0" width="10.87" height="108.0" rx="1.5"/>
<line class="axis" x1="62" y1="850" x2="810" y2="850"/>
<line class="grid" x1="62" y1="796.5" x2="810" y2="796.5"/>
<line class="grid" x1="62" y1="743.0" x2="810" y2="743.0"/>
<text class="tick" x="54.0" y="854.0" text-anchor="end">0</text>
<text class="tick" x="54.0" y="800.5" text-anchor="end">1,000</text>
<text class="tick" x="54.0" y="747.0" text-anchor="end">2,000</text>
<text class="annot" x="64.0" y="868.0" text-anchor="start">glass · 224</text>
<text class="annot" x="808.0" y="868.0" text-anchor="end">screwdriver · 2,018</text>
<text class="tick" x="436.0" y="886.0" text-anchor="middle">60 concepts, sorted by expert count — a 9× spread</text>
</svg>
</div>

*Finding the experts. The headline counts and the per-concept bars are measured from the run; the per-sub-layer density field and the ranking curve are illustrative, since the per-neuron AP arrays are not in the published artifacts.*

Two parts of that picture deserve unpacking.

The pipeline around it is two branches meeting at the end: the 60 nouns from Mitchell et al. (2008) go through GPT-2 on one side and through nine people's brains on the other, and Representational Similarity Analysis compares the two geometries.

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
