import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils'

import { createRule } from '../utils/create-rule'
import { getRuleName } from '../utils/get-rule-name'

export const name = getRuleName(__filename)
export const rule = createRule({
  create(context) {
    return {
      ImportDeclaration(node) {
        const isPokemon = node.source.value === 'pokemon'
        if (!isPokemon) return

        const defaultImport = getDefaultImport(node.specifiers)
        if (defaultImport) return

        context.report({
          messageId: 'preferDefaultImport',
          node
        })
      }
    }
  },
  defaultOptions: [],
  meta: {
    docs: {
      description: "Suggest the use of 'pokemon' default import",
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
  name
})

const getDefaultImport = (specifiers: TSESTree.ImportClause[]) => {
  return specifiers.find(
    (specifier) => specifier.type === AST_NODE_TYPES.ImportDefaultSpecifier
  )
}
