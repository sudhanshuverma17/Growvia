import fs from "fs";
import readline from "readline";

const rl = readline.createInterface({
  input: fs.createReadStream("C:\\Users\\sudhanshu verma\\.gemini\\antigravity-ide\\brain\\922e9950-1bf7-4285-a8ee-23fec420f702\\.system_generated\\logs\\transcript_full.jsonl")
});

rl.on("line", line => {
  try {
    const obj = JSON.parse(line);
    if (obj.step_index === 2285) {
      console.log(obj.tool_calls[0].args.CommandLine);
    }
  } catch (e) {}
});
