import { it, describe, beforeEach, expect } from "bun:test";
import * as program from "../src/program";
const url = "https://jsonplaceholder.typicode.com/todos"

describe("TDD todolist api program", () => {
    let res: Response
    beforeEach(async () => {
        res = await program.request(url)
    })
    it("should request to todo list api status return 200 ", async () => {
        const actual = res.status
        expect(actual).toBe(200)
    })
    it("should request to todo list api status return 404 ", async () => {
        const res = await program.request(url + "/unkonw/path")
        const actual = res.status
        expect(actual).toBe(404)
    })
    it("should request to todo list api data return is no undifined ", async () => {
        const actual = await res.json()
        expect(actual).not.toBeEmpty()
    })
    it("should valid data schema  ", async () => {
        const actual = program.validData(await res.json())
        expect(actual).toBeArray()
    })

    describe.each([
        [1, 1],
        [2, 2],
        [3, 3]
    ])("query by id", (a, expected) => {
        it(`should query by id ${a} return id = ${expected}`, async () => {
            const data = await program.queryDataById(a)(await res.json())
            expect(data).not.toBeEmpty()
            const actual = data.id
            expect(actual).toBe(expected)
        });
    });

})

