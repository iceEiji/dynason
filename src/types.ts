import type { AttributeValue } from "@aws-sdk/client-dynamodb";

// Normal JSON types
/** Primitive JSON values (string, number, boolean, or null) */
export type JsonPrimitive = string | number | boolean | null;

/** JSON array containing any valid JSON values */
export type JsonArray = JsonValue[];

/** JSON object with string keys and any valid JSON values */
export type JsonObject = { [key: string]: JsonValue };

/** Any valid JSON value (primitive, object, or array) */
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

// DynamoDB specific types
/** DynamoDB JSON format using AWS SDK AttributeValue */
export type DynamoDBJson = Record<string, AttributeValue>;

/** Standard JSON object format */
export type NormalJson = JsonObject;