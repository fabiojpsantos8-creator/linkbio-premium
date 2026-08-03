import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Extrai o subdomínio da URL
  const currentHost = process.env.NODE_ENV === 'production'
    ? hostname.replace(`.seusite.com`, '')
    : hostname.replace(`.localhost:3000`, '');

  if (currentHost && currentHost !== 'www' && currentHost !== hostname) {
    return NextResponse.rewrite(new URL(`/bio/${currentHost}${url.pathname}`, req.url));
  }
}