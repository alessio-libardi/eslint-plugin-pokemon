import { AST_NODE_TYPES } from '@typescript-eslint/utils'

import { createRule } from '../utils/create-rule'
import { getRuleName } from '../utils/get-rule-name'

export const name = getRuleName(__filename)
export const rule = createRule({
  create(context) {
    return {
      ImportDeclaration(node) {
        const { source, specifiers } = node
        const [headSpecifier] = specifiers
        const isPokemonImport = source.value === 'pokemon'
        const isDefaultImport =
          headSpecifier.type === AST_NODE_TYPES.ImportDefaultSpecifier

        if (isPokemonImport && !isDefaultImport) {
          context.report({
            messageId: 'preferDefaultImport',
            node
          })
        }
      }
    }
  },
  name,
  meta: {
    docs: {
      description: "Prefer 'pokemon' default import",
      recommended: 'warn',
      suggestion: true
    },
    hasSuggestions: true,
    messages: {
      preferDefaultImport: 'Prefer using the default import.'
    },
    schema: [],
    type: 'suggestion'
  },
  defaultOptions: []
})
