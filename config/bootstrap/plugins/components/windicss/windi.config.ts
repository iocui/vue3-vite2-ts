/**
 * 配置 Windi CSS 工具 see https://cn.windicss.org/guide/configuration.html
 */
import type { FullConfig } from 'windicss/types/interfaces';
import { defineConfig } from 'windicss/helpers';

import plugin from 'windicss/plugin';

// import { transform } from 'windicss/helpers'

function range(size: number, startAt = 1) {
  return Array.from(Array(size).keys()).map(i => i + startAt);
}

export default defineConfig(<FullConfig>{
  darkMode: 'class', // 使用样式类切换黑暗模式
  preflight: {
    includeBase: true, //使用windicss基础样式
    includeGlobal: true //使用windicss全局样式, 不开启基础样式此项无意义
  },
  prefixer: true, //是否使用输入框placeholder文字颜色
  attributify: {
    prefix: 'css:' //开启元素属性模式前缀名
  },
  safelist: [
    // 动态示例 <div className={`p-${size}`}>Examples</div>
    range(3).map(i => `p-${i}`), // 动态支持 p-1 到 p-3
    range(10).map(i => `mt-${i}`) // 动态支持 mt-1 到 mt-10
  ],
  shortcuts: {
    // 全局组合原子类示例 <div class="mybtn mybtn-green">Examples</div>
    mybtn: 'py-2 px-4 font-semibold rounded-lg shadow-md',
    'mybtn-green': 'text-white bg-green-500 hover:bg-green-700'
  },
  theme: {
    extend: {
      screens: {
        //样式使用原生媒体查询"print:hidden"隐藏要打印的元素
        print: { raw: 'print' },
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      }
    }
  },

  plugins: [
    // =========================================================
    // 动效插件: Animate CSS 类
    // =========================================================
    //transform('@windicss/plugin-animations'),

    // =========================================================
    // 闪烁插件: 在样式类属性最后加上 @ask 将会红框闪烁提示定位元素
    // =========================================================
    plugin(({ addDynamic }) => {
      addDynamic(
        '@ask',
        ({ Utility, Style, Keyframes }) => {
          if (Utility.raw == '@ask') {
            return Keyframes.generate('windicss-ask', {
              '0%': {
                'box-shadow': 'inset 1px 1px rgb(236, 15, 170), inset -1px -1px rgb(236, 15, 170)'
              },
              '100%': {
                'box-shadow': 'inset 10px 10px rgba(236, 15, 170, 0.5), inset -10px -10px rgba(236, 15, 170, 0.5)'
              }
            }).concat(
              Style.generate(Utility.class, {
                '-webkit-animation': `windicss-ask 0.5s ease-in-out alternate infinite`,
                animation: `windicss-ask 0.5s ease-in-out alternate infinite`
              })
            );
          }
          return;
        },
        {
          layer: 'utilities',
          group: 'questions',
          completions: ['@ask']
        }
      );
    })
    // =========================================================
    // 自定义组件样式类
    // =========================================================
    // plugin(({ addComponents }) => {
    //     const buttons = {
    //         '.btn': {
    //             padding: '.5rem 1rem',
    //             borderRadius: '.25rem',
    //             fontWeight: '600',
    //         },
    //         '.btn-blue': {
    //             'backgroundColor': '#3490dc',
    //             'color': '#fff',
    //             '&:hover': {
    //                 backgroundColor: '#2779bd',
    //             },
    //         },
    //         '.btn-red': {
    //             'backgroundColor': '#e3342f',
    //             'color': '#fff',
    //             '&:hover': {
    //                 backgroundColor: '#cc1f1a',
    //             },
    //         },
    //     }
    //     addComponents(buttons)
    // }),
  ]
});
