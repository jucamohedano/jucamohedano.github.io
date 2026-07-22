---
layout: post
title: "Putting AI Agents to Work in a Food Cooperative"
date: 2025-07-31
excerpt_separator: <!--more-->
categories: [applied-ai, internships]
tags: [agentic-workflows, CrewAI, RAG, GraphRAG, document-processing, OpenWebUI, multimodal]
image: /assets/images/covap_logo.png
---

Research problems come with a benchmark. Business problems come with a person who spends thirty minutes a day checking documents by hand. During my internship at COVAP I worked on the second kind: building agentic AI workflows to automate document-heavy processes at a large Spanish agri-food cooperative.

<!--more-->

*Internship at COVAP, May to July 2025.*

## Two Workflows

**Budget analysis.** The first was an agentic workflow, built with CrewAI and prototyped quickly in Langflow, that extracts and validates data from multi-page budget documents. It was designed to run over hundreds of budgets, replacing a repetitive manual check.

The result that mattered to the department wasn't a metric on a leaderboard: validation time per document went from around thirty minutes to under five, better than an 80% saving, with a human-in-the-loop verification step kept at the end. That last part is the design decision I'd defend hardest — the point was never to remove the person, it was to stop them spending their day on the mechanical part.

**Export validation.** The second workflow addresses a genuinely expensive failure mode: documentation errors that get a shipment rejected at customs. I designed a multi-step validation chain that uses multimodal models to check consistency across the original order, the various shipping PDFs, and photographs of the physical product tags. If those three disagree, you want to know before the goods leave, not after.

## Making It Reachable

A workflow nobody can find isn't automation, it's a script. COVAP runs a self-hosted [OpenWebUI](https://github.com/open-webui/open-webui) instance as its internal AI platform, so I wrote two filters for it:

- an **integration filter** that lets users launch the budget workflow directly from the chat interface, connecting the project to the tool people already had open;
- a **context-engineering filter** that improves query handling by dynamically injecting relevant context or running a more advanced retrieval step.

Building these meant reading a large unfamiliar codebase without much documentation and tracing its execution flow until I understood where a custom integration could hook in cleanly. That turned out to be as much of the work as the AI parts.

## When Standard RAG Isn't Enough

The existing retrieval setup — standard RAG with an LLM reranker — wasn't reliably surfacing key details from the document stores. Rather than tune prompts around the symptom, I went to the literature on advanced RAG and set up a test environment for **GraphRAG**, specifically [graphiti](https://github.com/getzep/graphiti) from Zep, to evaluate whether a temporal knowledge-graph approach would give more context-aware retrieval. That direction came out of a suggestion from my supervisor, and it reframed the problem from "better ranking" to "better structure".

The other half was getting clean text out of messy documents in the first place. I evaluated a chain of specialised models:

- **docling** for PDF to structured output,
- **OCRFlux** for high-fidelity PDF to Markdown,
- **NuExtract-2.0-8B** for pulling structured records out of the resulting Markdown.

The deliverable there was less a system than a recommendation: a tested, evidence-backed path forward for the company's document ingestion pipeline.

## What I Took Away

Three things stuck with me:

**Feedback loops beat clever prompts.** My supervisor acted as the link to the actual end users, and their feedback turned the budget agent from a naive prompt-based first version into something people would use. No amount of prompt engineering substitutes for finding out how the work is really done.

**Evaluating technology is real engineering work.** Testing graphiti, docling, OCRFlux and NuExtract and reporting honestly on which fit production was as valuable as the code I shipped — a negative result on a promising tool saves the next person weeks.

**Integration is where value gets realised.** The budget workflow only mattered once it was one click away inside the tool people already used. The gap between "it works on my machine" and "it is part of someone's day" is the whole job.

Coming from research projects where the target is a number on a benchmark, the shift to problems defined by someone's actual working day was the most useful thing about the experience.
