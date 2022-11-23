export type { userType, ruleType }

type userType = {
    id: number,
    age: number
    is_unemployed: boolean,
}

type ruleType = {
    kind: "operator",
    value: "AND" | "OR",
    elements: Array<ruleType>
} | {
    kind: "variable",
    name: string,
    criterion: {
        kind: "boolean",
        value: boolean,
    } | {
        kind: "formula",
        comparator: "<=" | ">=" | "<" | ">" | "=="
        value: number
    }
}