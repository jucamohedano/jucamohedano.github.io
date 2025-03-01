---
layout: default
---

<section class="bio">
    <img src="assets/images/profile.jpg" alt="{{ site.title }}">
    <p>
        Hello! I'm <strong>Juan Camacho Mohedano</strong>, an AI researcher and robotics enthusiast passionate about pushing the boundaries of intelligent systems. 🚀
    </p>
    <p>
        Currently pursuing my MSc in AI Systems at the University of Trento, I'm exploring cutting-edge research in AI Agents, Large Language Models (LLMs), and Vision-Language Models (VLMs). My journey in AI has taken me from building CNN-based classifiers to implementing advanced test-time adaptation techniques for vision models.
    </p>
    <p>
        With experience at NEURA Robotics in Germany and a background in robotics competitions (RoboCup), I blend theoretical knowledge with practical applications. My work spans from 6DoF robot grasping to customizing RAG applications for optimized vector search retrieval.
    </p>
    <p>
        I'm always excited to collaborate on projects that leverage AI to solve real-world problems, particularly at the intersection of computer vision, natural language processing, and robotics.
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
    <ul class="project-list">
        <li>
            <strong><a href="/blog/2022/05/01/bsc-thesis-robot-grasping/">6DoF Robot Grasping with TIAGo</a></strong> - My BSc thesis project on teaching robots to grasp objects using deep learning and computer vision. Developed for the LASR team and RoboCup competitions.
        </li>
        <li>
            <strong><a href="https://github.com/jucamohedano/my_TDA" target="_blank">Test-Time Adaptation for Vision-Language Models</a></strong> - Analysis and improvement of efficient adaptation techniques for vision models facing distribution shifts. Benchmarked failure cases and implemented waiting list mechanism to improve performance on non-IID data streams.
        </li>
        <li>
            <strong><a href="#">Project Name 3</a></strong> - Brief description of the project, its purpose, and your role in it.
        </li>
    </ul>
</section>

<section id="contact">
    <h2>Contact</h2>
    <p>Email: <a href="mailto:{{ site.email }}">{{ site.email }}</a></p>
    <div class="social-links">
        <a href="https://github.com/{{ site.github_username }}" target="_blank"><i class="fab fa-github"></i>GitHub</a>
        <a href="https://linkedin.com/in/{{ site.linkedin_username }}" target="_blank"><i class="fab fa-linkedin"></i>LinkedIn</a>
        <a href="https://twitter.com/{{ site.twitter_username }}" target="_blank"><i class="fab fa-twitter"></i>Twitter</a>
        <a href="https://scholar.google.com/citations?user={{ site.google_scholar }}" target="_blank"><i class="fas fa-graduation-cap"></i>Google Scholar</a>
    </div>
</section> 