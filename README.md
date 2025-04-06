# dynason

A command-line utility to convert between DynamoDB JSON, normal JSON, and CSV formats.

## Features

- Convert between different data formats:
  - DynamoDB JSON
  - Normal JSON
  - Header CSV
- Simple command-line interface
- Automatic output file naming
- Flexible format specification

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

Format can be specified using the following options:

- DynamoDB JSON: `dynamo`, `ddb`
- Normal JSON: `normal`, `json`
- Header CSV: `csv`

### Basic Usage

```bash
dynason <input-file> --from <format> --to <format> [--output <file>]
```

Short form:

```bash
dynason input.json -f dynamo -t csv     # Convert DynamoDB JSON to CSV
dynason data.csv -f csv -t normal       # Convert CSV to normal JSON
```

Show help:

```bash
dynason --help  # or dynason -h
```

### Examples

Convert DynamoDB JSON to CSV:

```bash
dynason data.json --from dynamo --to csv
# Creates data.csv

# With specific output file
dynason data.json -f ddb -t csv result.csv
```

Convert normal JSON to DynamoDB JSON:

```bash
dynason input.json --from normal --to dynamo
# Creates input.dynamo.json

# With specific output file
dynason input.json -f json -t ddb output.json
```

Convert CSV to normal JSON:

```bash
dynason data.csv --from csv --to normal
# Creates data.json
```

### Using Deno

```bash
# Full options
deno task dynason data.json --from dynamo --to csv

# Short form
deno task dynason input.json -f json -t ddb
```

### Example Data

Here's a simple example of the conversion between different formats:

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

CSV:

```csv
id,name,count,isActive,tags,info.created
123,example,42,true,"a,b",2024-01-01
```

The conversion handles all data types appropriately:

- DynamoDB JSON types:
  - `S`: String
  - `N`: Number (always as string)
  - `BOOL`: Boolean
  - `L`: List/Array
  - `M`: Map/Object
- CSV handling:
  - Nested objects use dot notation (e.g., `info.created`)
  - Arrays are comma-separated within quotes
  - Headers are automatically generated from the structure

If output file is not specified, it will create a new file with appropriate extension:

- `.json` for JSON formats (with `.dynamo` added for DynamoDB JSON)
- `.csv` for CSV format

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
