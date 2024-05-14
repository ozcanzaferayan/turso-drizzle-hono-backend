import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import { SelectTodo, todosTable } from "./schema";

dotenv.config({ path: "./.env" });

const seed = async () => {
  const client = createClient({
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });
  const db = drizzle(client);

  const todos: SelectTodo[] = [
    {
      id: 1,
      name: "Egg",
      isDone: 0,
    },
    {
      id: 2,
      name: "Bread",
      isDone: 1,
    },
    {
      id: 3,
      name: "Onion",
      isDone: 0,
    },
  ];

  console.log("Seed start");
  let res = await db.insert(todosTable).values(todos);
  console.log(`Inserted ${res.rowsAffected} todos`);
  console.log("Seed done");
};

seed();
