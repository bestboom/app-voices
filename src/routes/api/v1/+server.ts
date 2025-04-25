import { json } from '@sveltejs/kit';

export function GET() {
  return json({
    message: "Kokoro TTS API",
    endpoints: [
      "/audio/speech",
      "/audio/voices",
      "/audio/models"
    ]
  });
}