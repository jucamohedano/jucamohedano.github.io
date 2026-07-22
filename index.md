---
layout: default
---

<section class="bio">
    <p>
        Hello! This is Juan :)
    </p>
    <p>
        Genuinly interested in AI research and the engineering aspect of it.
        On my way to making GPUs go brrr!
        Was very excited that I got access to a cluster with lots of gpus to run my thesis experiments.
        I do like multimodal models and LLMs in general.
    </p>
    <div class="now-box">
        <p><span class="pulse-dot" aria-hidden="true"></span><strong>Currently:</strong> still tweaking LLMs — post-training with GRPO, exploring the data manifold of an LLM via sampling, and whatever is to come. Very happy for people to <a href="mailto:{{ site.email }}">ping me</a> if they want to discuss any of this.</p>
    </div>
    <p>
        Finished my AI Systems MSc at the University of Trento.
    </p>
    <p>
        Experience at NEURA Robotics and COVAP.
    </p>
</section>

{% comment %}
<section id="publications">
    <h2>Selected Publications</h2>
    <ul>
        <li>
            <strong>Paper Title 1</strong> (2023)<br>
            Authors: {{ site.title }}, Co-author 1, Co-author 2<br>
            <em>Conference/Journal Name</em><br>
            <a href="#">[PDF]</a> <a href="#">[Code]</a> <a href="#">[Project]</a>
        </li>
        <li>
            <strong>Paper Title 2</strong> (2022)<br>
            Authors: {{ site.title }}, Co-author 1, Co-author 2<br>
            <em>Conference/Journal Name</em><br>
            <a href="#">[PDF]</a> <a href="#">[Code]</a> <a href="#">[Project]</a>
        </li>
    </ul>
</section>
{% endcomment %}

