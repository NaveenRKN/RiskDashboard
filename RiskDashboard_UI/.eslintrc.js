module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-unused-vars":"off",
        "no-undef":"off",
        "no-cond-assign":"off",
        "no-prototype-buil":"off",
        "no-useless-escape":"off",
        "no-unsafe-finally":"off",
        "no-prototype-builtins":"off",
        "no-func-assign":"off",
        "no-empty":"off",
        "no-fallthrough":"off",
        "no-misleading-character-class":"off",
        "no-sparse-arrays":"off",
        "no-redeclare":"off",
        "valid-typeof":"off",
        "getter-return":"off",
        "no-control-regex":"off",
        "react/display-name":"off",
        "react/no-find-dom-node":"off",
    },
    settings: {
        react: {
          version: "detect",
        },
      },
}
