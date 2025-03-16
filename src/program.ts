import { TodoSchema, TodoSchemaArray, type TypeTodo } from "./schema"
import {  Effect } from "effect";
import { Schema as S } from "@effect/schema";
export const request = (url: string) => {
    return fetch(url)
}
export const validData = (data: TypeTodo[]) => {
    return S.decodeSync(TodoSchemaArray)(data)
}
export const queryDataById = (id: number) => {
    return (data: TypeTodo[]) => {
        return Effect.Do.pipe(
            Effect.andThen(()=> data.find((item)=> item.id === id)),
            Effect.flatMap(Effect.fromNullable),
            Effect.runPromise
        )
    }
}