---
layout: default
---

<section class="bio">
    <img src="assets/images/profile.jpg" alt="{{ site.title }}">
    <p>
        Hello! I'm <strong>{{ site.title }}</strong>, a Researcher/Engineer specializing in [Your Field]. 
        I'm currently [Current Position] at [Organization].
    </p>
    <p>
        My research interests include [Topic 1], [Topic 2], and [Topic 3]. I'm particularly interested in 
        [Specific Interest] and its applications in [Field/Industry].
    </p>
    <p>
        Prior to my current role, I worked at [Previous Organization] on [Previous Project/Role]. 
        I received my [Degree] in [Field] from [University].
    </p>
</section>

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

<section id="projects">
    <h2>Projects</h2>
    <ul class="project-list">
        <li>
            <strong><a href="#">Project Name 1</a></strong> - Brief description of the project, its purpose, and your role in it.
        </li>
        <li>
            <strong><a href="#">Project Name 2</a></strong> - Brief description of the project, its purpose, and your role in it.
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