---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---
[Download](https://leimingyu.github.io/files/LeimingYu_resume.pdf)

{% include base_path %}


Education
======
* B.S. in Electrical Engineering, Shanghai Maritime University, China, 2006
* M.S. in Electrical Engineering, University of Bridgeport, CT, USA, 2010
* Ph.D in Computer Engineering, Northeastern University, MA, USA, 2019 


Work experience
======
* July 2019 - Present: Imaging Engineer at **Analogic** 
  * Optimize Computed Tomography related algorithms on GPUs 
	* Improve Metal Artifact Reduction by 12x
	* Improve Extended Field of View by 70x
  * Optimize CT algorithms to run a single GPU, rather than two, saving production cost
  * Integrate Deep Learning Models in the Recon Software for future CT systems 
  * Evaluate Operating Systems for future CT scanners 
  * GPU Evaluation and Image Quality Evaluation for recon software releases

* July - Dec 2016: Internship at **MERL**
  * Optimized Model Predictive Control solvers (PQP and ADMM) on NVIDIA Jetson TX1 
  * Developed efficient SGEMV kernels that outperform cuBLAS on NVIDIA Jetson TX1
  * Developed mpcCUDA, GPU-accelerated Model Predictive Control solvers in Matlab 

* Summer 2012: Internship at **Mathworks** 
  * Accelerated PSK Demodulator/Modulator on GPU 
  * Accelerated LDPC Decoder for Large Parity Check Matrix on GPU 
  * Improved the parfor section in commViterbiSystemGPU demo
  * Accelerated Turbodecoder on Matlab Distributed Computing Server (MDCS)
  

Awards
======
* Student Travel Grant : IISWC 2017 
* Student Travel Grant: PPoPP 2015
* Best Poster: HPC Day 2017
* Best Poster: HPC Day 2016
* GE Hackathon Challenge: ["Most Robust"](https://www.khoury.northeastern.edu/ge-hackathon-challenge/) Winner 2017 


Peer Review
======
* Parallel, Distributed and Network-based Processing (PDP), 2016
* Simulation Modelling Practice and Theory (Elsevier Journal), 2018
* IEEE Transactions on Computers(TCSI), 2019
* Journal of Parallel and Distributed Computing (JPDC), 2019 


Talks
======
  <ul>{% for post in site.talks %}
    {% include archive-single-talk-cv.html %}
  {% endfor %}</ul>
  

Teaching
======
  <ul>{% for post in site.teaching %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>


Publications
======
  <ul>{% for post in site.publications %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
