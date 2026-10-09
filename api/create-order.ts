// ⚠️ PLACEHOLDER PERSISTENCE — replace before going live.
//
// Vercel serverless functions are stateless per invocation: this in-memory
// Map is NOT guaranteed to survive between create-order.ts, verify-payment.ts,
// and razorpay-webhook.ts, which typically run as separate invocations (and
// definitely won't survive a redeploy or scale-to-multiple-instances). It
// exists so the three payment endpoints below have a concrete, working
// interface to call — swap this file's implementation for a real database
// (Supabase/Postgres/etc.) and nothing else in api/ needs to change.

export type BookingStatus = 'pending' | 'paid' | 'failed';

export interface BookingRecord {
  bookingId: string;
  orderId: string;
  accommodationOptionId: string;
  participantCount: number;
  amount: number; // rupees
  status: BookingStatus;
  paymentId?: string;
}

const bookingsByOrderId = new Map<string, BookingRecord>();

export async function createPendingBooking(record: BookingRecord): Promise<void> {
  bookingsByOrderId.set(record.orderId, record);
}

export async function getBookingByOrderId(orderId: string): Promise<BookingRecord | undefined> {
  return bookingsByOrderId.get(orderId);
}

export async function markBookingPaid(orderId: string, paymentId: string): Promise<BookingRecord | undefined> {
  const record = bookingsByOrderId.get(orderId);
  if (!record) return undefined;
  record.status = 'paid';
  record.paymentId = paymentId;
  bookingsByOrderId.set(orderId, record);
  return record;
}

export async function markBookingFailed(orderId: string): Promise<BookingRecord | undefined> {
  const record = bookingsByOrderId.get(orderId);
  if (!record) return undefined;
  record.status = 'failed';
  bookingsByOrderId.set(orderId, record);
  return record;
}