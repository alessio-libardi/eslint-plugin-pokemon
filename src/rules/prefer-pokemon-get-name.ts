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
          messageId: 'preferPokemonGetName',
          node: memberExpression
        })
      }
    }
  },
  name,
  meta: {
    docs: {
      description: 'Prefer pokemon.getName',
      recommended: 'warn',
      suggestion: true
    },
    hasSuggestions: true,
    messages: {
      preferPokemonGetName: 'Prefer using pokemon.getName.'
    },
    schema: [],
    type: 'suggestion'
  },
  defaultOptions: []
})

function getCallExpressionByCallee(
  ancestors: TSESTree.Node[],
  callee: TSESTree.Node | undefined
) {
  return ancestors.find(
    (ancestor) =>
      ancestor.type === AST_NODE_TYPES.CallExpression &&
      ancestor.callee === callee &&
      ancestor.callee.type === AST_NODE_TYPES.MemberExpression &&
      ancestor.callee.property.type === AST_NODE_TYPES.Identifier &&
      ancestor.callee.property.name === 'all'
  ) as TSESTree.CallExpression | undefined
}

function getMemberExpressionByObject(
  ancestors: TSESTree.Node[],
  object: TSESTree.Node | undefined
) {
  return ancestors.find(
    (ancestor) =>
      ancestor.type === AST_NODE_TYPES.MemberExpression &&
      ancestor.object === object &&
      ((ancestor.property.type === AST_NODE_TYPES.Identifier &&
        ancestor.property.name === 'at') ||
        ancestor.property.type === AST_NODE_TYPES.Literal)
  ) as TSESTree.MemberExpression | undefined
}
