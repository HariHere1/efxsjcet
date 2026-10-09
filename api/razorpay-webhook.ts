import crypto from 'crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { markBookingFailed, markBookingPaid } from './lib/bookingsStore';

// Recommended alongside verify-payment.ts, not instead of it: verify-payment
// confirms a booking the instant the participant's browser reports success;
// this webhook is the fallback that still marks the booking paid/failed even
// if they close the tab, lose connection, or the browser call never fires.
// Configure this URL + a webhook secret in the Razorpay dashboard
// (Settings → Webhooks), separate from RAZORPAY_KEY_SECRET.
export const config = {
  api: { bodyParser: false }, // signature must be computed over the raw body
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rawBody = await readRawBody(req);
  const signature = req.headers['x-razorpay-signature'];
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;

  if (typeof signature !== 'string') {
    return res.status(400).json({ error: 'Missing signature header' });
  }

  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  if (!signaturesMatch(expected, signature)) {
    console.warn('Razorpay webhook signature mismatch');
    return res.status(400).json({ error: 'Invalid signature' });
  }

  let event: any;
  try {
    event = JSON.parse(rawBody.toString('utf8'));
  } catch {
    return res.status(400).json({ error: 'Malformed payload' });
  }

  switch (event.event) {
    case 'payment.captured': {
      const payment = event.payload?.payment?.entity;
      if (payment?.order_id && payment?.id) {
        // Idempotent by design: markBookingPaid just (re)sets status+paymentId,
        // safe if Razorpay retries this same webhook delivery.
        await markBookingPaid(payment.order_id, payment.id);
      }
      break;
    }
    case 'payment.failed': {
      const payment = event.payload?.payment?.entity;
      if (payment?.order_id) {
        await markBookingFailed(payment.order_id);
      }
      break;
    }
    default:
      // Any other event type: acknowledge and ignore.
      break;
  }

  // Respond quickly with 2xx so Razorpay doesn't keep retrying.
  return res.status(200).json({ received: true });
}

function readRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function signaturesMatch(expectedHex: string, providedHex: string): boolean {
  try {
    const expectedBuf = Buffer.from(expectedHex, 'hex');
    const providedBuf = Buffer.from(providedHex, 'hex');
    return expectedBuf.length === providedBuf.length && crypto.timingSafeEqual(expectedBuf, providedBuf);
  } catch {
    return false;
  }
}
