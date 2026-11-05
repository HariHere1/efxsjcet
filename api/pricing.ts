// Server-side pricing. The old create-order.ts trusted `amount` straight
// from the request body — a client could send any number and pay whatever
// they liked. This recomputes the charge from the same accommodation data
// the frontend uses, so the backend is the source of truth for price.

import { accommodationOptions } from '../data/AccomodationPage';

const MIN_PARTICIPANTS = 1;
const MAX_PARTICIPANTS = 4; // matches BookingPage.tsx's updateParticipantCount clamp
export function priceAsNumber(label: string): number {
  return Number(label.replace(/[^0-9]/g, '')) || 0;
}

/** Throws on any invalid input — callers should catch and return 400. */
export function computeAmount(
  accommodationOptionId: unknown,
  participantCount: unknown,
  gender?: unknown,
): number {
  if (typeof accommodationOptionId !== 'string') {
    throw new Error('accommodationOptionId is required');
  }

  const option = accommodationOptions.find((candidate) => candidate.id === accommodationOptionId);
  if (!option) {
    throw new Error(`Unknown accommodation option: ${accommodationOptionId}`);
  }

  if (gender !== undefined && gender !== 'male' && gender !== 'female') {
    throw new Error('gender must be male or female');
  }

  const count = Number(participantCount);
  if (!Number.isInteger(count) || count < MIN_PARTICIPANTS || count > MAX_PARTICIPANTS) {
    throw new Error(`participantCount must be an integer between ${MIN_PARTICIPANTS} and ${MAX_PARTICIPANTS}`);
  }

  const availableSpots = gender === 'male'
    ? option.maleSpotsRemaining ?? option.spotsRemaining
    : gender === 'female'
      ? option.femaleSpotsRemaining ?? option.spotsRemaining
      : option.spotsRemaining;

  if (availableSpots <= 0) {
    throw new Error('This accommodation option is sold out');
  }

  return priceAsNumber(option.priceLabel) * count;
}
