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
dynason from-dynamo input.json [output.json]  # Full command
dynason f input.json [output.json]            # Short form
```

Convert normal JSON to DynamoDB JSON:

```bash
dynason to-dynamo input.json [output.json]    # Full command
dynason t input.json [output.json]            # Short form
```

Show help:

```bash
dynason --help  # or dynason -h
```

### Using Deno

```bash
# Using full commands
deno task dynason from-dynamo input.json [output.json]
deno task dynason to-dynamo input.json [output.json]

# Using short commands
deno task f input.json [output.json]
deno task t input.json [output.json]
```

### Example Data

Here's a simple example of the conversion between normal JSON and DynamoDB JSON:

Normal JSON:

```json
{
  "id": "123",
  "name": "example",
  "count": 42,
  "isActive": true,
  "tags": ["a", "b"],
  "info": {
    "created": "2024-01-01"
  }
}
```

DynamoDB JSON:

```json
{
  "id": {
    "S": "123"
  },
  "name": {
    "S": "example"
  },
  "count": {
    "N": "42"
  },
  "isActive": {
    "BOOL": true
  },
  "tags": {
    "L": [
      { "S": "a" },
      { "S": "b" }
    ]
  },
  "info": {
    "M": {
      "created": {
        "S": "2024-01-01"
      }
    }
  }
}
```

The conversion handles all DynamoDB data types:

- `S`: String
- `N`: Number (always as string)
- `BOOL`: Boolean
- `L`: List/Array
- `M`: Map/Object

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
