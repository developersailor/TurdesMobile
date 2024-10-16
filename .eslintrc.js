module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-native", "import", "jsx-a11y", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    "react-native/react-native": true,
    es6: true,
    node: true,
  },
  rules: {
    "prettier/prettier": ["error"],
    "react/react-in-jsx-scope": "off", // For React 17+
    "react/prop-types": "off", // Use TypeScript for prop types
    "@typescript-eslint/no-unused-vars": ["error"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
