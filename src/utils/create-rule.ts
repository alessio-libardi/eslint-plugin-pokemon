import { parse } from 'path'
import { ESLintUtils } from '@typescript-eslint/utils'

const REPO_URL = 'https://github.com/alessio-libardi/eslint-plugin-pokemon'
const DOCS_PATH = 'docs/rules'

const createRule = ESLintUtils.RuleCreator((name) => {
  const ruleName = parse(name).name

  return `${REPO_URL}/tree/main/${DOCS_PATH}/${ruleName}.md`
})

export { createRule }
