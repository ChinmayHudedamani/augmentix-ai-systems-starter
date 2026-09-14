# AUGMENTiX Engineering Standards & Contribution Rules

## 1. Branch Strategy
- `feat/<feature-name>`: Net new engine logic, tools, or endpoints.
- `fix/<bug-name>`: Bug fixes and regression patches.
- `perf/<optimization>`: Quantization, CUDA optimizations, or latency reductions.

## 2. Commit Message Convention
Follow standard Conventional Commits:
- `feat(engine): integrate AWQ INT4 quantized weight loader`
- `fix(api): handle malformed JSON fallback in agent loop`
- `perf(cuda): fuse dequantization register access`

## 3. Pull Request Requirements
1. Code must pass `ruff check .` and `mypy src`.
2. Attach memory footprint logs for any code touching tensor/VRAM operations.
