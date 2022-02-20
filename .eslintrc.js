module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'airbnb-base',
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		indent: ['warn', 'tab'],
		'no-tabs': 'off',

		semi: ['error', 'never'],
		'no-unexpected-multiline': 'error',
		'semi-style': ['error', 'first'],
		'no-extra-semi': 'error',

		'comma-dangle': ['warn', 'always-multiline'],
		'arrow-parens': ['warn', 'as-needed'],

		'no-console': 'off',
		'import/prefer-default-export': 'off',
		'max-classes-per-file': 'off',
	},
}
