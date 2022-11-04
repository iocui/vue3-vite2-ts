/** 使用 jsx 写法封装 iconfont */
const customCache = new Set();

function isValidCustomScriptUrl(scriptUrl) {
  return typeof scriptUrl === 'string' && scriptUrl.length && !customCache.has(scriptUrl);
}

function createScriptUrlElements(scriptUrls) {
  const index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  const currentScriptUrl = scriptUrls[index];
  if (!currentScriptUrl) return;

  if (isValidCustomScriptUrl(currentScriptUrl)) {
    let script = null;
    if (/\.js$/.test(currentScriptUrl)) {
      script = document.createElement('script');
      script.setAttribute('src', currentScriptUrl);
      script.setAttribute('data-namespace', currentScriptUrl);
    } else {
      script = document.createElement('link');
      script.setAttribute('rel', 'stylesheet');
      script.setAttribute('href', currentScriptUrl);
      script.setAttribute('data-namespace', currentScriptUrl);
    }

    if (scriptUrls.length > index + 1) {
      script.onload = function () {
        createScriptUrlElements(scriptUrls, index + 1);
      };

      script.onerror = function () {
        createScriptUrlElements(scriptUrls, index + 1);
      };
    }

    customCache.add(currentScriptUrl);
    document.body.appendChild(script);
  }
}

export const createIconfont = options => {
  const linkUrl = options.linkUrl;
  const scriptUrl = options.scriptUrl;
  return {
    name: 'font-component',
    props: ['name', 'type'],
    render: function () {
      if (this.type === 'font') {
        if (Array.isArray(linkUrl)) {
          createScriptUrlElements(linkUrl.reverse());
        } else {
          createScriptUrlElements([linkUrl]);
        }
      }
      if (this.type === 'svg') {
        if (Array.isArray(scriptUrl)) {
          createScriptUrlElements(scriptUrl.reverse());
        } else {
          createScriptUrlElements([scriptUrl]);
        }
      }

      if (this.type == 'svg') {
        return (
          <svg class="svgicon" aria-hidden="true">
            <use href={'#' + this.name}></use>
          </svg>
        );
      }
      return <i class={['iconfont', this.name]}></i>;
    }
  };
};

export default options => {
  return createIconfont(options);
};
