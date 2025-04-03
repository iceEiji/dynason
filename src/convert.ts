import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import type { AttributeValue } from "@aws-sdk/client-dynamodb";
import type { JsonObject } from "./types.ts";

/**
 * Convert DynamoDB JSON to normal JSON
 * @param dynamoJson DynamoDB JSON format
 * @returns Normal JSON format
 */
export function fromDynamoJson<T extends JsonObject = JsonObject>(
  dynamoJson: Record<string, AttributeValue>
): T {
  return unmarshall(dynamoJson) as T;
}

/**
 * Convert normal JSON to DynamoDB JSON
 * @param json Normal JSON format
 * @returns DynamoDB JSON format
 */
export function toDynamoJson(
  json: JsonObject
): Record<string, AttributeValue> {
  return marshall(json);
}