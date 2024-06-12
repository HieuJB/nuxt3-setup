const utils_1 = require('@typescript-eslint/utils')
const explicitReturnTypeUtils_1 = require('@typescript-eslint/eslint-plugin/dist/util/explicitReturnTypeUtils')

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require explicit return types on functions and class methods',
      recommended: false
    },
    messages: {
      missingReturnType: 'Missing return type on function.'
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowConciseArrowFunctionExpressionsStartingWithVoid: {
            description: 'Whether to allow arrow functions that start with the `void` keyword.',
            type: 'boolean'
          },
          allowExpressions: {
            description: 'Whether to ignore function expressions (functions which are not part of a declaration).',
            type: 'boolean'
          },
          allowHigherOrderFunctions: {
            description: 'Whether to ignore functions immediately returning another function expression.',
            type: 'boolean'
          },
          allowTypedFunctionExpressions: {
            description: 'Whether to ignore type annotations on the variable of function expressions.',
            type: 'boolean'
          },
          allowDirectConstAssertionInArrowFunctions: {
            description: 'Whether to ignore arrow functions immediately returning a `as const` value.',
            type: 'boolean'
          },
          allowFunctionsWithoutTypeParameters: {
            description: "Whether to ignore functions that don't have generic type parameters.",
            type: 'boolean'
          },
          allowedNames: {
            description:
              'An array of function/method names that will not have their arguments or return values checked.',
            items: {
              type: 'string'
            },
            type: 'array'
          },
          allowedRegexNames: {
            description:
              'An array of function/method regex names that will not have their arguments or return values checked.',
            items: {
              type: 'RegEx'
            },
            type: 'array'
          },
          allowIIFEs: {
            description: 'Whether to ignore immediately invoked function expressions (IIFEs).',
            type: 'boolean'
          }
        }
      }
    ]
  },
  defaultOptions: [
    {
      allowExpressions: false,
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true,
      allowDirectConstAssertionInArrowFunctions: true,
      allowConciseArrowFunctionExpressionsStartingWithVoid: false,
      allowFunctionsWithoutTypeParameters: false,
      allowedNames: [],
      allowedRegexNames: [],
      allowIIFEs: false
    }
  ],
  create(context) {
    const [options] = context.options

    const sourceCode = context.getSourceCode()

    function isAllowedFunction(node) {
      let _a, _b, _c
      if (options.allowFunctionsWithoutTypeParameters && !node.typeParameters) {
        return true
      }
      if (options.allowIIFEs && isIIFE(node)) {
        return true
      }

      if (
        node.type === utils_1.AST_NODE_TYPES.ArrowFunctionExpression ||
        node.type === utils_1.AST_NODE_TYPES.FunctionExpression
      ) {
        const parent = node.parent
        let funcName
        if ((_c = node.id) === null || _c === void 0 ? void 0 : _c.name) {
          funcName = node.id.name
        } else if (parent) {
          switch (parent.type) {
            case utils_1.AST_NODE_TYPES.VariableDeclarator: {
              if (parent.id.type === utils_1.AST_NODE_TYPES.Identifier) {
                funcName = parent.id.name
              }
              break
            }
            case utils_1.AST_NODE_TYPES.MethodDefinition:
            case utils_1.AST_NODE_TYPES.PropertyDefinition:
            case utils_1.AST_NODE_TYPES.Property: {
              if (parent.key.type === utils_1.AST_NODE_TYPES.Identifier && parent.computed === false) {
                funcName = parent.key.name
              }
              break
            }
          }
        }
        if (!!funcName && !!options.allowedRegexNames) {
          for (const allowedRegexName of options.allowedRegexNames) {
            if (!!funcName && !!allowedRegexName.test(funcName)) {
              return true
            }
          }
        }
        if (!!funcName && !!options?.allowedNames.includes(funcName)) {
          return true
        }
      }
      if (
        node.type === utils_1.AST_NODE_TYPES.FunctionDeclaration &&
        node.id &&
        node.id.type === utils_1.AST_NODE_TYPES.Identifier
      ) {
        if (options.allowedRegexNames) {
          for (const allowedRegexName of options.allowedRegexNames) {
            if (allowedRegexName.test(node.id.name)) {
              return true
            }
          }
        }
        if (options.allowedNames.includes(node.id.name)) {
          return true
        }
      }
      return false
    }
    function isIIFE(node) {
      return node.parent.type === utils_1.AST_NODE_TYPES.CallExpression
    }

    return {
      'ArrowFunctionExpression, FunctionExpression'(node) {
        if (
          options.allowConciseArrowFunctionExpressionsStartingWithVoid &&
          node.type === utils_1.AST_NODE_TYPES.ArrowFunctionExpression &&
          node.expression &&
          node.body.type === utils_1.AST_NODE_TYPES.UnaryExpression &&
          node.body.operator === 'void'
        ) {
          return
        }
        if (isAllowedFunction(node)) {
          return
        }
        if (
          options.allowTypedFunctionExpressions &&
          ((0, explicitReturnTypeUtils_1.isValidFunctionExpressionReturnType)(node, options) ||
            (0, explicitReturnTypeUtils_1.ancestorHasReturnType)(node))
        ) {
          return
        }
        ;(0, explicitReturnTypeUtils_1.checkFunctionReturnType)(node, options, sourceCode, loc =>
          context.report({
            node,
            loc,
            messageId: 'missingReturnType'
          })
        )
      },
      FunctionDeclaration(node) {
        if (isAllowedFunction(node)) {
          return
        }
        if (options.allowTypedFunctionExpressions && node.returnType) {
          return
        }
        ;(0, explicitReturnTypeUtils_1.checkFunctionReturnType)(node, options, sourceCode, loc =>
          context.report({
            node,
            loc,
            messageId: 'missingReturnType'
          })
        )
      }
    }
  }
}
