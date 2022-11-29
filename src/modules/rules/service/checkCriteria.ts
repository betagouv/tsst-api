import { userType, ruleType } from './types';
import Engine from 'publicodes';
import { parse } from 'yaml';

export { checkCriteria };

const rules = `
pass navigo gratuit par idf mobilites:
  une de ces conditions:
    - est chomeur
    - toutes ces conditions:
      - age >= 18
      - age <= 26
`;

function checkCriteria(user: userType) {
    const parsedRules = parse(rules);

    const engine = new Engine({
        ...parsedRules,
        age: user.age,
        'est chomeur': user.is_unemployed ? 'oui' : 'non',
    });
    return engine.evaluate('pass navigo gratuit par idf mobilites').nodeValue;
}
