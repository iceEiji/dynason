#!/usr/bin/env node
import { fromDynamoJson, toDynamoJson } from "./src/convert.ts";

async function readJsonFile(path: string): Promise<any> {
  const text = await Deno.readTextFile(path);
  return JSON.parse(text);
}

async function writeJsonFile(path: string, data: any): Promise<void> {
  await Deno.writeTextFile(path, JSON.stringify(data, null, 2));
}

function generateOutputPath(inputPath: string, operation: string): string {
  const extension = inputPath.endsWith(".json") ? ".json" : "";
  const baseName = inputPath.substring(0, inputPath.length - extension.length);
  return `${baseName}.${operation}${extension}`;
}

function showHelp() {
  console.log(`
dynason - Convert between DynamoDB JSON and normal JSON formats

Usage:
  dynason <operation> <input-file> [output-file]

Operations:
  from-dynamo, f  Convert DynamoDB JSON to normal JSON
  to-dynamo, t    Convert normal JSON to DynamoDB JSON

Arguments:
  input-file      Path to the input JSON file
  output-file     (Optional) Path to the output JSON file
                  If not specified, will create a new file with modified name

Options:
  -h, --help      Show this help message

Examples:
  dynason f data.json              # Convert DynamoDB JSON to normal JSON
  dynason t input.json output.json # Convert normal JSON to DynamoDB JSON
`);
}

async function main() {
  const args = Deno.args;
  
  if (args.length === 0 || args[0] === "-h" || args[0] === "--help") {
    showHelp();
    Deno.exit(args.length === 0 ? 1 : 0);
  }

  const [operation, inputPath, outputPath] = args;

  if (!inputPath) {
    showHelp();
    Deno.exit(1);
  }

  try {
    const inputJson = await readJsonFile(inputPath);
    const normalizedOperation = operation === "f" ? "from-dynamo" : operation === "t" ? "to-dynamo" : operation;
    const finalOutputPath = outputPath || generateOutputPath(inputPath, normalizedOperation);

    let result;
    switch (normalizedOperation) {
      case "from-dynamo":
        result = fromDynamoJson(inputJson);
        break;
      case "to-dynamo":
        result = toDynamoJson(inputJson);
        break;
      default:
        console.error(`Error: Unknown operation '${operation}'`);
        showHelp();
        Deno.exit(1);
    }

    await writeJsonFile(finalOutputPath, result);
    console.log(`Successfully converted ${inputPath} to ${finalOutputPath}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
    Deno.exit(1);
  }
}

if (import.meta.main) {
  main();
}