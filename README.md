# dynason

A simple utility to convert between DynamoDB JSON and normal JSON formats.

## Features

- Convert normal JSON to DynamoDB JSON format
- Convert DynamoDB JSON to normal JSON format
- TypeScript support
- Zero dependencies (except for AWS SDK utilities)

## Installation

```bash
npm install dynason
```

## Usage

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
```

## License

MIT License - see [LICENSE](LICENSE) for details
