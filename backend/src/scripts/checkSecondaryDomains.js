import mongoose from "mongoose";
import dns from "dns";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const courseSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    quizProfile: {
      domain: String,
      secondaryDomain: String,
      traits: mongoose.Schema.Types.Mixed,
      tags: [String],
    },
  },
  { collection: "courses" }
);

const Course = mongoose.model("CourseCheck", courseSchema);

async function check() {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    const slugs = [
      "product-manager",
      "actuary",
      "designer",
      "architect",
      "ed-tech",
      "biotechnologist",
    ];
    const results = await Course.find(
      { id: { $in: slugs } },
      { id: 1, title: 1, "quizProfile.domain": 1, "quizProfile.secondaryDomain": 1 }
    ).lean();

    console.log("\nStored secondaryDomain from Live DB:");
    console.log("--------------------------------------------------------------------------------");
    console.log("| Slug                  | Title                  | Domain      | SecondaryDomain |");
    console.log("--------------------------------------------------------------------------------");
    for (const r of results) {
      const qp = r.quizProfile || {};
      console.log(
        `| ${r.id.padEnd(21)} | ${(r.title || "").padEnd(22)} | ${(qp.domain || "null").padEnd(11)} | ${(qp.secondaryDomain || "null").padEnd(15)} |`
      );
    }
    console.log("--------------------------------------------------------------------------------\n");
  } catch (err) {
    console.error("Error reading live DB:", err);
  } finally {
    await mongoose.disconnect();
  }
}

check();
