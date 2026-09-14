"""
AUGMENTiX AI Systems - Hardware VRAM Profiler & Benchmarking Harness
"""
import torch
import time
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("Benchmark")

def profile_device_vram():
    if not torch.cuda.is_available():
        logger.warning("CUDA unavailable. Running in CPU emulation mode.")
        return
    device_name = torch.cuda.get_device_name(0)
    total_mem = torch.cuda.get_device_properties(0).total_memory / (1024 ** 3)
    allocated = torch.cuda.memory_allocated(0) / (1024 ** 3)
    reserved = torch.cuda.memory_reserved(0) / (1024 ** 3)
    logger.info(f"Device: {device_name}")
    logger.info(f"Total Dedicated VRAM: {total_mem:.2f} GB")
    logger.info(f"Currently Allocated : {allocated:.3f} GB")
    logger.info(f"Currently Reserved  : {reserved:.3f} GB")

if __name__ == "__main__":
    profile_device_vram()
