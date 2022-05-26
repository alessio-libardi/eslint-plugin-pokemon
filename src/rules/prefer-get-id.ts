import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils'

import { createRule } from '../utils/create-rule'
import { getRuleName } from '../utils/get-rule-name'

export const name = getRuleName(__filename)
export const rule = createRule({
  create(context) {
    return {
      Identifier(node) {
        const isPokemon = node.name === 'pokemon'
        if (!isPokemon) return

        const ancestors = context.getAncestors()

        const callExpression = getCallExpressionByCallee(ancestors, node.parent)
        if (!callExpression) return

        const memberExpression = getMemberExpressionByObject(
          ancestors,
          callExpression
        )
        if (!memberExpression) return

        context.report({
          messageId: 'preferGetId',
          node: memberExpression
        })
      }
    }
  },
  defaultOptions: [],
  meta: {
    docs: {
      description: "Enforce 'pokemon.getId' usage",
      recommended: 'error',
      suggestion: true
    },
    hasSuggestions: true,
    messages: {
      preferGetId: "Use 'pokemon.getId' instead."
    },
    schema: [],
    type: 'suggestion'
  },
  name
})

const getCallExpressionByCallee = (
  ancestors: TSESTree.Node[],
  callee: TSESTree.Node | undefined
) => {
  return ancestors.find(
    (ancestor) =>
      ancestor.type === AST_NODE_TYPES.CallExpression &&
      ancestor.callee === callee &&
      ancestor.callee.type === AST_NODE_TYPES.MemberExpression &&
      ancestor.callee.property.type === AST_NODE_TYPES.Identifier &&
      ancestor.callee.property.name === 'all'
  ) as TSESTree.CallExpression | undefined
}

const getMemberExpressionByObject = (
  ancestors: TSESTree.Node[],
  object: TSESTree.Node | undefined
) => {
  return ancestors.find(
    (ancestor) =>
      ancestor.type === AST_NODE_TYPES.MemberExpression &&
      ancestor.object === object &&
      ancestor.property.type === AST_NODE_TYPES.Identifier &&
      ancestor.property.name === 'indexOf'
  ) as TSESTree.MemberExpression | undefined
}
