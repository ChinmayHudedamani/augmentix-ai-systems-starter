// AUGMENTiX AI Systems Starter Web Studio
document.addEventListener('DOMContentLoaded', () => {
    const selModel = document.getElementById('sel-model');
    const bitsRadios = document.querySelectorAll('input[name="bits"]');
    const resStatic = document.getElementById('res-static');
    const resPeak = document.getElementById('res-peak');
    const resHeadroom = document.getElementById('res-headroom');
    const jsonReq = document.getElementById('json-req');
    const jsonRes = document.getElementById('json-res');
    const phaseContent = document.getElementById('phase-content');

    const PHASES = {
        1: {
            title: "Phase 1: Foundations & CUDA Hardware Profiling (Weeks 1-2)",
            goal: "Master hardware memory layouts, DMA transfers, and hardware profiling baselines.",
            items: [
                { title: "Week 1: Modern Systems Architecture & Hardware Profiling", desc: "Understanding Von Neumann bottlenecks, GPU memory hierarchies, and writing PyTorch CUDA memory profilers (benchmarks/run_profiler.py)." },
                { title: "Week 2: High-Performance Data Engineering & Tensor Layouts", desc: "Row-major vs column-major contiguous buffers, Polars zero-copy pipelines, and PyTest test suites (tests/test_engine.py)." }
            ]
        },
        2: {
            title: "Phase 2: Post-Training Quantization & Bit-Packing (Weeks 3-4)",
            goal: "Implement symmetric/asymmetric quantization and 8-weight uint32 register bit-packing.",
            items: [
                { title: "Week 3: Post-Training Quantization (PTQ) & Scale Calibration", desc: "FP16 to INT8/INT4 discretization, outlier preservation, and group-wise quantization with group size G=64." },
                { title: "Week 4: uint32 Bit-Packing & Fused Dequantization Kernels", desc: "Packing 4-bit nibbles into 32-bit registers and writing fused dequantization matrix-multiplication kernels in CUDA." }
            ]
        },
        3: {
            title: "Phase 3: Serving, PagedAttention & State Machines (Weeks 5-6)",
            goal: "Build streaming REST APIs and eliminate KV-cache fragmentation during generation.",
            items: [
                { title: "Week 5: PagedAttention & Sliding-Window KV-Cache Management", desc: "Sliding-window 2048-token context buffers, attention sinks for perplexity stability, and eliminating OOM crashes." },
                { title: "Week 6: Production FastAPI Orchestration & Telemetry Streaming", desc: "Server-Sent Events (SSE) streaming token output with single-line telemetry logging: [TTFT | Tokens/sec | VRAM]." }
            ]
        },
        4: {
            title: "Phase 4: Multi-Agent State Machines & Hackathon Capstone (Weeks 7-8)",
            goal: "Integrate autonomous tool execution and prepare a national hackathon winning submission.",
            items: [
                { title: "Week 7: Deterministic Multi-Agent State Transitions & Tools", desc: "Structured outputs with Pydantic v2, Typst PDF report compilation, and Plotly vector charts." },
                { title: "Week 8: Hackathon Packaging, Documentation & Pitch Deck", desc: "One-click deployment, production README standards, IEEE preprint drafting, and live demo showcase." }
            ]
        }
    };

    function updateBudget() {
        const paramBillions = parseFloat(selModel.value);
        let bits = 4;
        bitsRadios.forEach(r => { if (r.checked) bits = parseInt(r.value); });

        const modelName = selModel.options[selModel.selectedIndex].text.split(' ')[0];

        // Calculation: (params * bits) / 8 in GB
        const staticGB = (paramBillions * bits) / 8.0;
        const peakGB = staticGB * 1.35;
        const headroomGB = Math.max(0, 6.0 - peakGB);

        resStatic.textContent = `${staticGB.toFixed(3)} GB`;
        resPeak.textContent = `${peakGB.toFixed(3)} GB`;
        resHeadroom.textContent = `${headroomGB.toFixed(3)} GB Remaining`;

        jsonReq.textContent = JSON.stringify({
            model_id: modelName,
            param_count_billions: paramBillions,
            quantization_bits: bits
        }, null, 2);

        jsonRes.textContent = JSON.stringify({
            model_id: modelName,
            quantization_bits: bits,
            static_weight_vram_gb: parseFloat(staticGB.toFixed(3)),
            estimated_peak_vram_gb: parseFloat(peakGB.toFixed(3)),
            status: "VALIDATED"
        }, null, 2);
    }

    function renderPhase(phaseNum) {
        const p = PHASES[phaseNum];
        let itemsHtml = p.items.map(it => `
            <li class="curriculum-item">
                <h4>${it.title}</h4>
                <p>${it.desc}</p>
            </li>
        `).join('');

        phaseContent.innerHTML = `
            <div class="phase-title">${p.title}</div>
            <div class="phase-goal">🎯 Milestone: ${p.goal}</div>
            <ul class="curriculum-list">
                ${itemsHtml}
            </ul>
        `;
    }

    selModel.addEventListener('change', updateBudget);
    bitsRadios.forEach(r => {
        r.addEventListener('change', () => {
            document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            r.closest('.toggle-btn').classList.add('active');
            updateBudget();
        });
    });

    document.querySelectorAll('.s-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.s-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderPhase(parseInt(tab.dataset.phase));
        });
    });

    updateBudget();
    renderPhase(1);
});
