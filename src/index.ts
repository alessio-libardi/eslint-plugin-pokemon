import { TSESLint } from '@typescript-eslint/utils'

import * as preferDefaultImport from './rules/prefer-default-import'
import * as preferGetName from './rules/prefer-get-name'
import * as preferGetId from './rules/prefer-get-id'

const rules = {
  [preferDefaultImport.name]: preferDefaultImport.rule,
  [preferGetName.name]: preferGetName.rule,
  [preferGetId.name]: preferGetId.rule
}

const allRules = Object.entries(rules)
  .filter(([, rule]) => !rule.meta.deprecated)
  .reduce(
    (acc, [name, rule]) => ({
      ...acc,
      [`pokemon/${name}`]: rule.meta.docs?.recommended
    }),
    {}
  )

const recommendedRules = Object.entries(rules)
  .filter(([, rule]) => rule.meta.docs?.recommended)
  .reduce(
    (acc, [name, rule]) => ({
      ...acc,
      [`pokemon/${name}`]: rule.meta.docs?.recommended
    }),
    {}
  )

const createConfig = (rules: Record<string, TSESLint.Linter.RuleLevel>) => ({
  plugins: ['pokemon'],
  rules
})

export = {
  configs: {
    all: createConfig(allRules),
    recommended: createConfig(recommendedRules)
  },
  rules
}
