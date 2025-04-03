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

async function main() {
  const [operation, inputPath, outputPath] = Deno.args;

  if (!operation || !inputPath) {
    console.error(`
Usage:
  deno run -A cli.ts <operation> <input-file> [output-file]

Operations:
  from-dynamo  Convert DynamoDB JSON to normal JSON
  to-dynamo    Convert normal JSON to DynamoDB JSON

Arguments:
  input-file   Path to the input JSON file
  output-file  (Optional) Path to the output JSON file
               If not specified, will create a new file with modified name
    `);
    Deno.exit(1);
  }

  try {
    const inputJson = await readJsonFile(inputPath);
    const finalOutputPath = outputPath || generateOutputPath(inputPath, operation);

    let result;
    switch (operation) {
      case "from-dynamo":
        result = fromDynamoJson(inputJson);
        break;
      case "to-dynamo":
        result = toDynamoJson(inputJson);
        break;
      default:
        console.error(`Error: Unknown operation '${operation}'`);
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