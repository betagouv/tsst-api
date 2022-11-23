import { ruleType } from "./types"

export { rule }

const rule: ruleType = {
    kind: "operator",
    value: "OR",
    elements: [
        {
            kind: "variable",
            name: "is_unemployed",
            criterion: { kind: "boolean", value: true }
        },
        {
            kind: "operator",
            value: "AND",
            elements: [
                {
                    "kind": "variable",
                    "name": "age",
                    "criterion": { kind: "formula", comparator: "<=", value: 26 },
                },
                {
                    "kind": "variable",
                    "name": "age",
                    "criterion": { kind: "formula", comparator: ">=", value: 18 },
                }
            ]
        }

    ]
}