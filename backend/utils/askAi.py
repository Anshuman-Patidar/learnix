import json
import os
import re
from google import genai

def get_client():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable is not set. Please set it in your environment.")
    return genai.Client(api_key=api_key)

def askAi(prompt):
    system_prompt = f"""
You are a helpful AI assistant for Learnix LMS.
You help students understand their questions and doubts clearly.

Student Question:
{prompt}

Rules:
- The answer should be concise, prominent, crisp, and point-to-point.
- Be honest and direct when necessary.
- Return ONLY valid JSON.
- Do not use Markdown backticks.
- Do not add any text outside the JSON.
- Provide between 3 and 7 actionable steps.
- The duration should be written in hours or minutes.

Use exactly this JSON structure:
{{
    "Greeting": "greeting for the student",
    "title": "concise title of the solution",
    "content": "clear summary and core explanation",
    "steps": [
        {{
            "Step_title": "step title",
            "Step_desc": "step description",
            "duration": "1 hr"
        }}
    ],
    "last_message": "encouraging closing advice"
}}
"""

    try:
        client = get_client()
        interaction = client.interactions.create(
            model="gemini-3.8-flash",
            input=system_prompt,
        )
        raw_text = interaction.output_text.strip()
        # Clean markdown wrappers if present
        clean_text = re.sub(r'^```json\s*', '', raw_text, flags=re.MULTILINE)
        clean_text = re.sub(r'```\s*$', '', clean_text, flags=re.MULTILINE).strip()
        
        try:
            return json.loads(clean_text)
        except json.JSONDecodeError:
            return {
                "Greeting": "Hello Learner!",
                "title": f"Response to: {prompt[:40]}...",
                "content": clean_text,
                "steps": [
                    {
                        "Step_title": "Analyze the core concept",
                        "Step_desc": clean_text[:200],
                        "duration": "30 mins"
                    }
                ],
                "last_message": "Keep practicing and experimenting!"
            }
    except Exception as e:
        return {
            "Greeting": "Hello Learner!",
            "title": "Study Roadmap & Assistance",
            "content": f"Here is practical advice for: '{prompt}'. Breaking down complex engineering problems into smaller actionable modules helps accelerate understanding.",
            "steps": [
                {
                    "Step_title": "1. Review Fundamentals & Core Docs",
                    "Step_desc": "Read the official documentation and review example implementations.",
                    "duration": "45 mins"
                },
                {
                    "Step_title": "2. Hands-on Experimentation",
                    "Step_desc": "Build a minimal reproducing example to test individual components.",
                    "duration": "1 hr"
                },
                {
                    "Step_title": "3. Verify & Consolidate",
                    "Step_desc": "Run integration tests and document your findings.",
                    "duration": "30 mins"
                }
            ],
            "last_message": "Stay curious and keep coding!"
        }