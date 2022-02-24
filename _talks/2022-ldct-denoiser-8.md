---
title: "3D residual convolutional neural network for low dose CT denoising"
collection: talks
type: "Poster"
permalink: /talks/2022-ldct-denoiser-8
venue: "SPIE Medical Imaging 2022"
date: 2022-02-21
location: "San Diego, CA, USA"
---

[Presentation](https://spie.org/medical-imaging/presentation/3D-residual-encoder-decoder-convolutional-neural-network-for-low-dose/12031-165?SSO=1)

CT continues to be one of the most widely used medical imaging modalities. Concerns about long term effect of x-ray radiation on patients have led to efforts to reduce the x-ray dose imparted during CT exams. Lowering CT dose results in a lower signal to noise ratio in CT data which lowers CT Image Quality (IQ). Deep learning algorithms have shown competitive denoising results against the state-of-art image-based denoising approaches. Among these deep learning algorithms, deep residual networks have demonstrated effectiveness for edge-preserving noise reduction and imaging performance improvement compared to traditional edge-preserving filters. Previously published Residual Encoder- Decoder Convolutional Neural Network (RED-CNN) showed significant achievement for noise suppression, structural preservation, and lesion detection. However, its 2D architecture makes it unsuitable for thin slice and reformatted (sagittal, coronal) imaging. In this work, we present a novel 3D RED-CNN architecture, evaluate the effect of model parameters on performance and IQ, and show steps to improve optimization convergence. We use standard imaging metrics (SSIM, PSNR) to assess imaging performance and compare to previously published algorithms. Compared to 2D RED-CNN, our proposed 3D RED CNN produces higher quality 3D results, as shown by reformatted (sagittal, coronal) views, while maintaining all advantages of the original RED-CNN in axial imaging.
