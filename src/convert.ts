import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

/**
 * Convert DynamoDB JSON to normal JSON
 * @param dynamoJson DynamoDB JSON format
 * @returns Normal JSON format
 */
export function fromDynamoJson<T = any>(dynamoJson: Record<string, any>): T {
  return unmarshall(dynamoJson) as T;
}

/**
 * Convert normal JSON to DynamoDB JSON
 * @param json Normal JSON format
 * @returns DynamoDB JSON format
 */
export function toDynamoJson(json: any): Record<string, any> {
  return marshall(json);
}