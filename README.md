# Personal Portfolio & Blog

This repository contains the source code for my personal portfolio website and blog, built with Jekyll and GitHub Pages.

## Overview

This website serves as:
- A professional portfolio highlighting my skills and projects
- A blog where I share my thoughts and research
- A central hub for my online presence

## Technologies Used

- Jekyll static site generator
- GitHub Pages for hosting
- HTML5, CSS3, JavaScript
- Markdown for content

## Blog Features

This site uses Jekyll to:
- Write blog posts in Markdown
- Automatically generate post listings
- Create categories and tags for posts
- Support code syntax highlighting
- Format mathematical equations with MathJax

## Development

To run this site locally:

1. Install Ruby and Bundler
2. Clone this repository
3. Run `bundle install`
4. Run `bundle exec jekyll serve`
5. Open `http://localhost:4000` in your browser

## Updating the Site

### Adding a New Blog Post

1. Create a new file in the `_posts` directory with the format `YYYY-MM-DD-title.md`
2. Add the following YAML front matter at the top:

```yaml
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD
reading_time: X
excerpt_separator: <!--more-->
categories: [category1, category2]
tags: [tag1, tag2, tag3]
---
```

3. Write your post content in Markdown
4. Add `<!--more-->` where you want the excerpt to end
5. Commit and push the changes

### Updating Personal Information

Edit the `_config.yml` file to update:
- Your name, email, and description
- Social media links
- Other site settings

## Deployment

This site is deployed using GitHub Pages. Any changes pushed to the `main` branch will be automatically deployed.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 