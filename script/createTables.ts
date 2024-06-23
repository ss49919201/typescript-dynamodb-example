import {
  CreateTableCommand,
  DynamoDBClient,
  ListTablesCommand,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "us-west-2",
  endpoint: "http://localhost:18000",
  credentials: {
    accessKeyId: "fake",
    secretAccessKey: "fake",
  },
});

const createUserTable = async () => {
  const { TableNames: tableNames } = await client.send(
    new ListTablesCommand({})
  );
  if (tableNames?.some((tableName) => tableName === "Users")) {
    console.info("Users already exists");
    return;
  }

  await client.send(
    new CreateTableCommand({
      TableName: "Users",
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    })
  );
};

createUserTable().catch((e) => console.error(e));
