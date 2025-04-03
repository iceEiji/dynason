# dynason

A simple utility to convert between DynamoDB JSON and normal JSON formats.

## Features

- Convert normal JSON to DynamoDB JSON format
- Convert DynamoDB JSON to normal JSON format
- Command-line interface for easy file conversion
- TypeScript support
- Zero dependencies (except for AWS SDK utilities)

## Installation

### As a CLI tool (using Deno)

1. Install [Deno](https://deno.land/)
2. Clone this repository
3. Run the commands directly or create aliases

### As an npm package

```bash
npm install dynason
```

## Usage

### Command Line Interface

Convert DynamoDB JSON to normal JSON:
```bash
deno task from-dynamo input.json [output.json]
```

Convert normal JSON to DynamoDB JSON:
```bash
deno task to-dynamo input.json [output.json]
```

If output file is not specified, it will create a new file with a modified name:
- For `from-dynamo`: `input.from-dynamo.json`
- For `to-dynamo`: `input.to-dynamo.json`

Example:
```bash
# Convert DynamoDB JSON to normal JSON
deno task from-dynamo data.json

# Convert normal JSON to DynamoDB JSON with specific output
deno task to-dynamo input.json output.json
```

### Programmatic Usage (npm)

```typescript
import { fromDynamoJson, toDynamoJson } from "dynason";

// Convert normal JSON to DynamoDB JSON
const normalJson = {
  id: "123",
  name: "test",
  age: 30,
  isActive: true
};

const dynamoJson = toDynamoJson(normalJson);
console.log(dynamoJson);
// Output:
// {
//   id: { S: "123" },
//   name: { S: "test" },
//   age: { N: "30" },
//   isActive: { BOOL: true }
// }

// Convert DynamoDB JSON to normal JSON
const convertedJson = fromDynamoJson(dynamoJson);
console.log(convertedJson);
// Output:
// {
//   id: "123",
//   name: "test",
//   age: 30,
//   isActive: true
// }
```

## Development

This project is built with Deno and compiled to npm package using [dnt](https://github.com/denoland/dnt).

### Prerequisites

- [Deno](https://deno.land/) installed

### Commands

```bash
# Run tests
deno test

# Build npm package
deno task build:npm

# Convert files using CLI
deno task from-dynamo <input-file> [output-file]
deno task to-dynamo <input-file> [output-file]
```

## License

MIT License - see [LICENSE](LICENSE) for details
