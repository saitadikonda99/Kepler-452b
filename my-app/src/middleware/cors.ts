// middleware/cors.ts
import { NextApiRequest, NextApiResponse } from 'next';
import allowedOrigins from '../config/allowedOrigins';

const cors = (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  // Handle preflight request for OPTIONS method
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
};

export default cors;
