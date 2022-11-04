/**
 * =====================================================
 * 团队协同开发【代码语法规范化】配置，修改需重启vite方生效
 * =====================================================
 * 仅警示(warn)，强制报错(error), 不强制(off)
 * =====================================================
 */

require('@rushstack/eslint-patch/modern-module-resolution');

/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    './.vscode/.eslintai.json'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    //不强制【代码格式规范】，千人千面莫要求太严，如果你有强迫症，可以打开它
    'prettier/prettier': 'off',

    //#########################################################################################################
    // Typescript 规范规则 see https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
    //---------------------------------------------------------------------------------------------------------
    //类型声明使用不规范报错，例如：let label:string = '123' 错写成 let label:String = '123'
    '@typescript-eslint/ban-types': 'error',
    //出现未使用过的变量或函数时仅警示，不报错，免得无法运行造成开发心智负担，可以在变量前加上 _ 开头直接忽略
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true, varsIgnorePattern: '^_' }],
    //允许使用any声明类型，anyscript 有时也是一种无奈之举
    '@typescript-eslint/no-explicit-any': 'off',
    //允许在代码中使用 //@ts-ignore 忽视非标准规范
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    //存在无意义的空函数 提示警告
    '@typescript-eslint/no-empty-function': 'warn',
    //不要求对导出的函数和类的公共类方法进行显式返回和参数类型
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    //不要求对函数和类方法进行显式返回类型
    '@typescript-eslint/explicit-function-return-type': 'off',
    //允许使用 require 语句
    '@typescript-eslint/no-var-requires': 'off',
    //不允许使用 TypeScript 2+ 提供的非空断言操作!叹号符 例：function x(a: string | null) {const b = a!;}
    '@typescript-eslint/no-non-null-assertion': 'error',
    //允许使用过时方式声明自定义 TypeScript 模块和命名空间, 但要求进行 declare 显式声明
    '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],
    //#########################################################################################################

    //#########################################################################################################
    // Vue 规范规则 see https://eslint.vuejs.org/rules/
    //---------------------------------------------------------------------------------------------------------
    //允许在标签中编写 HTML 注释
    'vue/comment-directive': 'off',
    //允许多词组件名称 Component name "[...404].vue" should always be multi-word
    'vue/multi-word-component-names': 'off',
    //对自定义事件名称强制实施串式命名 see https://eslint.vuejs.org/rules/custom-event-name-casing.html
    'vue/custom-event-name-casing': 'error',
    //不强制v-for使用key属性
    'vue/require-v-for-key': 'off',
    //允许二次封闭事件使用 '.native' modifier on 'v-on'
    'vue/no-deprecated-v-on-native-modifier': 'off',
    //允许vue模板赋值变量未使用
    'vue/no-unused-vars': 'off',
    //允许v-for使用纯数字当循环对象
    'vue/valid-v-for': 'off',
    //#########################################################################################################

    //#########################################################################################################
    // javascript 规范规则 see https://eslint.org/docs/rules/ or https://eslint.bootcss.com/docs/rules/
    //---------------------------------------------------------------------------------------------------------
    //不强制使用一致的换行风格
    'linebreak-style': ['off', 'windows'],
    //允许打印调试
    'no-console': 'off',
    //不能存在未定义的变量或函数[error:弹屏报错][warn:仅警示]
    'no-undef': 'error',
    //禁止在变量定义之前使用它们
    'no-use-before-define': 'error',
    //不强制在 function 的左括号之前使用一致的空格
    'space-before-function-paren': 'off',

    //是否强制双引号[double] or 单引号[single] or 反引号[backtick]定义字符串
    // "quotes": ["error", "single"],

    //禁止末位拖尾逗号, IE小气会异常，非IE项目可以注释掉
    // "comma-dangle": ["error", "never"],

    //打包时存在debugger将警告
    'no-debugger': process.env.NODE_ENV == 'production' ? 'warn' : 'off',
    //使用arguments可变参数是否警告
    'prefer-rest-params': 'off',
    //关闭变量未使用提示，免得与 @typescript-eslint/no-unused-vars 重复提示
    'no-unused-vars': 'off'
    //#########################################################################################################
  },
  //要忽略检测的全局变量或函数
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
    $: 'readonly',
    __APP__: 'readonly',
    __dirname: 'readonly'
  }
};
