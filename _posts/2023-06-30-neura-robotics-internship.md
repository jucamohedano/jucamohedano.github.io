---
layout: post
title: "Building Software for the MiPA Robot at NEURA Robotics"
date: 2023-06-30
reading_time: 7
excerpt_separator: <!--more-->
categories: [robotics, career]
tags: [robotics, ROS2, simulation, gazebo, MiPA, internship, deep-learning]
image: /assets/images/mipa.jpeg
---

From January to June 2023, I worked as a Robotics Developer in the R&D team at NEURA Robotics. I spent six months working with MiPA, a robot platform designed for everyday interaction, and moved between simulation, grasping, perception, and the software needed to operate the robot safely.

<!--more-->

*My internship at NEURA Robotics, Bielefeld, Germany.*

![NEURA Robotics MiPA Robot](/assets/images/mipa.jpeg){:style="width: 50%;"}
*The MiPA robot that I worked with during my internship.*

## Adding an arm to the simulation

One of my first tasks was to update MiPA's robot description in XML. The goal was to add a robot arm to the torso so that the simulated robot matched the hardware we were working with.

This was more than just adding another component to a file. The geometry had to be accurate enough for the simulator to compute collisions correctly, especially while we were developing an autonomous robot task. I had to speak with the engineers working on the physical robot and use their input to make sure the simulation represented the real platform properly.

That was one of my first lessons from working on a real robot: the boundary between software and hardware is not as clean as it looks from the outside. A detail in an XML file can affect whether a planned motion is safe, whether a collision is detected, and whether an autonomous task can run at all.

## Keeping the simulated robot still

I also ran into a simulator issue that made the robot's base slowly drift even when it was supposed to remain stationary. I do not remember the exact underlying cause now, so I do not want to pretend that I can explain it precisely. The important part was the behaviour: the longer the simulation ran, the further the base moved from where it should have been.

I wrote a custom Gazebo plugin to correct that drift and keep the simulated base stable. It was a practical fix to an irritating problem, but it also showed me how different robotics software can be from ordinary application code. Sometimes the hard part is not implementing a new capability. It is making the virtual version of the robot behave consistently enough that the rest of the system can be tested.

## Trying different grasping methods

The internship also gave me a chance to continue working on robot grasping after my BSc thesis. I tried the grasping system I had developed during that project, including its analytical solution based on vector computations rather than a learned model. I also experimented with a diffusion-based grasp-generation method from another paper.

I did not arrive at one definitive grasping solution during the internship. The useful part was getting to test different ideas against a real robot platform and its constraints. A method that looks promising in a paper still has to fit the robot's sensors, geometry, control stack, and environment before it becomes useful.

## Making the robot safer to operate

Another part of my work was writing ROS 2 servers that acted as safety layers for the robot. They coordinated how the different services were turned on and off, so that the supporting servers were handled in the right order before the main system was shut down.

This kind of work is easy to overlook because it does not produce a flashy demo. But a robot needs more than perception and control algorithms. It also needs reliable procedures for starting, stopping, and recovering from problems without leaving other parts of the system in an unsafe state.

## Collecting data for everyday objects

I also collected RGB images for a YOLO object-detection model. The objects were deliberately ordinary: cans, mugs, books, and other things you might find around an office. That made the task feel close to the kind of environment where a service robot would actually have to operate.

Collecting the data was a useful reminder that perception systems depend on the details of the environment. Lighting, viewpoints, object placement, and the variety of everyday objects all matter. The dataset is not a glamorous part of a robotics project, but it determines what the detector has a chance of recognising later.

## Seeing MiPA outside the lab

The most memorable part of the internship came at the end, when we presented MiPA and demonstrated our work at the Automatica fair in Munich. After spending months moving between XML descriptions, simulator problems, ROS 2 services, and experiments, it was different to see the robot presented as a complete system to people outside the development team.

That final demo made the separate pieces feel connected. The simulation work, the safety layers, the perception experiments, and the robot itself were all part of the same challenge: making an autonomous machine do something useful without losing track of what can go wrong.

## What I took away

NEURA was my first experience contributing to a professional robotics platform, and it changed how I think about robotics projects. The interesting algorithms matter, but they are only one part of the work. Accurate models, stable simulation, safe system behaviour, and communication with the people building the hardware are just as important.

The internship also gave me a practical continuation of my BSc thesis. I could take ideas I had developed in a university project, try them on a different robot, and see the extra constraints that appear when the software has to interact with a real platform. That combination of research ideas and careful engineering is what I found most rewarding about the experience.
