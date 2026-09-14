# AUGMENTiX AI Systems: 8-Week Hackathon Incubation Syllabus

An intensive, systems-focused cohort curriculum designed to elevate 2nd and 3rd-year engineering undergraduates into top 1% hackathon qualifiers, systems engineers, and open-source contributors.

---

## 🏛️ Curriculum Overview

| Phase | Weeks | Focus Area | Deliverable Milestone |
| :--- | :--- | :--- | :--- |
| **Phase 1: Foundations** | Weeks 1–2 | Low-Level Tensors, Memory Layouts & CUDA Baselines | Hardware Memory Profiler & Baseline Matrix Benchmark |
| **Phase 2: Quantization** | Weeks 3–4 | Group-wise INT4 Discretization & Bit-Packing | Custom uint32 Bit-Packer & Dequant GEMM Kernel |
| **Phase 3: Serving & State** | Weeks 5–6 | Paged KV-Cache, Streaming SSE & FastAPI Orchestration | Resilient Local Inference API with Sub-100ms TTFT |
| **Phase 4: Capstone Sprint**| Weeks 7–8 | Multi-Agent Orchestration, Stress Testing & Hackathon Pitch | Production Submission + IEEE Conference Paper Draft |

---

## 📅 Detailed Week-by-Week Breakdown

### Week 1: Modern Systems Architecture & Hardware Profiling
- **Theory**: CPU vs. GPU architecture, Von Neumann bottlenecks, the Memory Bandwidth Wall.
- **Hands-on**:
  - Writing `benchmarks/run_profiler.py` using PyTorch CUDA runtime APIs.
  - Measuring host-to-device DMA transfer latencies.
- **Milestone 1**: Profile your local workstation GPU (RTX 30/40 series or Colab T4) and establish baseline FLOPS vs. Memory Bandwidth.

### Week 2: High-Performance Data Engineering & Tensor Layouts
- **Theory**: Row-major vs. column-major contiguous memory, cache locality, SIMD vectorization.
- **Hands-on**:
  - Ingesting multi-modal telemetry streams with Polars and zero-copy buffers.
  - Writing unit tests under `tests/` with PyTest.
- **Milestone 2**: Build an asynchronous telemetry ingestion pipeline processing 10,000 events/sec.

### Week 3: Post-Training Quantization (PTQ) & Numerical Formats
- **Theory**: FP32, FP16, BF16 vs. INT8/INT4. Symmetric vs. asymmetric quantization, outlier features.
- **Hands-on**:
  - Implementing min-max and percentile scale calibration algorithms.
  - Group-wise quantization with group size $G = 64$ or $128$.
- **Milestone 3**: Quantize a 1.5B model's weights and demonstrate zero NaN/Inf corruption.

### Week 4: Bit-Packing & Fused Dequantization Kernels
- **Theory**: 4-bit integer packing into 32-bit registers, bit-shift operations, register pressure.
- **Hands-on**:
  - Implementing 8-weight `uint32` bit-packing in Python and CUDA/C++.
  - Fused dequantization GEMM (`Y = X @ dequant(W_packed)`).
- **Milestone 4**: Achieve **>3.0x static memory compression** on consumer hardware.

### Week 5: Paged Attention & KV-Cache Management
- **Theory**: Memory fragmentation in autoregressive generation, vLLM PagedAttention mechanics.
- **Hands-on**:
  - Dynamic sliding-window attention (2048-token context buffer).
  - Attention sink preservation for non-divergent multi-turn dialogues.
- **Milestone 5**: Run 1,000-turn chat simulations without Out-Of-Memory (OOM) crashes.

### Week 6: Production API Orchestration & Telemetry Streaming
- **Theory**: Server-Sent Events (SSE), asynchronous event loops, Pydantic v2 validation.
- **Hands-on**:
  - Deploying FastAPI server with token-by-token streaming endpoints.
  - Logging single-line telemetry: `[TTFT: 72ms | Throughput: 17 tok/s | VRAM: 2.9GB]`.
- **Milestone 6**: Complete end-to-end web client interacting with the local INT4 runtime.

### Week 7: Multi-Agent State Machines & Tool Integration
- **Theory**: Deterministic state transitions, tool calling without hallucinations, structured outputs.
- **Hands-on**:
  - Function calling integration for PDF report compilation (Typst) and vector plotting (Plotly).
  - Red-team prompt injection stress testing.
- **Milestone 7**: Build an autonomous multi-tool agent capable of end-to-end data analysis.

### Week 8: Hackathon Packaging, Documentation & Pitch Deck
- **Theory**: What top hackathon juries look for: Engineering depth > superficial UI, reproducible benchmarks.
- **Hands-on**:
  - Writing production README with ASCII architecture diagrams and benchmarks.
  - Packaging one-click Docker and startup scripts.
  - Drafting a 4-page IEEE formatted research preprint.
- **Milestone 8**: Final Presentation & Demo Day Showcase.
