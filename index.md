---
layout: default
---

<section class="bio">
    <img class="profile-photo" src="{{ "/assets/images/profile_pic.png" | relative_url }}" alt="{{ site.title }}" width="460" height="460">
    <h1 class="home-greeting">Hi! I'm Juan</h1>
    <p>
        I'm a recent MSc AI graduate working on RLMs. My latest projects from
        uni are on multimodal models, neuro-symbolic models and alignment
        between a language model and the human brain. My current interests are:
    </p>
    <ul class="interests">
        <li>post-training and evaluation of LLMs</li>
        <li>test-time adaptation</li>
        <li>coding agents</li>
    </ul>
    <p>
        At the moment I am working on a side project,
        <a href="https://github.com/jucamohedano/kernel-rlm">post-training a model to learn the RLM environment to generate CUDA kernels</a>, supported by a CloudRift compute grant.
    </p>
    <p>
        I would be very happy to discuss any of these topics if you are
        interested. Feel free to reach out to me via email.
    </p>
</section>

<section id="projects">
    <h2 class="section-title">research and thesis</h2>
    <ul class="home-list">
        <li>
            <div class="hl-top">
                <h3 class="hl-title"><a href="/blog/2026/07/22/what-multimodal-models-know/">What Multimodal Models Know but Don't Say</a></h3>
                <time class="hl-meta" datetime="2026-07-22">2026</time>
            </div>
            <p class="hl-desc">A sampling-based evaluation framework that separates what an MLLM knows from what it reliably says.</p>
        </li>
        <li>
            <div class="hl-top">
                <h3 class="hl-title"><a href="/blog/2026/06/22/reasoning-shortcuts-raven/">Discovering Reasoning Shortcuts in RAVEN</a></h3>
                <time class="hl-meta" datetime="2026-06-22">2026</time>
            </div>
            <p class="hl-desc">A DeepProbLog solver scores 0.91 answer F1 on Raven's Progressive Matrices while two of its three concepts stay at chance.</p>
        </li>
        <li>
            <div class="hl-top">
                <h3 class="hl-title"><a href="/blog/2026/02/19/expert-neurons-brain-alignment/">Do a Language Model's Expert Neurons Think Like a Human Brain?</a></h3>
                <time class="hl-meta" datetime="2026-02-19">2026</time>
            </div>
            <p class="hl-desc">Sparse concept-specific neurons in GPT-2 align with fMRI data better than the dense embeddings around them.</p>
        </li>
    </ul>
</section>

<section id="engineering">
    <h2 class="section-title">engineering work</h2>
    <ul class="home-list">
        <li>
            <div class="hl-top">
                <h3 class="hl-title"><a href="/blog/2025/07/31/covap-ai-internship/">AI Workflows for Business Automation</a></h3>
                <time class="hl-meta" datetime="2025-07-31">2025</time>
            </div>
            <p class="hl-desc">Agentic workflows for one of Spain's largest livestock cooperatives, cutting document validation from 30 minutes to under 5.</p>
        </li>
        <li>
            <div class="hl-top">
                <h3 class="hl-title"><a href="/blog/2025/05/31/benchmarking-log-parsers/">Which Log Parser Should You Actually Use?</a></h3>
                <time class="hl-meta" datetime="2025-05-31">2025</time>
            </div>
            <p class="hl-desc">13 open-source log parsers compared on accuracy, throughput, memory and tuning effort.</p>
        </li>
        <li>
            <div class="hl-top">
                <h3 class="hl-title"><a href="/blog/2023/06/30/neura-robotics-internship/">R&amp;D on the MiPA Robot Platform</a></h3>
                <time class="hl-meta" datetime="2023-06-30">2023</time>
            </div>
            <p class="hl-desc">Simulation, grasping, perception, and ROS 2 safety layers for the MiPA robot at NEURA Robotics.</p>
        </li>
        <li>
            <div class="hl-top">
                <h3 class="hl-title"><a href="/blog/2022/05/01/bsc-thesis-robot-grasping/">6DoF Robot Grasping with TIAGo</a></h3>
                <time class="hl-meta" datetime="2022-05-01">2022</time>
            </div>
            <p class="hl-desc">Generating six-degree-of-freedom grasps for the TIAGo robot, built for the LASR team and <a href="https://eps.leeds.ac.uk/computing-undergraduate/news/article/5647/party-time-lasr-team-wins-gold-in-robocup-home-education-challenge">RoboCup</a>.</p>
        </li>
    </ul>
    <p class="all-projects"><a href="{{ "/projects/" | relative_url }}">all project write-ups &rarr;</a></p>
</section>

<section id="achievements">
    <h2 class="section-title">achievement and competitions</h2>
    <div class="achievement-entry">
        <div class="hl-top">
            <h3 class="hl-title">HackSpain 2026 <span class="forthcoming">(blog to come)</span></h3>
            <span class="hl-meta">Winner · HappyRobot track</span>
        </div>
        <p class="hl-desc">Won the HappyRobot track at the first edition of HackSpain.</p>
    </div>
    <div class="achievement-entry">
        <h3 class="hl-title"><a href="https://eps.leeds.ac.uk/computing-undergraduate/news/article/5647/party-time-lasr-team-wins-gold-in-robocup-home-education-challenge">RoboCup</a>, SciRoc and <a href="https://www.linkedin.com/company/fruitpunchai/">FruitPunch AI</a></h3>
        <p class="hl-desc">I co-led the university robotics team with <a href="https://www.linkedin.com/in/jared-w-swift/">Jared</a> and competed in both challenges. I also took part in FruitPunch AI.</p>
    </div>
    <!-- Temporarily hidden: I also took part in the NASA International Space Apps Challenge. -->
</section>

<section id="contact">
    <nav class="social-links" aria-label="Contact and profiles">
        <a href="mailto:{{ site.email }}">email</a>
        <span class="nav-separator" aria-hidden="true">/</span>
        <a href="https://github.com/{{ site.github_username }}" target="_blank" rel="noopener">github</a>
        <span class="nav-separator" aria-hidden="true">/</span>
        <a href="https://huggingface.co/jucamohedano" target="_blank" rel="noopener">hugging face</a>
        <span class="nav-separator" aria-hidden="true">/</span>
        <a href="https://linkedin.com/in/{{ site.linkedin_username }}" target="_blank" rel="noopener">linkedin</a>
    </nav>
</section>
