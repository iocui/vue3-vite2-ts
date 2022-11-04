# Vue 3 + Typescript + Vite

[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE) [![vue](https://img.shields.io/badge/vue-3+-grass?logo=v-art)](https://v3.cn.vuejs.org/) [![vite](https://img.shields.io/badge/vite-2+-a652fe?logo=vite&logoColor=ffbc14)](https://cn.vitejs.dev/) [![typescript](https://img.shields.io/badge/typescript-4.5+-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/zh/)

> The minimal amount of CSS to replicate the GitHub Markdown style

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

```js
<script setup lang="ts">
const markdownBox = ref()
const props = defineProps<{
  frontmatter: {
    title: string
    meta: []
  }
}>()

onMounted(() => {
  // console.log(markdownBox.value, props.frontmatter)

  $(markdownBox.value)
    .find('pre code.hljs')
    .each(function () {
      //@ts-ignore
      let _this: InnerHTML = $(this as any)[0]
      let parentDom = $(_this).parent()
      parentDom.addClass('preCode-box')
      let lines = _this.innerHTML.split(/\n/).slice(0, -1)
      if (lines.length > 1) {
        let text = '<ol>'
        $.each(lines, function (i: number, item: string) {
          if (item.trim() != '') {
            text += '<li>' + item + '</li>'
          }
        })
        text += '</ol>'
        _this.innerHTML = text
        if (lines.length > 20) {
          let hideDom = $('<div class="preCode-box-btn"><span><em>⮟</em></span></div>')

          hideDom.find('span').click(function () {
            if (!parentDom.hasClass('preCode-box-hide')) {
              let parentTop = parentDom.offset().top - 10
              $('html,body').animate({ scrollTop: parentTop }, 500)
            }
            parentDom.toggleClass('preCode-box-hide')
          })

          parentDom.addClass('preCode-box-hide').append(hideDom)
        }
      }
    })
})
</script>
```

```php
<?php
echo "123";
?>
```

```html
<template>
  <n-space>
    <n-button>Default</n-button>
    <n-button>Default</n-button>
    <n-button type="primary">Primary</n-button>
    <n-button type="info">Info</n-button>
    <n-button type="success">Success</n-button>
    <n-button type="warning">Warning</n-button>
    <n-button type="error">Error</n-button>
  </n-space>
</template>
```

:)

| First Header | Second Header |
| ------------ | ------------- |
| Content Cell | Content Cell  |
| Content Cell | Content Cell  |

Since TypeScript ~~cannot~~ handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette. <a href="#" target="_blank">超链接名</a>

## 安装依赖

```
yarn
```

## 开发

```
yarn dev
```

## 打包(window10)

```
yarn build
```

## 打包(window7)

```
yarn build:win7
```

## 预览

```
yarn serve
```

<!-- 路由设置 -->
<route lang="yaml">
meta:
  title: '我是一个示例'
</route>
