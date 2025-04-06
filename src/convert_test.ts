import { assertEquals } from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { fromDynamoJson, toDynamoJson } from "./convert.ts";

Deno.test("convert between DynamoDB JSON and normal JSON", () => {
  const normalJson = {
    id: "123",
    name: "test",
    age: 30,
    isActive: true,
    scores: [85, 90, 95],
    metadata: {
      createdAt: "2023-01-01",
      updatedAt: "2023-01-02"
    }
  };

  const dynamoJson = {
    id: { S: "123" },
    name: { S: "test" },
    age: { N: "30" },
    isActive: { BOOL: true },
    scores: { L: [{ N: "85" }, { N: "90" }, { N: "95" }] },
    metadata: {
      M: {
        createdAt: { S: "2023-01-01" },
        updatedAt: { S: "2023-01-02" }
      }
    }
  };

  // Test normal JSON to DynamoDB JSON conversion
  assertEquals(toDynamoJson(normalJson), dynamoJson);

  // Test DynamoDB JSON to normal JSON conversion
  assertEquals(fromDynamoJson(dynamoJson), normalJson);
});