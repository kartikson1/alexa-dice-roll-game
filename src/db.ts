import AWS from "aws-sdk";

export const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: "us-east-1",
});
