// =====================================================================================
// 二次封装 unplugin-icons 使用iconify图标库组件, 按需引用图标集
// 此图标模块支持使用以下图标库所有图标，且均按需编译，优先使用离线图标，不存在自动从线上获取
// -------------------------------------------------------------------------------------
// Icônes图标库: https://icones.js.org/collection/all
// iconify图标库: https://icon-sets.iconify.design/
// 其它免费可商用图标库: http://www.remixicon.cn/ or http://www.remixicon.com/
// -------------------------------------------------------------------------------------
// 官网 https://iconify.design/
// 包库 https://www.npmjs.com/package/unplugin-icons
// 作者：https://antfu.me/ vite核心团队成员
// =====================================================================================
import fs from 'fs';
import path from 'path';
import http from 'http';
import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import { version as vueVersion } from 'vue/package.json';

import { iconToSVG } from '@iconify/utils/lib/svg/build';
import { defaults } from '@iconify/utils/lib/customisations';
import { getIconData } from '@iconify/utils/lib/icon-set/get-icon';

import collections from './collections';

//node开发环境下远程请求封装
function HttpRequest(options: http.RequestOptions, callback?: (text: string) => void) {
  let content = ''; //存放请求后的数据
  const req = http.request(options, function (res: http.IncomingMessage) {
    res.setEncoding('utf-8'); //设置响应字符集
    const resTimeout = setTimeout(() => {
      res.destroy(); //结束响应
      content = '';
      callback && callback(content);
    }, 10000); //10s后没有响应信息结束响应，并返回空数据
    res
      .on('data', function (chuck) {
        //响应返回数据，并追加内容
        if (chuck) content += chuck;
      })
      .on('end', function () {
        //数据返回完毕
        clearTimeout(resTimeout);
        callback && callback(content);
      });
  });
  req.on('error', function (e: Error) {
    //响应出错调用函数
    console.log('Request error: ', options.path, e.message);
    callback && callback('');
  });
  req.write(''); //发送请求
  req.end(); //结束请求
}

