/**
 * =========================================================================
 * 扩展插件作用：替换入口 index.html 文件内容
 * =========================================================================
 */

export default (options: viteUserOptions) => {
  const htmlPlugin = () => {
    return {
      name: 'vite-plugin-html:transform',
      transformIndexHtml(html: string) {
        const BASE_URL = options.envs.VITE_APP_BASE_URL || '/';
        html = html.replace(/<title>(.*?)<\/title>/, `<title>${options.envs.VITE_APP_TITLE}</title>`);

        const bodyScript =
          `<script src="${BASE_URL}assets/js/browser.js"></script>\r\n` +
          `<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js"></script>\r\n` +
          //`<script src="${BASE_URL}assets/js/jquery.min.js?v=3.6.0"></script>\r\n` +
          //`<script src="${BASE_URL}assets/js/require.min.js"></script>\r\n` +
          `</body>`;

        return html.replace(/<\/body>/, bodyScript);
      }
    };
  };

  return htmlPlugin();
};
