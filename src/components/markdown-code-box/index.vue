<script setup lang="ts" name="MarkdownCodeBox">
// ###################################################################################
// 突出显示代码块由插件决定 /config/bootstrap/plugins/components/vue-markdown/index.ts
// ===================================================================================

// -----------------------------------------------------------------------------------
// @使用prismjs时的代码高亮样式
// -----------------------------------------------------------------------------------
import './style/prism/default.css';

// -----------------------------------------------------------------------------------
// @使用highlightjs时的代码高亮样式，需自行安装依赖: yarn add -D markdown-it-highlightjs
// -----------------------------------------------------------------------------------
// import './style/highlight/default.scss'
// import './style/highlight/vs.css'

// ###################################################################################

// markdown github 风格：https://github.com/sindresorhus/github-markdown-css
import 'github-markdown-css/github-markdown.css';

import clipboard from 'clipboard';

const markdownBox = ref();

onMounted(() => {
  nextTick(function () {
    // 利用jQuery初始化代码块行号，这里只要是演示jQuery的用法，你也可以直接改为Vue的写法
    if (typeof $ == 'function')
      $(markdownBox.value)
        .find('pre code')
        .each(function () {
          //@ts-ignore
          const _this = $(this as any)[0];
          const parentDom = $(_this).parent();
          parentDom.addClass('preCode-box');

          $('<button>Copy</button>').appendTo(parentDom).addClass('copytoclipboard');
          const copyCode = new clipboard('button.copytoclipboard', {
            target: (elem: Element) => {
              return elem.previousElementSibling || elem;
            }
          });
          copyCode.on('success', function (event: clipboard.Event) {
            event.clearSelection();
            event.trigger.innerHTML = '<b>&radic;</b> ok';
            window.setTimeout(function () {
              event.trigger.textContent = 'Copy';
            }, 1500);
          });
          copyCode.on('error', function (event: clipboard.Event) {
            event.trigger.textContent = 'Press "Ctrl + C" to copy';
            window.setTimeout(function () {
              event.trigger.textContent = 'Copy';
            }, 1500);
          });

          const lines = _this.innerHTML.split(/\n/).slice(0, -1);
          if (lines.length > 1) {
            let text = '<ol>';
            $.each(lines, function (i: number, item: string) {
              if (item.trim() != '') {
                text += '<li>' + item + '</li>';
              }
            });
            text += '</ol>';
            _this.innerHTML = text;
            if (lines.length > 20) {
              const hideDom = $('<div class="preCode-box-btn"><span><em>⇓</em></span></div>');

              hideDom.find('span').click(function () {
                if (!parentDom.hasClass('preCode-box-hide')) {
                  const parentTop = parentDom.offset().top - 10;
                  $('html,body').animate({ scrollTop: parentTop }, 500);
                }
                parentDom.toggleClass('preCode-box-hide');
              });

              parentDom.addClass('preCode-box-hide').append(hideDom);
            }
          }
        });
  });
});
</script>

<template>
  <div ref="markdownBox" class="markdown-box">
    <slot></slot>
  </div>
</template>

<style lang="scss">
pre[class*='language-'] {
  color: inherit;
  text-shadow: none !important;
}
code[class*='language-'] {
  color: inherit;
  background: none;
  text-shadow: none !important;
}
/* 代码行号样式 */
.preCode-box {
  border: 0;
  display: block;
  margin: 0;
  white-space: pre-wrap;
  ol {
    list-style: decimal;
    margin: 0 !important;
  }
  ol li {
    list-style: decimal-leading-zero;
    border-left: 1px solid #ddd !important;
    padding: 1px 4px !important;
    margin: 0 !important;
    white-space: pre;
  }
  ol li::marker {
    color: #999;
    font-size: 12px;
    font-weight: 200;
  }
}

.markdown-box {
  padding: 8px;
  button.copytoclipboard {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: -internal-light-dark(black, white);
    background-color: -internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59));
    margin: 0em;
    padding: 2px 6px;
    border: 0;
    border-radius: 8px;
  }
  pre.preCode-box {
    position: relative;
  }

  pre.preCode-box .copy-icon-button {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
  }

  pre.preCode-box-hide {
    height: 420px;
    overflow-y: hidden;
  }
  pre .preCode-box-btn {
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 2px;
    z-index: 10;
  }

  pre.preCode-box-hide .preCode-box-btn {
    bottom: 0;
    padding-top: 78px;
    background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0)), to(#fff));
    background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
  }

  pre.preCode-box .preCode-box-btn span {
    position: relative;
    transform: rotate(180deg);
    display: block;
    margin: auto;
    width: 44px;
    height: 22px;
    overflow: hidden;
    color: var(--color-fg-default);
    background: var(--color-border-default);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding-top: 6px;
    text-align: center;
    cursor: pointer;
  }

  pre.preCode-box-hide .preCode-box-btn span {
    transform: rotate(0deg);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  pre.preCode-box .preCode-box-btn span em {
    animation: preCodeBtnBounce 0.55s cubic-bezier(0.05, 0, 0.2, 1) infinite alternate;
    display: inline-block;
    transform: translate3d(0, 0, 0);
    margin-top: 0.3rem;
    font: normal 500 0.8rem 'Varela Round', sans-serif;
  }
}

@keyframes preCodeBtnBounce {
  0% {
    transform: translate3d(0, 0, 0);
    // text-shadow: var(--color-fg-default) 0 0 0.05em;
  }
  100% {
    transform: translate3d(0, -1em, 0);
    // text-shadow: var(--color-fg-default) 0 1em 0.5em;
  }
}

@media (prefers-color-scheme: dark) {
  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #7f99c7;
    background: none;
  }
  .markdown-box pre.preCode-box-hide .preCode-box-btn {
    background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0)), to(#000));
    background-image: linear-gradient(-180deg, rgba(0, 0, 0, 0) 0%, #000 100%);
  }
}
</style>
