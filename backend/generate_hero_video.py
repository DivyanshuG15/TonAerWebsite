import asyncio
import sys
import os
import traceback
from dotenv import load_dotenv

sys.path.insert(0, os.path.abspath(''))

from emergentintegrations.llm.openai.video_generation import OpenAIVideoGeneration

load_dotenv()


def generateVideo(prompt, output_path='/app/frontend/public/videos/hero-connectivity.mp4', model="sora-2", size="1280x720", duration=8):
    """Generate hero video with Sora 2"""
    video_gen = OpenAIVideoGeneration(api_key=os.environ['EMERGENT_LLM_KEY'])
    video_bytes = video_gen.text_to_video(
        prompt=prompt,
        model=model,
        size=size,
        duration=duration,
        max_wait_time=600,
    )
    if video_bytes:
        video_gen.save_video(video_bytes, output_path)
        return output_path
    return None


def main():
    prompt = (
        "Premium cinematic product film: a sleek matte-white desktop connectivity gateway device with a single subtle "
        "green LED accent, standing on a clean light-gray studio surface. Slow, smooth camera drift around the device. "
        "Faint glowing emerald data lines rise gently from the device and flow toward a soft abstract cloud formation "
        "of light above it, symbolizing data flowing from hardware to cloud intelligence. Minimal, elegant, enterprise "
        "technology aesthetic. Soft diffused daylight, shallow depth of field, photorealistic, calm and premium. "
        "No text, no logos, no people, no clutter."
    )
    result = generateVideo(prompt)
    print(f'Video saved to: {result}' if result else 'Video generation failed')


if __name__ == "__main__":
    try:
        main()
    except Exception:
        traceback.print_exc()
        sys.exit(1)
