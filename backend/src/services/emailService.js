import { Resend } from "resend";

let resendClient = null;

const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return null;
  }
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
};

/**
 * Sends a password reset email using Resend.
 * Wraps all execution in try/catch to ensure errors are logged server-side and never leaked.
 *
 * @param {Object} params
 * @param {string} params.to - Recipient email address
 * @param {string} params.resetUrl - Full password reset URL including the raw token
 * @param {string} [params.userName="Student"] - Recipient's display name
 * @returns {Promise<{ success: boolean, simulated?: boolean, id?: string, error?: string }>}
 */
export const sendPasswordResetEmail = async ({
  to,
  resetUrl,
  userName = "Student",
}) => {
  const from =
    process.env.EMAIL_FROM?.trim() || "Honesvia <onboarding@resend.dev>";
  const client = getResendClient();

  const subject = "Reset your Honesvia password";

  const textContent = `Hello ${userName},

We received a request to reset the password for your Honesvia account.

To choose a new password, click or paste the following link into your browser:
${resetUrl}

This link is valid for 1 hour and can only be used once.

If you didn't request a password reset, you can safely ignore this email — your password will remain unchanged.

Best regards,
The Honesvia Team
https://honesvia.com`;

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Honesvia Password</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f17; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0b0f17; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 560px; background-color: #121824; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);">
          <!-- Header -->
          <tr>
            <td style="padding: 36px 36px 24px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.06); background: linear-gradient(180deg, rgba(229, 168, 105, 0.08) 0%, transparent 100%);">
              <div style="display: inline-block; width: 44px; height: 44px; line-height: 44px; border-radius: 12px; background: linear-gradient(135deg, #E5A869 0%, #C87D3B 100%); color: #0b0f17; font-weight: 800; font-size: 22px; margin-bottom: 12px;">H</div>
              <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">Honesvia</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 36px;">
              <h2 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #ffffff;">Password Reset Request</h2>
              <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.6; color: #94a3b8;">
                Hello <strong style="color: #f1f5f9;">${userName}</strong>,
              </p>
              <p style="margin: 0 0 28px; font-size: 14px; line-height: 1.6; color: #94a3b8;">
                We received a request to reset the password for your Honesvia account. Click the button below to choose a new password:
              </p>
              <!-- Button -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding: 8px 0 32px;">
                    <a href="${resetUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #E5A869 0%, #C87D3B 100%); color: #0b0f17; font-size: 14px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 10px; box-shadow: 0 4px 14px rgba(229, 168, 105, 0.35);">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 12px; font-size: 13px; line-height: 1.6; color: #94a3b8;">
                If the button above does not work, copy and paste this link into your web browser:
              </p>
              <p style="margin: 0 0 28px; font-size: 12px; line-height: 1.5; word-break: break-all;">
                <a href="${resetUrl}" style="color: #E5A869; text-decoration: underline;">${resetUrl}</a>
              </p>
              <div style="padding: 16px; background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 8px;">
                <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #64748b;">
                  🔒 <strong>Security Notice:</strong> This link expires in <strong>1 hour</strong> and can only be used once. If you did not request this password reset, no action is needed — your account remains completely secure.
                </p>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 36px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.06); background-color: #0d121c;">
              <p style="margin: 0 0 6px; font-size: 12px; color: #64748b;">
                © ${new Date().getFullYear()} Honesvia · India's Premier Career Guidance Platform
              </p>
              <p style="margin: 0; font-size: 11px; color: #475569;">
                Need help? Contact support at <a href="mailto:support@honesvia.in" style="color: #94a3b8; text-decoration: none;">support@honesvia.in</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  if (!client) {
    console.warn(
      "\n⚠️  [Resend Email]: RESEND_API_KEY is not set in backend/.env."
    );
    console.warn(
      `   [Local Dev Link]: Simulated email to ${to} with reset URL:\n   👉 ${resetUrl}\n`
    );
    return { success: false, simulated: true };
  }

  try {
    const result = await client.emails.send({
      from,
      to,
      subject,
      html: htmlContent,
      text: textContent,
    });

    if (result.error) {
      console.error(
        `❌ [Resend Email Error]: Failed to send to ${to}:`,
        result.error.message
      );
      if (
        result.error.statusCode === 403 &&
        result.error.message?.includes("You can only send testing emails")
      ) {
        console.warn(
          `\n⚠️  [Resend Sandbox Limitation]:` +
            `\n   Resend's test sender ("onboarding@resend.dev") ONLY allows delivering to your Resend account owner email.` +
            `\n   To deliver to "${to}" and any other recipient, verify your domain at https://resend.com/domains` +
            `\n   and update EMAIL_FROM="Honesvia <support@honesvia.com>".` +
            `\n\n   👉 [Direct Reset Link for Testing]:\n   ${resetUrl}\n`
        );
      }
      return { success: false, error: result.error.message };
    }

    console.log(
      `✉️  [Resend Email]: Password reset email dispatched to ${to} (id: ${
        result.data?.id || "sent"
      })`
    );
    return { success: true, id: result.data?.id };
  } catch (err) {
    console.error(
      `❌ [Resend Email Error]: Exception sending password reset email to ${to}:`,
      err.message || err
    );
    // Return false without throwing so error is never leaked to the client
    return { success: false, error: err.message };
  }
};

export default { sendPasswordResetEmail };
