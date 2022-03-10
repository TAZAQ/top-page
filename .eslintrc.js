module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    "eslint:recommended"
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "spaced-comment": 0,
    "comma-dangle": ["error", "always-multiline"],
    "object-shorthand": ["error", "always", { "avoidExplicitReturnArrows": true }],
    "padding-line-between-statements": [
      "error",
      { "blankLine": "always", "prev": "*", "next": "return" },
      { "blankLine": "never", "prev": "empty", "next": "return" },
      { "blankLine": "always", "prev": "*", "next": "function" },
      { "blankLine": "never", "prev": "empty", "next": "function" },
    ],
    "lines-between-class-members": ["error", "always"],
    "arrow-parens": ["error", "always"],
    "no-else-return": "warn",
    "object-curly-spacing": ["error", "always"],
    "eol-last": ["error", "always"],
    "no-multiple-empty-lines": [2, { "max": 1, "maxEOF": 1 }],
    "no-trailing-spaces": ["error"],
    "semi": ["error", "never"],
    "arrow-spacing": [2, { "before": true, "after": true }],
    "comma-spacing": [2, { "before": false, "after": true }],
    'eqeqeq': ["error", "always"],
    'no-useless-concat': "error",
    'prefer-template': 'error',
    'no-unused-vars': 'off',


    // typescript rules
    "@typescript-eslint/array-type": ["error", { default: "array-simple", readonly: "array-simple" }],
    "@typescript-eslint/class-literal-property-style": ["error", "fields"],
    "@typescript-eslint/consistent-type-assertions": ["error", { assertionStyle: "as" }],
    "@typescript-eslint/explicit-member-accessibility": ["warn", { accessibility: "no-public" }],
    "@typescript-eslint/member-delimiter-style": ["error", {
      singleline: {
        delimiter: "semi",
        requireLast: false,
      },
      multilineDetection: "brackets",
    }],
    "@typescript-eslint/member-ordering": ["error", {
      classes: [
        "public-static-field",
        "protected-static-field",
        "private-static-field",

        "public-static-method",
        "protected-static-method",
        "private-static-method",

        "public-instance-field",
        "protected-instance-field",
        "private-instance-field",

        "constructor",

        "public-instance-method",
        "protected-instance-method",
        "private-instance-method",
      ],
    }],
    "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
    "@typescript-eslint/prefer-for-of": ["warn"],
    "@typescript-eslint/prefer-optional-chain": ["warn"],
    "@typescript-eslint/space-before-function-paren": [
      "error",
      {
        anonymous: "never",
        named: "always",
        asyncArrow: "always",
      },
    ],
  },
};
