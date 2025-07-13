// src/auth/dto/jwt-payload.dto.ts
export interface JwtPayload {
  sub: string; // ou id: string
  email: string;
  roles?: string[];
  [key: string]: unknown;
}
