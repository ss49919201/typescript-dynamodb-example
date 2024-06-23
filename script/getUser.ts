import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { z } from "zod";
import { client } from "./client";

const getUser = async () => {
  const { Item: item } = await client.send(
    new GetItemCommand({
      TableName: "Users",
      Key: {
        id: { S: "1" },
      },
    })
  );
  return newUser({
    id: item?.id.S,
    name: item?.name.S,
  });
};

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
} as const);

type User = z.infer<typeof userSchema>;

const newUser = (user: Partial<User>) =>
  user ? userSchema.parse(user) : console.error("User not found");

getUser()
  .then((r) => console.log(r))
  .catch((e) => console.error(e));
