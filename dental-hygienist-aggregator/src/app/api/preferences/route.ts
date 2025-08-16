import { NextResponse } from 'next/server';
import { dentistPreferences } from '@/app/lib/mock-data';

export async function GET() {
  return NextResponse.json(dentistPreferences);
}
