import { AST_NODE_TYPES } from '@typescript-eslint/utils'

import { name, rule } from './prefer-get-id'
import { ruleTester } from '../utils/rule-tester'

ruleTester.run(name, rule, {
  valid: [
    {
      code: 'pokemon.all()'
    },
    {
      code: "pokemon.getId('Name')"
    }
  ],
  invalid: [
    {
      code: "pokemon.all().indexOf('Name')",
      errors: [
        {
          messageId: 'preferGetId',
          type: AST_NODE_TYPES.MemberExpression
        }
      ]
    }
  ]
})
