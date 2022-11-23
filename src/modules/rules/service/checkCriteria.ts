import { userType, ruleType } from "./types"

export { checkCriteria }

function checkCriteria(rule: ruleType, user: userType): boolean {
    switch (rule.kind) {
        case "operator":
            switch (rule.value) {
                case "AND":
                    return rule.elements.reduce((acc, element) => checkCriteria(element, user) && acc, true);
                case "OR":
                    return rule.elements.reduce((acc, element) => checkCriteria(element, user) || acc, false);
            }
        case "variable":
            const value = (user as any)[rule.name]
            if (value == undefined) {
                return false
            }
            switch (rule.criterion.kind) {
                case "boolean":
                    return value == rule.criterion.value;
                case "formula":
                    switch (rule.criterion.comparator) {
                        case "<":
                            return value < rule.criterion.value
                        case ">":
                            return value > rule.criterion.value
                        case "<=":
                            return value <= rule.criterion.value
                        case ">=":
                            return value >= rule.criterion.value
                        case "==":
                            return value == rule.criterion.value
                    }
            }
    }
}