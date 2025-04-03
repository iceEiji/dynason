#!/usr/bin/env node
import { fromDynamoJson, toDynamoJson } from "./src/convert.ts";

// Normal JSON types
type JsonPrimitive = string | number | boolean | null;
type JsonArray = JsonValue[];
type JsonObject = { [key: string]: JsonValue };
type JsonValue = JsonPrimitive | JsonObject | JsonArray;

// DynamoDB specific types
type DynamoDBValue = {
  S?: string;
  N?: string;
  BOOL?: boolean;
  NULL?: boolean;
  L?: DynamoDBValue[];
  M?: { [key: string]: DynamoDBValue };
};

type DynamoDBJson = { [key: string]: DynamoDBValue };
type NormalJson = JsonObject;

async function readJsonFile(path: string): Promise<JsonObject> {
  const text = await Deno.readTextFile(path);
  const json = JSON.parse(text);
  if (!json || typeof json !== "object" || Array.isArray(json)) {
    throw new Error("Invalid JSON format: must be an object");
  }
  return json as JsonObject;
}

async function writeJsonFile(path: string, data: JsonObject): Promise<void> {
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

    let result: JsonObject;
    switch (normalizedOperation) {
      case "from-dynamo":
        result = fromDynamoJson(inputJson as DynamoDBJson);
        break;
      case "to-dynamo":
        result = toDynamoJson(inputJson as NormalJson);
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