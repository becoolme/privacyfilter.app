---
title: "HideMyData: A Native macOS Client Built on the Same Privacy Filter Model"
description: "A community-built Mac app, HideMyData, runs the openai/privacy-filter model on-device for PDF and image redaction — same model behind this site, but native via MLX and Apple Vision."
pubDate: 2026-04-29
author: "Privacy Filter Team"
tags: ["releases", "macos", "open-source"]
---

You know that feeling when you need to share a screenshot or a PDF with someone, and you spend ten minutes squinting at it for any name, email, or account number you forgot to scribble out in Preview? That's the workflow [HideMyData](https://github.com/mkbula/HideMyData) is trying to delete.

It's a native macOS app from [mkbula](https://github.com/mkbula) that just shipped v0.1.0 on April 28. What caught our attention: it runs the **same `openai/privacy-filter` model** that powers this site — only natively, through [MLX-Swift](https://github.com/ml-explore/mlx-swift), with Apple Vision handling OCR for PDFs and images. Same brain, different body.

So if you've used Privacy Filter Online and wished it could chew through a stack of PDFs without copy-pasting page by page, there's now a Mac app that does roughly that. Locally. Open source. GPL-3.0. We didn't build it, but the lineage is interesting and the project is good, so it's worth a write-up.

## What it actually does

You drop a PDF or an image in. HideMyData runs it through three layers:

1. **Apple Vision OCR** pulls text out — including from scanned PDFs and the kind of broken PDFs where the embedded fonts hide text from selection (those are the worst).
2. **The privacy-filter model, in MLX 8-bit quant**, runs the same kind of NER inference we do here, but on the Apple Neural Engine via unified memory. It catches names, emails, phones, addresses, dates, and IDs in context.
3. **Hand-maintained regex** for the things context doesn't help with: IBAN, SSN, MAC addresses, IPv4/v6, JWT, API keys, crypto wallet addresses. The regex layer catches the deterministic stuff so the model can focus on the fuzzy stuff.

You get a draft of redaction rectangles. You can adjust them — add new ones, delete false positives, tweak edges. Two redaction styles: solid black or frosted-glass blur. The frosted blur is honestly nicer for screenshots you still want to look professional.

When you save, **the redactions are baked in**. Pages get rasterized and rebuilt — the original glyphs and text are gone from the file, not just covered. This matters more than it sounds. The classic PDF redaction mistake is drawing a black rectangle on top and shipping it: the text underneath is still there, copy-pasteable, and people get fired. HideMyData rebuilds the page so there's nothing left under the rectangle to recover.

## How it compares to Privacy Filter Online

We host the browser version. Same model, but running through Transformers.js and WebGPU/WASM in your tab. That's a great fit when you have a snippet of text or one image to scan and don't want to install anything.

HideMyData is the better fit when:

- You have **PDFs**, especially multi-page ones. Browsers can render PDFs but not happily redact them.
- You're working with **scanned documents** where OCR quality really matters — Apple Vision is genuinely strong here.
- You'd rather **not re-download a model into a browser cache** every time Chrome decides to clear it. The native app keeps the model in `~/Library/Application Support/HideMyData/`.
- You need the **rasterize-and-rebuild** save behavior. The web version redacts text spans for you to copy out; it doesn't rewrite a PDF for you.

It's the same idea, taken native, with the disk and GPU access that browsers can't give you.

## What's cool about the build

A few things worth pointing out if you're curious about the implementation:

- **MLX-Swift** for inference. Apple's MLX is the right choice on Apple Silicon — unified memory means no GPU/CPU copy, and the 8-bit quant of `openai/privacy-filter` fits comfortably in working memory.
- **OpenMedKit** wraps the model loading. It's the Swift glue that turns the Hugging Face weights into something MLX can consume.
- **PDFKit + Vision + the model** in one pipeline. Each layer is Apple-native — no Python sidecar, no Electron, no spinning fans. Cold start is fast.

The build also avoids the trap of "smart auto-redactor that you have to trust." There's a manual editing step before save. You see what the model proposed, you accept or change it, then it's permanent. That's the right division of labor for something that, if it screws up, leaks data.

## The catches

It's v0.1.0. Things to know:

- **macOS 26 or later, Apple Silicon only.** The MLX backend won't run on Intel Macs.
- **Not signed with a developer certificate** yet. First launch will get blocked by Gatekeeper. The README has the `xattr -rd com.apple.quarantine /Applications/HideMyData.app` workaround.
- **First-run model download is ~1.5 GB.** Plan accordingly if you're on a hotel network.
- It's GPL-3.0, which matters if you're thinking about embedding it somewhere commercial.

Early-stage open source, in other words. The pieces are all there, the demo video on the repo looks clean, but expect rough edges and watch the issue tracker.

## Try it

- The repo: [github.com/mkbula/HideMyData](https://github.com/mkbula/HideMyData)
- Latest release: [v0.1.0](https://github.com/mkbula/HideMyData/releases/tag/v0.1.0)
- The model both projects share: [openai/privacy-filter](https://huggingface.co/openai/privacy-filter)

If you build something with the same model on a different platform, let us know. The whole point of an open model is that the browser tool, the Mac app, and whatever comes next are all aiming at the same problem from different angles.
