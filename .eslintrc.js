module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        'no-console': 'off',
        "indent": ["error", 2], //缩进为 2 个空格
        "linebreak-style": 'off', //强制使用一致的换行符风格
        "quotes": ["error", "single"], //使用单引号
        "semi": 0 //结束no添加分号
    }
};