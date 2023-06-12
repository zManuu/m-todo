/* eslint-env node */
module.exports = {
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'parser': '@typescript-eslint/parser',
		'sourceType': 'module'
	},
	plugins: ['@typescript-eslint'],
	root: true,
	rules: {
		'semi': ['error', 'never'],
		'quotes': ['error', 'single'],
		'default-case-last': 'error',
		'default-case': 'error',
		'default-param-last': 'error',
		'eqeqeq': 'error',
		'func-style': ['error', 'declaration', { 'allowArrowFunctions': true }],
		'indent': [ 'error', 'tab' ],
		'@typescript-eslint/no-explicit-any': 'error',
		'no-mixed-spaces-and-tabs': 'off'
	}
}