import crypto from 'crypto';
import { customAlphabet } from 'nanoid';
import { Resend } from 'resend';

function getHash(input: string): string {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
}

const BASE58_ALPHABET =
  '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const nanoid = customAlphabet(BASE58_ALPHABET);

export async function generateCodeAndHash(): Promise<{
  code: string;
  hash: string;
}> {
  const code = nanoid(10);
  const hash = getHash(code);
  return { code, hash };
}

const resend = new Resend(process.env.RESEND_API_KEY);
export const sendInvite = async (input: {
  invitationId: string;
  invitedUserEmail: string;
  inviteCode: string;
}) => {
  const { invitationId, invitedUserEmail, inviteCode } = input;
  return await resend.emails.send({
    from: "Let's Go Play Tennis <noreply@invites.letsgoplaytennis.app>",
    to: [invitedUserEmail],
    subject: 'SF tennis: new invitation',
    html: `View the confirmation and confirm here: https://letsgoplaytennis.app/confirmInvite/${invitationId}#${inviteCode}`,
  });
};
