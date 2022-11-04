/** 应用基础配置 */
const BASE_URL = import.meta.env.VITE_APP_BASE_URL || '/';
export default {
  /** 语言缓存KEY名 */
  localeStorageKey: 'app-locale',
  /** 阿里图标库 */
  iconFont: {
    /** font-class 字体格式图标 */
    linkUrl: [BASE_URL + 'assets/iconfont/iconfont.css', '//at.alicdn.com/t/font_180975_ue66sq60vyd.css'],
    /** Symbol Svg格式图标 */
    scriptUrl: [BASE_URL + 'assets/iconfont/iconfont.js', '//at.alicdn.com/t/font_180975_ue66sq60vyd.js']
  }
  // 更多应用基础配置....
};
