import os
import json
import pymupdf
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_preview_image(pdf_path, output_path):
    try:
        doc = pymupdf.open(pdf_path)
        page = doc.load_page(0)
        pix = page.get_pixmap(dpi=150)
        pix.save(output_path)
        doc.close()
        return True
    except Exception as e:
        print(f"Error generating preview image: {e}")
        return False

def parse_pdf_to_text(file_path):
    try:
        doc = pymupdf.open(file_path)
        text = ""
        for page in doc:
            text += page.get_text()
        doc.close()
        return text
    except Exception as e:
        print(f"Error parsing PDF to text: {e}")
        return ""

def get_feedback_from_gemini(resume_text, job_title, job_description):
    ai_response_format = """
      {
        "overallScore": "number (max 100)",
        "ATS": {
          "score": "number (rate based on ATS suitability)",
          "tips": [
            {"type": "good | improve", "tip": "string (3-4 tips)"}
          ]
        },
        "toneAndStyle": {
          "score": "number (max 100)",
          "tips": [
            {"type": "good | improve", "tip": "string", "explanation": "string"}
          ]
        },
        "content": {
          "score": "number (max 100)",
          "tips": [
            {"type": "good | improve", "tip": "string", "explanation": "string"}
          ]
        },
        "structure": {
          "score": "number (max 100)",
          "tips": [
            {"type": "good | improve", "tip": "string", "explanation": "string"}
          ]
        },
        "skills": {
          "score": "number (max 100)",
          "tips": [
            {"type": "good | improve", "tip": "string", "explanation": "string"}
          ]
        }
      }
    """

    prompt = f"""
        You are an expert in ATS (Applicant Tracking System) and resume analysis.
        Please analyze and rate this resume and suggest how to improve it.
        Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
        If there is a lot to improve, don't hesitate to give low scores. This is to help the user improve their resume.
        Use the job description for the job the user is applying for to give more detailed feedback.

        The job title is: "{job_title}"
        The job description is: "{job_description}"
        
        The resume text is:
        ---
        {resume_text}
        ---

        Provide the feedback using the following JSON format ONLY:
        {ai_response_format}

        Return the analysis as a valid JSON object, without any other text, comments, or markdown backticks.
    """
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt)
        
        cleaned_response_text = response.text.strip().replace("```json", "").replace("```", "")
        feedback_json = json.loads(cleaned_response_text)
        return feedback_json

    except Exception as e:
        print(f"Error getting feedback from Gemini: {e}")
        return None