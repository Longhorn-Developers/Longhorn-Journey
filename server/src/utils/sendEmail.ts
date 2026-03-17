export async function sendVerificationEmail(email: string, code: string) {
  console.log(`Verification code for ${email}: ${code}`);

  // Later replace this with Resend, SendGrid, AWS SES, etc.
  return true;
}
