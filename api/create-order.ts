import Razorpay from 'razorpay';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method != 'POST' ) {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { amount, bookingId } = req.body;
        
        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100),
            currency: 'INR',
            receipt: bookingId,
        });
        // TODO: update your bookings table here — set order_id = order.id, status = 'pending'
  return res.status(200).json({ orderId: order.id, amount: order.amount });
} catch (err) {
    console.error('Razorpay order creation failed:', err);
    return res.status(500).json({ error: 'Could not create order'});
}
}