export default (options: viteUserOptions) => {
  const scale = 1.2; //默认大小，单位em
  const localPath = path.resolve(options.path.root, './src/assets/icons/'); //本地自定义图标存放目录
  const modulesPath = options.path.modules; //node_modules目录

  const kolorist = require('kolorist');
  const isLegacyExists = require('local-pkg').isPackageExists.call(void 0, '@iconify/json');
  const warnOnce = (msg: string) => console.warn(kolorist.yellow.call(void 0, `[unplugin-icons-svg] ${msg}`));

  //生成多层文件夹
  const mkdirsSync = (dirname: string) => {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
    return false;
  };

  const NotFound =
    '<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--codicon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.5 1a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13zm0 12a5.5 5.5 0 1 1 0-11a5.5 5.5 0 0 1 0 11zm1.55-8.42a1.84 1.84 0 0 0-.61-.42A2.25 2.25 0 0 0 7.53 4a2.16 2.16 0 0 0-.88.17c-.239.1-.45.254-.62.45a1.89 1.89 0 0 0-.38.62a3 3 0 0 0-.15.72h1.23a.84.84 0 0 1 .506-.741a.72.72 0 0 1 .304-.049a.86.86 0 0 1 .27 0a.64.64 0 0 1 .22.14a.6.6 0 0 1 .16.22a.73.73 0 0 1 .06.3c0 .173-.037.343-.11.5a2.4 2.4 0 0 1-.27.46l-.35.42c-.12.13-.24.27-.35.41a2.33 2.33 0 0 0-.27.45a1.18 1.18 0 0 0-.1.5v.66H8v-.49a.94.94 0 0 1 .11-.42a3.09 3.09 0 0 1 .28-.41l.36-.44a4.29 4.29 0 0 0 .36-.48a2.59 2.59 0 0 0 .28-.55a1.91 1.91 0 0 0 .11-.64a2.18 2.18 0 0 0-.1-.67a1.52 1.52 0 0 0-.35-.55zM6.8 9.83h1.17V11H6.8V9.83z" clip-rule="evenodd"></path></svg>';

  return [
    Icons({
      scale,
      compiler: parseInt(vueVersion) < 3 ? 'vue2' : 'vue3', //plain SVG content for vue2 or vue3
      iconSource: 'auto', //图标使用现代集还是历史集，默认自动
      autoInstall: !isLegacyExists, //不存在的图标集是否允许自动安装到本地
      defaultClass: 'svgicon', //svg标签默认样式
      webComponents: {
        iconPrefix: 'Icons' //图标标签别名前缀
      },
      customCollections: {
        // 自定义自动获取本地和线上图标集
        svg: async iconName => {
          iconName = iconName
            .replace(/([a-z])(\d+)/g, '$1-$2')
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .toLowerCase();
          iconName = iconName.replace(':', '-');

          // 本地自定义图标，存放于 ./src/assets/icons/svg 目录下, 修改了图标需重启vite方生效
          const customs = FileSystemIconLoader(localPath);
          const customIcon = await customs(iconName);
          if (customIcon) return customIcon.replace(/^<svg /, '<svg fill="currentColor" ');

          // 从本地 iconify/json 库或线上库获取千万数量图标(缓存级)
          return await new Promise(resolve => {
            const collection =
              collections.find(i => {
                return iconName.startsWith(`${i}-`);
              }) ||
              collections.find(i => {
                return iconName.startsWith(i);
              });

            if (!collection) return resolve(NotFound);
            const icons = iconName.replace(collection + '-', '');

            const cacheFile = path.resolve(modulesPath, `./.cache/icons-svg/${collection}/${icons}.svg`);
            if (!mkdirsSync(path.dirname(cacheFile))) {
              throw new Error(`icons cache path not found`);
            }

            if (fs.existsSync(cacheFile)) {
              return resolve(fs.readFileSync(cacheFile, 'utf-8'));
            }

            // 本地 iconify/json 库(缓存级)
            const jsonPath = isLegacyExists ? require('@iconify/json').locate(collection) : null;
            if (jsonPath) {
              const iconsJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
              if ('icons' in iconsJson && iconsJson.icons[icons]) {
                const iconData = getIconData(iconsJson, icons, true);
                if (iconData) {
                  const renderData = iconToSVG(iconData, {
                    ...defaults,
                    height: `${scale}em`,
                    width: `${scale}em`
                  });

                  const svgAttributes: Record<string, string> = {
                    // xmlns: 'http://www.w3.org/2000/svg',
                    // 'xmlns:xlink': 'http://www.w3.org/1999/xlink',
                    ...renderData.attributes
                  };
                  const svgAttributesStr = Object.keys(svgAttributes)
                    .map(attr => `${attr}="${svgAttributes[attr as keyof typeof svgAttributes]}"`)
                    .join(' ');

                  // Generate SVG
                  const svg = `<svg ${svgAttributesStr}>${renderData.body}</svg>`;
                  fs.writeFileSync(cacheFile, svg);
                  return resolve(svg);
                }
              }
            }

            //const fallBackAPISources = ['https://api.simplesvg.com', 'https://api.unisvg.com', 'https://api.iconify.design'];
            const fallBackAPISources = ['https://api.iconify.design']; //官方URL已变更，现仅使用官方最新URL
            const apiUrl = fallBackAPISources[Math.floor(Math.random() * fallBackAPISources.length)];
            const iconUrl = `${apiUrl}/${collection}:${icons}.svg`;

            HttpRequest(
              {
                hostname: 'api.iconify.design',
                port: 80,
                path: iconUrl,
                method: 'GET',
                headers: {
                  //请求头信息
                  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                  'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36'
                }
              },
              data => {
                if (data.startsWith('<svg ')) {
                  const regStyle = /style\s*?=\s*?(['"])[\s\S]*?\1/;
                  const regClass = /class\s*?=\s*?(['"])[\s\S]*?\1/;
                  data = data
                    .replace(/^<svg /, '<svg fill="currentColor" ')
                    .replace(regStyle, '')
                    .replace(regClass, '');
                  fs.writeFileSync(cacheFile, data);
                  resolve(data);
                } else {
                  warnOnce(`[icons] Icon not found: ${iconUrl}`);
                  resolve(NotFound);
                }
              }
            );
          });
        }
      }
    })
  ];
};
