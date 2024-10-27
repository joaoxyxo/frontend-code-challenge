module.exports = {
  parserOptions: {
    parser: 'babel-eslint', // Usa babel-eslint para suportar ES6 e JSX
    ecmaVersion: 2020, // Suporte ao ES2020
    sourceType: 'module', // Usa import/export
  },
  env: {
    browser: true,
    node: true, // Se você usa código Node.js
    es6: true,
  },
  extends: [
    'plugin:vue/essential', // Extende as regras essenciais para Vue.js
    'eslint:recommended', // Extende as regras recomendadas do ESLint
  ],
  rules: {
    "vue/multi-word-component-names": "off",
    "no-unused-vars": "off",
    "vue/no-unused-vars": "off",
    "no-undef": "off",
    "vue/no-unused-components": "off",
    "vue/valid-v-slot": "off",
  },
};
