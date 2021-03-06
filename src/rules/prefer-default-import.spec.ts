import { AST_NODE_TYPES } from '@typescript-eslint/utils'

import { name, rule } from './prefer-default-import'
import { ruleTester } from '../utils/rule-tester'

ruleTester.run(name, rule, {
  valid: [
    {
      code: "import pokemon from 'pokemon'"
    },
    {
      code: "import pokemon from 'module'"
    }
  ],
  invalid: [
    {
      code: "import { all, random, getName, getId } from 'pokemon'",
      errors: [
        {
          messageId: 'preferDefaultImport',
          type: AST_NODE_TYPES.ImportDeclaration
        }
      ]
    }
  ]
})
