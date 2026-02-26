import Groq from 'groq-sdk';
import axios from 'axios';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function analyzeWithAI(content, inputType, fileUrl) {
  const contentToAnalyze = fileUrl
    ? `[Uploaded File: ${fileUrl}]\n\n${content || ""}`
    : content;

  const prompt = `You are a cybersecurity phishing detection expert. Analyze the following ${inputType} for phishing indicators, malicious content, and threat signals.

Content to analyze:
---
${contentToAnalyze}
---

Perform a thorough analysis checking for:
- Suspicious URLs or domains (typosquatting, newly registered, unusual TLDs)
- Urgency language or social engineering tactics
- Credential harvesting attempts
- Spoofed sender information
- Suspicious attachments or links
- Known phishing patterns
- Grammar and spelling anomalies typical of phishing
- Mismatched display names and email addresses
- Requests for sensitive information

Respond ONLY with valid JSON in this exact format:
{
  "riskScore": <number 0-100>,
  "verdict": "<safe|suspicious|malicious>",
  "flags": ["<flag1>", "<flag2>"],
  "explanation": "<detailed explanation>",
  "recommendedActions": ["<action1>", "<action2>"]
}`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a cybersecurity expert. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.1-70b-versatile",
      temperature: 0.3,
      max_tokens: 2000,
    });

    const responseText = completion.choices[0]?.message?.content || "{}";
    
    // Clean the response (remove markdown code blocks if present)
    const cleanedText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const result = JSON.parse(cleanedText);
    return result;
  } catch (error) {
    console.error('AI Analysis Error:', error);
    throw error;
  }
}

export async function checkVirusTotal(url) {
  if (!process.env.VIRUSTOTAL_API_KEY || process.env.VIRUSTOTAL_API_KEY === 'your-virustotal-key-here') {
    return { enabled: false };
  }

  try {
    const response = await axios.post(
      'https://www.virustotal.com/api/v3/urls',
      `url=${encodeURIComponent(url)}`,
      {
        headers: {
          'x-apikey': process.env.VIRUSTOTAL_API_KEY,
          'content-type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return { enabled: true, data: response.data };
  } catch (error) {
    console.error('VirusTotal Error:', error.message);
    return { enabled: true, error: error.message };
  }
}

export async function checkAbuseIPDB(ip) {
  if (!process.env.ABUSEIPDB_API_KEY || process.env.ABUSEIPDB_API_KEY === 'your-abuseipdb-key-here') {
    return { enabled: false };
  }

  try {
    const response = await axios.get('https://api.abuseipdb.com/api/v2/check', {
      params: { ipAddress: ip, maxAgeInDays: 90 },
      headers: {
        Key: process.env.ABUSEIPDB_API_KEY,
        Accept: 'application/json'
      }
    });
    return { enabled: true, data: response.data };
  } catch (error) {
    console.error('AbuseIPDB Error:', error.message);
    return { enabled: true, error: error.message };
  }
}