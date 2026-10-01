import fs from "fs";
import readline from "readline";

const rl = readline.createInterface({
  input: fs.createReadStream("C:\\Users\\sudhanshu verma\\.gemini\\antigravity-ide\\brain\\922e9950-1bf7-4285-a8ee-23fec420f702\\.system_generated\\logs\\transcript.jsonl")
});

rl.on("line", line => {
  try {
    const obj = JSON.parse(line);
    if (obj.step_index >= 2280 && obj.step_index <= 2288) {
      console.log(`Step ${obj.step_index} (${obj.type}):`);
      if (obj.tool_calls) console.log("  Tool calls:", JSON.stringify(obj.tool_calls));
      if (obj.content) console.log("  Content:", obj.content.slice(0, 200));
    }
  } catch (e) {}
});