<section id="projects">
    <h2>Projects</h2>
    <ul class="project-cards">
        <li class="project-card">
            <div class="pc-top">
                <span class="pc-kind">MSc thesis</span>
                <span class="pc-year">2026</span>
            </div>
            <h3 class="pc-title"><a href="/blog/2026/07/22/what-multimodal-models-know/">What Multimodal Models Know but Don't Say</a></h3>
            <p class="pc-desc">A sampling-based evaluation framework on OVEN that separates what a model knows from what it reliably says — and shows a lenient LLM judge inverting the ranking of Qwen3-VL sizes that a specificity audit restores.</p>
            <ul class="pc-tags">
                <li>Multimodal</li><li>Evaluation</li><li>LLM-as-judge</li><li>GRPO</li>
            </ul>
            <div class="pc-links">
                <a href="/blog/2026/07/22/what-multimodal-models-know/">Write-up</a>
                <a href="https://github.com/jucamohedano/oven-mllm-eval" target="_blank" rel="noopener">Code</a>
            </div>
        </li>
        <li class="project-card">
            <div class="pc-top">
                <span class="pc-kind">Advanced ML</span>
                <span class="pc-year">2026</span>
            </div>
            <h3 class="pc-title"><a href="/blog/2026/06/22/reasoning-shortcuts-raven/">Reasoning Shortcuts on RAVEN</a></h3>
            <p class="pc-desc">Extended the rsbench suite to Raven's Progressive Matrices with a DeepProbLog solver, and caught it scoring 0.91 answer F1 while two of its three concepts stayed at chance. One percent concept supervision fixes it.</p>
            <ul class="pc-tags">
                <li>Neuro-symbolic</li><li>DeepProbLog</li><li>Benchmarks</li>
            </ul>
            <div class="pc-links">
                <a href="/blog/2026/06/22/reasoning-shortcuts-raven/">Write-up</a>
                <a href="https://github.com/jucamohedano/rsbench-code/tree/raven" target="_blank" rel="noopener">Code</a>
            </div>
        </li>
        <li class="project-card">
            <div class="pc-top">
                <span class="pc-kind">Neural systems</span>
                <span class="pc-year">2026</span>
            </div>
            <h3 class="pc-title"><a href="/blog/2026/02/19/expert-neurons-brain-alignment/">Expert Neurons vs. the Brain</a></h3>
            <p class="pc-desc">Pulled sparse concept-specific neurons out of GPT-2 and compared their representational geometry against fMRI from nine people. The experts align with brain data better than the dense embeddings holding them.</p>
            <ul class="pc-tags">
                <li>Interpretability</li><li>RSA</li><li>fMRI</li>
            </ul>
            <div class="pc-links">
                <a href="/blog/2026/02/19/expert-neurons-brain-alignment/">Write-up</a>
                <a href="https://github.com/jucamohedano/experts-ml-selfcond" target="_blank" rel="noopener">Code</a>
                <a href="https://huggingface.co/datasets/jucamohedano/Qwen3-30B-A3B-Instruct-2507_custom_60_cot" target="_blank" rel="noopener">Dataset</a>
            </div>
        </li>
        <li class="project-card">
            <div class="pc-top">
                <span class="pc-kind">Literature review</span>
                <span class="pc-year">2024</span>
            </div>
            <h3 class="pc-title"><a href="/blog/2024/11/30/alpha-clip-study/">Alpha-CLIP: Region-Focused Vision</a></h3>
            <p class="pc-desc">A review of how an alpha channel lets CLIP attend to a chosen region without losing the surrounding context, plus two proposals for taking the idea further.</p>
            <ul class="pc-tags">
                <li>Vision-language</li><li>CLIP</li>
            </ul>
            <div class="pc-links">
                <a href="/blog/2024/11/30/alpha-clip-study/">Write-up</a>
            </div>
        </li>
        <li class="project-card">
            <div class="pc-top">
                <span class="pc-kind">Course project</span>
                <span class="pc-year">2024</span>
            </div>
            <h3 class="pc-title"><a href="/blog/2024/03/01/test-time-adaptation/">Test-Time Adaptation for VLMs</a></h3>
            <p class="pc-desc">Benchmarked where cache-based test-time adaptation breaks on non-i.i.d. streams, then added a waiting-list mechanism that revisits uncertain samples once the cache has improved.</p>
            <ul class="pc-tags">
                <li>Distribution shift</li><li>CLIP</li><li>Adaptation</li>
            </ul>
            <div class="pc-links">
                <a href="/blog/2024/03/01/test-time-adaptation/">Write-up</a>
                <a href="https://github.com/jucamohedano/my_TDA" target="_blank" rel="noopener">Code</a>
            </div>
        </li>
        <li class="project-card">
            <div class="pc-top">
                <span class="pc-kind">Internship</span>
                <span class="pc-year">2023</span>
            </div>
            <h3 class="pc-title"><a href="/blog/2023/06/30/neura-robotics-internship/">R&amp;D at NEURA Robotics</a></h3>
            <p class="pc-desc">Six months on the MiPA cognitive robot platform: modular robot description in Gazebo, a drift-correcting physics plugin, and ROS 2 servers for low-level control.</p>
            <ul class="pc-tags">
                <li>Robotics</li><li>ROS 2</li><li>Simulation</li>
            </ul>
            <div class="pc-links">
                <a href="/blog/2023/06/30/neura-robotics-internship/">Write-up</a>
            </div>
        </li>
        <li class="project-card">
            <div class="pc-top">
                <span class="pc-kind">BSc thesis</span>
                <span class="pc-year">2022</span>
            </div>
            <h3 class="pc-title"><a href="/blog/2022/05/01/bsc-thesis-robot-grasping/">6DoF Robot Grasping with TIAGo</a></h3>
            <p class="pc-desc">Generating six-degree-of-freedom grasps for the TIAGo robot from deep learning and computer vision, built for the LASR team and RoboCup.</p>
            <ul class="pc-tags">
                <li>Robotics</li><li>Grasping</li><li>Computer vision</li>
            </ul>
            <div class="pc-links">
                <a href="/blog/2022/05/01/bsc-thesis-robot-grasping/">Write-up</a>
            </div>
        </li>
    </ul>
</section>

<section id="contact">
    <h2>Contact</h2>
    <p>Email: <a href="mailto:{{ site.email }}">{{ site.email }}</a></p>
    <div class="social-links">
        <a href="https://github.com/{{ site.github_username }}" target="_blank"><i class="fab fa-github"></i>GitHub</a>
        <a href="https://linkedin.com/in/{{ site.linkedin_username }}" target="_blank"><i class="fab fa-linkedin"></i>LinkedIn</a>
        <!-- <a href="https://twitter.com/{{ site.twitter_username }}" target="_blank"><i class="fab fa-twitter"></i>Twitter</a>
        <a href="https://scholar.google.com/citations?user={{ site.google_scholar }}" target="_blank"><i class="fas fa-graduation-cap"></i>Google Scholar</a> -->
    </div>
</section> 