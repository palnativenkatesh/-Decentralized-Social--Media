let posts = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    const { address, message } = req.body;
    if (!address || !message) return res.status(400).json({ error: 'Missing fields' });

    posts.unshift({
      id: Date.now(),
      address,
      message,
      timestamp: new Date().toISOString(),
    });

    res.status(201).json({ success: true });
  } else {
    res.status(405).end();
  }
}

