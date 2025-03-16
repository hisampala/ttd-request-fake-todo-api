import { Schema as S } from "@effect/schema";
export const TodoSchema = S.Struct({
    userId: S.Number,
    id: S.Number,
    title: S.String,
    completed: S.Boolean
})
export type TypeTodo = S.Schema.Type<typeof TodoSchema>
export const TodoSchemaArray = S.Array(TodoSchema)
export type TypeTodoArray =  S.Schema.Type<typeof TodoSchemaArray>