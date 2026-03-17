type VerificationRecord = {
  code: string;
  expiresAt: number;
  verified: boolean;
};

export const verificationStore = new Map<string, VerificationRecord>();
