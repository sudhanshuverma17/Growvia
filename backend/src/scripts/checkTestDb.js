import mongoose from "mongoose";
import dotenv from "dotenv";
import { Course } from "../models/Course.js";
dotenv.config();

async function main() {
  const baseUri = process.env.MONGO_TEST_URI || process.env.MONGO_URI;
  const u = new URL(baseUri);
  u.pathname = "/growvia_test";
  await mongoose.connect(u.toString());

  const count = await Course.countDocuments();
  console.log("growvia_test Course count:", count);
  const sample = await Course.findOne().lean();
  console.log("sample course id:", sample?.id);
  const engineer = await Course.findOne({ id: "engineer" }).lean();
  console.log("engineer in growvia_test:", engineer ? { id: engineer.id, isPublished: engineer.isPublished } : null);

  await mongoose.disconnect();
}

main().catch(console.error);
