import { verifySignature } from '../../utils/verifySignature';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { address, signature, message } = req.body;

  const isValid = await verifySignature(address, signature, message);
  if (!isValid) return res.status(401).json({ error: 'Invalid signature' });

  res.status(200).json({ success: true });
}

