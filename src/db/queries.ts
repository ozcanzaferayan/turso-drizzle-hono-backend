import { eq } from "drizzle-orm";
import { db } from "./db";
import { SelectTodo, todosTable } from "./schema";

export type Todo = Omit<SelectTodo, "isDone"> & { isDone: boolean };

export async function createTodo(data: Todo) {
  const todo = {
    ...data,
    isDone: data.isDone ? 1 : 0,
  };
  return await db.insert(todosTable).values(todo);
}

export async function getTodos(): Promise<Todo[]> {
  return (await db.select().from(todosTable)).map((todo) => ({
    ...todo,
    isDone: Boolean(todo.isDone),
  }));
}

export async function deleteTodo(id: SelectTodo["id"]) {
  return await db.delete(todosTable).where(eq(todosTable.id, id));
}

export async function updateTodo(
  id: SelectTodo["id"],
  data: Partial<Omit<SelectTodo, "id">>
) {
  const todo = {
    ...data,
    isDone: data.isDone ? 1 : 0,
  };
  return await db.update(todosTable).set(todo).where(eq(todosTable.id, id));
}
