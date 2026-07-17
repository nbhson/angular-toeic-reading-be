/**
 * Service that calls the OmniRoute API (OpenAI-compatible chat completions).
 * This logic was moved from the Angular UI's OmnirouteService.
 */

const OMNIROUTE_MODEL = process.env.OMNIROUTE_MODEL || 'oc/deepseek-v4-flash-free';
const OMNIROUTE_API_BASE_URL = process.env.OMNIROUTE_API_BASE_URL || 'http://localhost:20128/v1';

/**
 * Calls the OmniRoute chat completions API with the given prompt and API key.
 * @param {string} prompt - The user prompt to send.
 * @param {string} apiKey - The OmniRoute API key.
 * @returns {Promise<object>} - The parsed JSON response from the AI.
 */
async function generateContent(prompt, apiKey) {
  const url = `${OMNIROUTE_API_BASE_URL}/chat/completions`;

  const messages = [
    {
      role: 'system',
      content:
        'You are an expert TOEIC test creator. Always respond with valid JSON only, no markdown, no code blocks, no extra text.',
    },
    {
      role: 'user',
      content: prompt,
    },
  ];

  const requestBody = {
    model: OMNIROUTE_MODEL,
    messages,
    temperature: 0.7,
    stream: false,
    response_format: { type: 'json_object' },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`OmniRoute API error (${response.status}): ${errorText}`);
  }

  const rawText = await response.text();

  // Check if response is SSE (Server-Sent Events) format: starts with "data: "
  if (rawText.startsWith('data: ')) {
    // Parse SSE stream: concatenate all content deltas
    const lines = rawText.split('\n').filter(line => line.startsWith('data: '));
    let fullContent = '';

    for (const line of lines) {
      const jsonStr = line.slice(6); // Remove "data: " prefix
      if (jsonStr === '[DONE]') continue;
      try {
        const chunk = JSON.parse(jsonStr);
        const delta = chunk.choices?.[0]?.delta?.content;
        if (delta) fullContent += delta;
      } catch {
        // Skip malformed chunks
      }
    }

    if (!fullContent) {
      throw new Error('Không nhận được nội dung trả về từ OmniRoute API (SSE stream).');
    }

    return JSON.parse(fullContent);
  }

  // Standard JSON response
  const responseData = JSON.parse(rawText);
  const textResult = responseData.choices?.[0]?.message?.content;

  if (!textResult) {
    throw new Error('Không nhận được nội dung trả về từ OmniRoute API.');
  }

  return JSON.parse(textResult);
}

/**
 * Generates TOEIC Part 5 questions.
 * @param {number} count
 * @param {string} apiKey
 * @returns {Promise<Array>}
 */
export async function generateToeicQuestions(count, apiKey) {
  const { buildPart5Prompt } = await import('../prompts/toeic.prompts.js');
  const prompt = buildPart5Prompt(count);
  const result = await generateContent(prompt, apiKey);
  return result.questions;
}

/**
 * Generates TOEIC Part 6 passages.
 * @param {number} count
 * @param {string} apiKey
 * @returns {Promise<Array>}
 */
export async function generateToeicPart6Passages(count, apiKey) {
  const { buildPart6Prompt } = await import('../prompts/toeic.prompts.js');
  const prompt = buildPart6Prompt(count);
  const result = await generateContent(prompt, apiKey);
  return result.passages;
}

/**
 * Generates TOEIC Part 7 passages.
 * @param {string} passageType - 'Single' | 'Double' | 'Triple'
 * @param {number} count
 * @param {number} startQuestionNumber
 * @param {string} apiKey
 * @returns {Promise<Array>}
 */
export async function generateToeicPart7Passages(passageType, count, startQuestionNumber, apiKey) {
  const { buildPart7Prompt } = await import('../prompts/toeic.prompts.js');
  const prompt = buildPart7Prompt(passageType, count, startQuestionNumber);
  const result = await generateContent(prompt, apiKey);
  return result.passages;
}