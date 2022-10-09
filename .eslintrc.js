/* eslint prettier/prettier: off */
module.exports = {
  "parser": "@typescript-eslint/parser",
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "semi": ["error", "never"],
    "quotes": ["error", "double"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/no-inferrable-types": [
      "warn", {
        "ignoreParameters": true
      }
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": "error",
    // prettierと矛盾することがあるので、offにしている
    "indent": ["off", 2],
    "prettier/prettier": ["error", {
      "singleQuote": false,
      "semi": false,
      "trailingComma": "none"
    }]
  }
}
