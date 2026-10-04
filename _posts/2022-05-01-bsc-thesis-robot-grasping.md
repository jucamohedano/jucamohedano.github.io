---
layout: post
title: "Teaching Robots to Grab Stuff: My BSc Thesis Adventure"
date: 2022-05-01
reading_time: 8
excerpt_separator: <!--more-->
categories: [robotics, projects]
tags: [robotics, TIAGo, 6DoF, grasping, computer-vision, deep-learning, RoboCup]
image: /assets/images/contact_graspnet_inference_example.png
---

For my BSc thesis in Computer Science with AI at the University of Leeds, I worked on 6DoF robot grasping for the TIAGo robot. The aim was to let TIAGo find a sensible way to pick objects up from a table in a simulated room, as part of the kind of service-robot task used in RoboCup@Home.

*Thesis supervised by [Mehmet Dogar](https://eps.leeds.ac.uk/computing/staff/743/dr-mehmet-dogar) at the University of Leeds and [Matteo Leonetti](https://www.kcl.ac.uk/people/matteo-leonetti) at King's College London.*

<!--more-->

## The problem

A grasp is not just a point on an object. The robot has to decide where the gripper should be, how it should be oriented, and whether the resulting motion is physically possible. That becomes difficult as soon as objects have different shapes, appear from different viewpoints, or are close together on a table.

The project therefore had to connect several pieces: perception to understand the scene, grasp generation to propose a hand pose, and execution to send that pose to the robot. A good grasp in isolation was not enough if the robot could not reach it safely.

![TIAGo robot in simulation environment](/assets/images/contact_graspnet_inference_example.png)
*A TIAGo grasping example in simulation.*

## From the camera to a grasp

![System Overview Diagram](/assets/images/system_overview.png)
*System architecture overview showing the perception, grasp generation, and execution components*

The perception part of the system used RGB-D data to build a view of the scene. It detected objects, generated point clouds, and separated objects that were close together so that the grasping stage could work with them individually.

The output of that stage was passed to the grasp generator, which proposed possible six-degree-of-freedom poses for the gripper. I then compared two different ways of producing those poses.

The first was an analytical approach based on geometry and vector computations. It was quick and explicit: given the shape and the constraints of the gripper, it could calculate candidate grasps directly. The second was a learning-based approach that predicted successful grasps from examples. It was more adaptable to unfamiliar shapes, but it also introduced the usual questions about training data and generalisation.

In the experiments, the learning-based method performed better overall, particularly on objects that were less regular. The comparison was useful because it made the trade-off visible: analytical methods are easier to reason about, while learned methods can handle patterns that are difficult to describe with a fixed set of geometric rules.

## From Simulation to RoboCup

My experiments focused on cleaning up tables in a simulated room, a common service-robot task. The complete system took an RGB-D view of the table, generated candidate grasps, and sent the selected one to TIAGo for execution.

The most rewarding part was seeing the grasping system integrated into the Leeds Autonomous Service Robots (LASR) team's codebase for RoboCup. The work stopped being an isolated thesis experiment and became one component of a larger robot that had to navigate, perceive, plan, and act as a team.

## What I took away

The project taught me how large the gap can be between a method that works in a controlled experiment and a system that has to operate as part of a robot. Perception errors affect grasp generation, grasp poses affect motion planning, and small integration details can stop the whole task from working.

Simulation made it possible to iterate quickly without risking hardware, but it also hid some of the problems that appear on a physical platform. That tension between fast experimentation and realistic behaviour stayed with me when I later worked with MiPA at NEURA Robotics.

This thesis was also the first time I saw a research idea become part of a real competition codebase. That combination of geometry, machine learning, and robot integration is what made the project such a useful foundation for the robotics work that followed.

## References

The project code is available on [GitLab](https://gitlab.com/f1683) (private repository, but I can share specific components upon request).
