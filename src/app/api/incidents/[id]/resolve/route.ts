import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  // Extract the id from the URL
  const url = new URL(request.url);
  // The path is like /api/incidents/123/resolve, so get the second-to-last segment
  const segments = url.pathname.split('/');
  const id = Number(segments[segments.length - 2]);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }
  const incident = await prisma.incident.findUnique({ where: { id } });
  if (!incident) {
    return NextResponse.json({ error: 'Incident not found' }, { status: 404 });
  }
  const updated = await prisma.incident.update({
    where: { id },
    data: { resolved: !incident.resolved },
  });
  return NextResponse.json(updated);
} 