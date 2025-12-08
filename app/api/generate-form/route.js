import { generateFormFields } from '@/configs/AIModal';
import { db } from '@/configs/db';
import { JsonForms } from '@/configs/schema';
import moment from 'moment';

export async function POST(request) {
  try {
    const { prompt, userId, userEmail } = await request.json();

    if (!prompt) {
      return Response.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    try {
      // Generate form using AI
      const formData = await generateFormFields(prompt);
      console.log('Generated form JSON:', formData);

      // Save to database
      const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
      const createdBy = userEmail || userId || 'unknown';

      const result = await db.insert(JsonForms).values({
        jsonorm: JSON.stringify(formData),
        createdBy: createdBy,
        createdAt: createdAt
      }).returning({ id: JsonForms.id });

      const insertedId = result[0].id;
      console.log('Form saved to database with ID:', insertedId);

      return Response.json({ 
        formData, 
        insertedId,
        message: 'Form generated and saved successfully'
      });
    } catch (aiError) {
      console.error('AI Generation failed:', aiError);
      return Response.json(
        { error: 'Failed to generate form: ' + aiError.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API error:', error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
