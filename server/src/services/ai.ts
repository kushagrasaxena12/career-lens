import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
}

const ai = new GoogleGenAI({
    apiKey
});

export async function analyzeResume(resumeText: string, jdText: string) {
    const prompt = `
You are an AI career analysis assistant for CareerLens.

Analyze the candidate's resume against the provided job description.

Return ONLY valid JSON in this exact structure:

{
  "overallScore": 0,
  "summary": "",
  "skillsMatch": [],
  "missingSkills": [],
  "strengths": [],
  "recommendations": []
}

Rules:
- overallScore must be a number from 0 to 100.
- Base the score only on the resume and job description.
- Do not invent candidate experience or skills.
- Keep the summary concise.
- skillsMatch should contain skills from the JD that are supported by the resume.
- missingSkills should contain important JD skills not clearly present in the resume.
- strengths should contain relevant strengths supported by the resume.
- recommendations should provide practical ways to improve the candidate's fit.
- Return JSON only. No markdown. No code fences.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jdText}
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
    });

    const text = response.text;

    if (!text) {
        throw new Error("Gemini returned an empty response");
    }

    return JSON.parse(text);
}