import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'unknown',
    port: process.env.PORT || '3000',
    hostname: process.env.HOSTNAME || '0.0.0.0'
  });
}

export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}