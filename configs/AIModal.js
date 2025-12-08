import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Generate form fields from a description using Groq AI
 * @param {string} description - What the form should do
 * @returns {Promise<Array>} Array of form field objects
 */
export async function generateFormFields(description) {
  try {
    const prompt = `Generate a JSON object for a form based on this description: "${description}"

Return ONLY a valid JSON object with this exact structure - NO markdown, NO extra text, NO code blocks:
{
  "formTitle": "Form title here",
  "formSubheading": "Brief description of the form",
  "formFields": [
    {
      "fieldName": "field_id",
      "fieldType": "text",
      "fieldLabel": "Display Label",
      "fieldPlaceholder": "Placeholder text",
      "required": true
    }
  ]
}`;

    const message = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
      max_tokens: 1024,
    });

    let jsonText = message.choices[0].message.content.trim();
    console.log('Raw AI response:', jsonText);
    
    // Remove markdown code blocks
    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Extract JSON object if wrapped in text
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonText = jsonMatch[0];
    }
    
    console.log('Cleaned JSON text:', jsonText);
    
    // Validate and parse
    if (!jsonText.startsWith('{')) {
      throw new Error('Response does not contain valid JSON object');
    }
    
    const formData = JSON.parse(jsonText);
    
    // Validate required fields
    if (!formData.formTitle || !formData.formSubheading || !Array.isArray(formData.formFields)) {
      throw new Error('Invalid form structure: missing required fields');
    }
    
    console.log('Parsed form data:', formData);
    return formData;
  } catch (error) {
    console.error("AI generation error:", error);
    throw error;
  }
}

/**
 * Generate a form description from a topic
 * @param {string} topic - Topic for the form
 * @returns {Promise<string>} Generated description
 */
export async function generateFormDescription(topic) {
  try {
    const message = await groq.chat.completions.create({
      model: "mixtral-8x7b-32768",
      messages: [
        {
          role: "user",
          content: `Write a brief, professional description for a form about: ${topic}. Keep it under 20 words.`,
        },
      ],
      temperature: 0.5,
      max_tokens: 256,
    });

    return message.choices[0].message.content.trim();
  } catch (error) {
    console.error("AI description error:", error);
    throw error;
  }
}