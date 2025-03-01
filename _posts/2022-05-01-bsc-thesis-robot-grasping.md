---
layout: post
title: "Teaching Robots to Grab Stuff: My BSc Thesis Adventure"
date: 2022-05-01
reading_time: 8
excerpt_separator: <!--more-->
categories: [robotics, projects]
tags: [robotics, TIAGo, 6DoF, grasping, computer-vision, deep-learning, RoboCup]
---

Ever wondered how robots pick up objects without dropping or crushing them? That's exactly what I spent months figuring out for my BSc thesis at the University of Leeds! 🤖🦾

<!--more-->

## The Challenge: Teaching Robots to Grab Like Humans

For my Computer Science with AI degree, I tackled one of robotics' classic challenges: **object grasping**. Specifically, I worked on generating 6 Degrees of Freedom (6DoF) grasps for the TIAGo robot. Sounds fancy, right? 

In human terms, I taught a robot how to analyze objects, figure out the best way to position its gripper (robot hand), and successfully pick things up without making a mess. Think of it as teaching a toddler to grab objects, except this toddler is made of metal and runs on code.

![TIAGo robot in simulation environment](/assets/images/contact_graspnet_inference_example.png)
*The TIAGo robot in simulation, plotting its next grasp. (You'll need to replace this with an actual screenshot from your project!)*

## Why This Matters

Autonomous service robots need to navigate human environments and manipulate all kinds of objects - from coffee mugs to oddly-shaped toys. The challenge is that:

1. Household objects come in countless shapes and sizes
2. Objects have different physical properties (fragile vs. sturdy)
3. Robots often encounter objects they've never seen before
4. The real world is messy and unpredictable

Getting this right means robots that can genuinely help in homes, hospitals, and other human spaces.

## The Technical Bits

I combined two main components to create a complete autonomous grasping system:

![System Overview Diagram](/assets/images/system_overview.png)
*System architecture overview showing the perception, grasp generation, and execution components*

### 1. 3D Perception System
This system used neural networks to:
- Detect objects in the robot's environment
- Generate point clouds from RGB-D camera data
- Segment individual objects even when they're clustered together

### 2. Grasp Generation Systems

I implemented and compared two approaches:

**Analytical Approach:**
- Used geometric algorithms to identify potential grasp points
- Considered physical constraints of the robot's gripper
- Fast but less adaptable to unusual shapes

**Learning-Based Approach:**
- Trained neural networks to predict successful grasps
- Learned from thousands of example grasps
- More adaptable to novel objects

The learning-based model consistently outperformed the analytical approach, especially with odd-shaped objects (which are everywhere in the real world!).

## From Simulation to RoboCup

My experiments focused on cleaning up tables in a simulated room - a common task in service robotics competitions like RoboCup@Home. The system performed really well, with the TIAGo robot successfully picking up various objects without human intervention.

The coolest part? My grasping system was integrated into the Leeds Autonomous Service Robots (LASR) team's codebase for use in the RoboCup competition! It's amazing to see your code helping a robot compete on an international stage.

## Lessons Learned

Working on this project taught me:

1. The gap between theory and practice in robotics is HUGE
2. Simulation is amazing for rapid prototyping, but has limitations
3. Machine learning approaches often outperform analytical methods for complex real-world tasks
4. Integration of multiple systems (perception, planning, grasping) requires careful state management

## What's Next?

This project was just the beginning of my robotics journey. The techniques I developed could be extended to:
- Two-handed manipulation
- Grasping dynamic (moving) objects
- Learning from human demonstrations
- Integrating tactile feedback for more precise grasps

If you're curious about robot grasping or want to discuss anything related to autonomous robots, feel free to reach out! I'm always happy to chat about robots picking things up (and sometimes dropping them).

## References

The project code is available on [GitLab](https://gitlab.com/f1683) (private repository, but I can share specific components upon request). 