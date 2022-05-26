import { AST_NODE_TYPES } from '@typescript-eslint/utils'

import { name, rule } from './prefer-pokemon-get-name'
import { ruleTester } from '../utils/rule-tester'

ruleTester.run(name, rule, {
  valid: [
    {
      code: 'pokemon.all()'
    },
    {
      code: 'pokemon.getName(0)'
    }
  ],
  invalid: [
    {
      code: 'pokemon.all().at(0)',
      errors: [
        {
          messageId: 'preferPokemonGetName',
          type: AST_NODE_TYPES.MemberExpression
        }
      ]
    },
    {
      code: 'pokemon.all()[0]',
      errors: [
        {
          messageId: 'preferPokemonGetName',
          type: AST_NODE_TYPES.MemberExpression
        }
      ]
    }
  ]
})
