import { NextRequest, NextResponse } from 'next/server';

export const runMiddleware = (req: NextRequest, res: NextResponse, fn: Function) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export const config = {
    matcher: ['/api/:path*'], 
  };