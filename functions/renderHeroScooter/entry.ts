import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import OpenAI from 'npm:openai@6.45.0';

// Scooter original (perfil em fundo branco) fornecida pelo usuário.
const SOURCE_SCOOTER =
  'https://media.base44.com/images/public/6ab9a8c91318a2c8f812767d/e4d737f2e_e2d8962b-40a6-4a9d-aa86-4cfe7175679c.jpg';

const PROMPT =
  'A premium cinematic luxury automotive advertising photograph of this exact electric scooter ' +
  '(same body shape, black glossy frame, tall upright handlebars with mirrors, round headlight, ' +
  'silver disc-brake hubs, brown leather seat). The scooter is the clear hero, positioned large in ' +
  'the foreground, side profile facing right, in sharp focus and lit as the main subject. ' +
  'Remove all factory protective plastic film, stickers and labels — present clean, finished, ' +
  'polished production surfaces. Place it in a sophisticated dark studio: deep charcoal-to-black ' +
  'gradient background with subtle atmospheric haze, a reflective glossy dark floor catching a soft ' +
  'reflection, refined rim lighting tracing the scooter edges, a faint warm accent glow. Editorial, ' +
  'minimal, high-end, lots of negative space, cinematic depth, 16:9 composition.';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin')
      return Response.json({ error: 'Forbidden' }, { status: 403 });

    const { baseURL, token, headers } = base44.asServiceRole.aiGateway.connection();
    const client = new OpenAI({
      baseURL,
      apiKey: token,
      defaultHeaders: headers,
      maxRetries: 0
    });

    const result = await client.images.generate({
      model: 'gpt_image_2',
      prompt: PROMPT,
      n: 1,
      response_format: 'url',
      aspect_ratio: '16:9',
      resolution: '2K',
      quality: 'high',
      reference_image_urls: [SOURCE_SCOOTER]
    });

    const url = result.data?.[0]?.url;
    if (!url) return Response.json({ error: 'No image returned' }, { status: 502 });

    return Response.json({ url });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
