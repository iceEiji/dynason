# dynason

A command-line utility to convert between DynamoDB JSON and normal JSON formats.

## Features

- Convert DynamoDB JSON to normal JSON format
- Convert normal JSON to DynamoDB JSON format
- Simple command-line interface
- Automatic output file naming
- Built with Deno and TypeScript

## Prerequisites

- [Deno](https://deno.land/) installed

## Installation

1. Clone this repository:
```bash
git clone https://github.com/iceEiji/dynason.git
cd dynason
```

2. (Optional) Create aliases for easier use:
```bash
# Add these to your shell configuration file (.zshrc, .bashrc, etc.)
alias from-dynamo="deno task from-dynamo"
alias to-dynamo="deno task to-dynamo"
```

## Usage

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

### Examples

Convert DynamoDB JSON to normal JSON:
```bash
deno task from-dynamo data.json
# Creates data.from-dynamo.json

# With specific output file
deno task from-dynamo data.json normal.json
```

Convert normal JSON to DynamoDB JSON:
```bash
deno task to-dynamo input.json
# Creates input.to-dynamo.json

# With specific output file
deno task to-dynamo input.json dynamo.json
```

## Development

### Commands

```bash
# Run tests
deno test
```

## License

MIT License - see [LICENSE](LICENSE) for details
