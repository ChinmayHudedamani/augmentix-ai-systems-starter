"""
Unit tests for AUGMENTiX AI Systems model loader and budgeting
"""
import pytest
from src.engine.model_loader import InferenceEngine

def test_vram_calculation():
    engine = InferenceEngine(model_id="Qwen2.5-1.5B-Instruct", bits=4)
    budget = engine.calculate_memory_budget(param_count_billions=1.54)
    
    # 1.54B * 4 bits / 8 = 0.77 GB
    assert budget["static_weight_vram_gb"] == 0.77
    assert budget["estimated_peak_vram_gb"] > budget["static_weight_vram_gb"]

def test_8bit_budget():
    engine = InferenceEngine(model_id="Llama-3-8B", bits=8)
    budget = engine.calculate_memory_budget(param_count_billions=8.0)
    assert budget["static_weight_vram_gb"] == 8.0
