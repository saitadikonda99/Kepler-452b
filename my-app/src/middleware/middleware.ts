import { NextRequest, NextResponse } from 'next/server';
import credentials from './credentials';
import cors from './cors';
import { runMiddleware } from './runMiddleware';

export const withMiddleware = (handler: Function) => {
  return async (req: NextRequest, res: NextResponse) => {
    await runMiddleware(req, res, credentials);
    await runMiddleware(req, res, cors);

    return handler(req, res); 
  };
};
