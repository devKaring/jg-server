import jwt, { Secret, SignOptions } from 'jsonwebtoken';


const options: SignOptions = {
  expiresIn: '1h',
};

type JwtPayload = {
  userId: number;
  email: string;
  role: string;
};

export function generateAccessToken(payload: JwtPayload): string {
    const secret: Secret = process.env.JWT_SECRET as string;
  if (!secret) {
    throw new Error('JWT_SECRET is not set');
  }

    return jwt.sign(payload, secret, options);
}

export function verifyAccessToken(token: string): JwtPayload {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set');
  }

  return jwt.verify(token, secret) as JwtPayload;
}