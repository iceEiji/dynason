import type { AttributeValue } from "@aws-sdk/client-dynamodb";

// Normal JSON types
export type JsonPrimitive = string | number | boolean | null;
export type JsonArray = JsonValue[];
export type JsonObject = { [key: string]: JsonValue };
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

// DynamoDB specific types
export type DynamoDBJson = Record<string, AttributeValue>;
export type NormalJson = JsonObject;