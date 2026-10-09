import crypto from 'crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getBookingByOrderId, markBookingPaid } from './lib/bookingsStore';

// Called from the frontend's Razorpay Checkout `handler` callback, with the
// three fields Checkout hands back after a successful payment. This is the
// step BookingPage.tsx was skipping entirely — its "Proceed to Payment"
// button only ever showed a static message and never opened Checkout or
// confirmed anything server-side. A booking must not be treated as paid
// until *this* endpoint says so — the client-side success callback alone
// can be faked from devtools.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body ?? {};

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: 'Missing payment verification fields' });
  }

  const secret = process.env.RAZORPAY_KEY_SECRET!;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (!signaturesMatch(expected, razorpay_signature)) {
    console.warn('Razorpay signature mismatch for order', razorpay_order_id);
    return res.status(400).json({ verified: false, error: 'Invalid payment signature' });
  }

  const booking = await getBookingByOrderId(razorpay_order_id);
  if (!booking) {
    // Signature was valid but we have no record of creating this order —
    // shouldn't happen if create-order.ts is always the entry point, but
    // don't confirm a booking we can't identify.
    console.error('No booking found for verified order', razorpay_order_id);
    return res.status(404).json({ verified: false, error: 'Booking not found for this order' });
  }

  await markBookingPaid(razorpay_order_id, razorpay_payment_id);

  return res.status(200).json({ verified: true, bookingId: booking.bookingId });
}

function signaturesMatch(expectedHex: string, providedHex: string): boolean {
  try {
    const expectedBuf = Buffer.from(expectedHex, 'hex');
    const providedBuf = Buffer.from(providedHex, 'hex');
    return expectedBuf.length === providedBuf.length && crypto.timingSafeEqual(expectedBuf, providedBuf);
  } catch {
    // Malformed hex in the provided signature — treat as a mismatch, not a crash.
    return false;
  }
}
