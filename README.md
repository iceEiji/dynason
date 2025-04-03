# dynason

A command-line utility to convert between DynamoDB JSON and normal JSON formats.

## Features

- Convert DynamoDB JSON to normal JSON format
- Convert normal JSON to DynamoDB JSON format
- Simple command-line interface
- Available as both Deno module and npm package
- Automatic output file naming

## Installation

### Using npm (Recommended)

```bash
npm install -g dynason
```

### Using Deno

1. Clone this repository:
```bash
git clone https://github.com/iceEiji/dynason.git
cd dynason
```

## Usage

### As a global command (npm)

Convert DynamoDB JSON to normal JSON:
```bash
dynason from-dynamo input.json [output.json]
```

Convert normal JSON to DynamoDB JSON:
```bash
dynason to-dynamo input.json [output.json]
```

### Using Deno

```bash
deno task dynason from-dynamo input.json [output.json]
deno task dynason to-dynamo input.json [output.json]
```

If output file is not specified, it will create a new file with a modified name:
- For `from-dynamo`: `input.from-dynamo.json`
- For `to-dynamo`: `input.to-dynamo.json`

### Examples

Convert DynamoDB JSON to normal JSON:
```bash
dynason from-dynamo data.json
# Creates data.from-dynamo.json

# With specific output file
dynason from-dynamo data.json normal.json
```

Convert normal JSON to DynamoDB JSON:
```bash
dynason to-dynamo input.json
# Creates input.to-dynamo.json

# With specific output file
dynason to-dynamo input.json dynamo.json
```

## Development

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
