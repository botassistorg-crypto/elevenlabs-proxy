export default async function handler(req, res) {
  
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { text } = req.body;
  
  try {
    const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/2EiwWnXFnvU5JabPnv8n', {
      method: 'POST',
      headers: {
        'xi-api-key': '3de3eb447cb27d27d159c8a2fde9c7d6a2a55b016c12a15da8d02b3ddfa87d7f',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    });
    
    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error: error });
    }
    
    const audioBuffer = await response.arrayBuffer();
    
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(Buffer.from(audioBuffer));
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
