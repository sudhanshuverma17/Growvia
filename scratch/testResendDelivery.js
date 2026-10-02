import { Resend } from "resend";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../backend/.env") });

async function testDelivery() {
  const apiKey = process.env.RESEND_API_KEY;
  const resend = new Resend(apiKey);

  console.log("Testing delivery to Resend account owner: careerguidence99@gmail.com");
  const result = await resend.emails.send({
    from: "Honesvia <onboarding@resend.dev>",
    to: "careerguidence99@gmail.com",
    subject: "Honesvia Password Reset Test",
    html: "<p>Your password reset feature is working perfectly!</p>",
  });

  console.log("Result:", result);
}

testDelivery();
