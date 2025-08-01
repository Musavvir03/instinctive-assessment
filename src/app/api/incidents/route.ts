import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const resolved = searchParams.get('resolved');
  let where = {};
  if (resolved !== null) {
    where = { resolved: resolved === 'true' };
  }
  const incidents = await prisma.incident.findMany({
    where,
    orderBy: { tsStart: 'desc' },
    include: { camera: true },
  });
  return NextResponse.json(incidents);
} 