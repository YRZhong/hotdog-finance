module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  printWidth: 100,
  proseWrap: 'never',
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json'
      }
    }
  ]
}
