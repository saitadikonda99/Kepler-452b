import { NextApiRequest, NextApiResponse } from 'next';
import allowedOrigins from '../config/allowedOrigins';

const credentials = (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  next();
};

export default credentials;
