import { AST_NODE_TYPES } from '@typescript-eslint/utils'

import { name, rule } from './prefer-pokemon-get-id'
import { ruleTester } from '../utils/rule-tester'

ruleTester.run(name, rule, {
  valid: [
    {
      code: "pokemon.getId('Name')"
    }
  ],
  invalid: [
    {
      code: "pokemon.all().indexOf('Name')",
      errors: [
        {
          messageId: 'preferPokemonGetId',
          type: AST_NODE_TYPES.MemberExpression
        }
      ]
    }
  ]
})
