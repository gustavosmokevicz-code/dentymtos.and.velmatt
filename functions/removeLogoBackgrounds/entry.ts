import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import OpenAI from 'npm:openai@6.45.0';

const LOGOS = [
  { key: 'denty', url: 'https://media.base44.com/images/public/6ab9a8c91318a2c8f812767d/b713330e7_6eab74cd-1f25-4408-a50f-be891ea170b5.jpg' },
  { key: 'velmatt', url: 'https://media.base44.com/images/public/6ab9a8c91318a2c8f812767d/5c44ffe5e_0a3a8135-d6d5-4cfe-ae02-dd66e4c84d03.jpg' }
];

async function removeBackground(base44, logoUrl) {
  const imgResp = await fetch(logoUrl);
  const imgBytes = await imgResp.arrayBuffer();
  const file = new File([imgBytes], 'logo.png', { type: 'image/png' });
  const { baseURL, token, headers } = base44.asServiceRole.aiGateway.connection();
  const client = new OpenAI({ baseURL, apiKey: token, defaultHeaders: headers, maxRetries: 0 });
  const result = await client.images.edit({
    model: 'gpt_image_2',
    image: file,
    prompt: 'Remove ONLY the flat white/light-grey background surrounding the circular emblem, making that exterior area fully transparent. Keep the circular polished gold rim, the matte black interior disc, every gold metallic letter, the white "MOTOS" and "VELMATT" lettering, the emblem icon, and all 3D bevels, highlights, shadows and reflections exactly as in the original. Transparent PNG of the badge only.',
    background: 'transparent',
    output_format: 'png',
    response_format: 'url'
  });
  return result.data[0].url;
}

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const out = {};
    for (const logo of LOGOS) {
      out[logo.key] = await removeBackground(base44, logo.url);
    }
    return Response.json(out);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
