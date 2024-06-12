const stylelint = require('stylelint')

const ruleName = 'plugin/use-color-variables'
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected:
    'Do not use the color #{color}, please replace it with {variable} for easier system maintenance in the future !!!'
})

const colorMap = {
  '#d32d2f': '$primary',
  '#ff0000': '$primary-400',
  '#f0b150': '$yellow-600',
  '#f5ebbd': '$yellow-500',
  '#fdf8e1': '$yellow-400',
  '#94572a': '$brown-500',
  '#3eb976': '$green-500',
  '#73bbfe': '$blue-500',
  '#202020': '$black',
  '#ffffff': '$white',
  '#656565': '$grey-600',
  '#888888': '$grey-500',
  '#a6a6a6': '$grey-300',
  '#ebebeb': '$grey-200',
  '#d6d6d6': '$grey-100',
  '#f5f5f5': '$grey-50'
}

const ruleFunction = (primaryOption, secondaryOptionObject, context) => {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(result, ruleName, {
      actual: primaryOption
    })

    if (!validOptions) {
      return
    }

    root.walkDecls(decl => {
      const value = decl.value.toLowerCase()
      const matchingVariable = Object.keys(colorMap).find(color => value.includes(color.toLowerCase()))
      if (matchingVariable) {
        stylelint.utils.report({
          ruleName,
          result,
          node: decl,
          message: messages.expected
            .replace('{color}', matchingVariable.substring(1))
            .replace('{variable}', colorMap[matchingVariable])
        })
      }
    })
  }
}

module.exports = stylelint.createPlugin(ruleName, ruleFunction)
module.exports.ruleName = ruleName
module.exports.messages = messages
