!(function () {
  var loadingbox = document.createElement('div');
  loadingbox.className = 'loading-wrap';
  loadingbox.innerHTML = '<div class="loading-wrap-dot"></div><div class="loading-wrap-rate"></div>';
  document.body.appendChild(loadingbox);

  var IEHtml = '<div style="padding:10px">你正在使用的浏览器版本过低，无法浏览和使用!<br>The browser version you are using is too low to browse and use!<div>';
  var setBrowserHtml = function () {
    loadingbox.parentNode.removeChild(loadingbox);
    document.getElementById('app').innerHTML = IEHtml;
    document.getElementById('app').id = '';
  };

  var userAgent = (window.navigator.userAgent || 'window msie').toLowerCase();
  var isIE11 = userAgent.indexOf('trident') > -1 && userAgent.indexOf('rv:11.0');
  if (userAgent.indexOf('msie') >= 1 || isIE11) {
    setBrowserHtml();
  } else {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML =
      'html,body{overflow:hidden;}.loading-wrap{align-items:center;display:flex;position:fixed;user-select:none;justify-content:center;left:0;right:0;top:0;bottom:0;background:white;z-index:2147483647;width:100%;height:100%;font-size:12px;line-height:12px;}.loading-wrap-dot,.loading-wrap-dot::before,.loading-wrap-dot::after{width:10px;height:10px;border-radius:5px;background-color:#ffe799;color:#ffe799;animation:loading-wrap-dot-flashing 1s infinite linear alternate;}.loading-wrap-dot{position:relative;animation-delay:0.5s;top:0;left:0;}.loading-wrap-dot::before,.loading-wrap-dot::after{position:absolute;content:"";display:inline-block;top:0;}.loading-wrap-dot::before{left:-15px;animation-delay:0s;}.loading-wrap-dot::after{left:15px;animation-delay:1s;}.loading-wrap-rate{color:#ffc400;margin-left:20px;}@keyframes loading-wrap-dot-flashing{0%{background-color:#ffe799;}50%,100%{background-color:#ffc400;}}';
    loadingbox.appendChild(style);

    var loading = (function (loadingbox) {
      var ratebox = loadingbox.getElementsByClassName('loading-wrap-rate'),
        idx = -24,
        time = 500,
        timer;
      if (!ratebox.length)
        return {
          remove: function () {
            loadingbox.parentNode.removeChild(loadingbox);
          }
        };
      var desc = ratebox[0];
      desc.setValue = function (n) {
        this.innerHTML = n.toFixed(0) + '%';
      };
      void (function () {
        desc.setValue((idx += (100 - idx) * 0.2));
        timer = setTimeout(arguments.callee, (time += 100));
      })();
      return {
        remove: function () {
          clearTimeout(timer);
          desc.setValue(100);
          if (window.jQuery) {
            window.jQuery(loadingbox).fadeOut(300, function () {
              loadingbox.parentNode.removeChild(loadingbox);
            });
          } else {
            setTimeout(function () {
              loadingbox.parentNode.removeChild(loadingbox);
            }, 200);
          }
        }
      };
    })(loadingbox);

    window.addEventListener(
      'load',
      function () {
        if (!window.__VUE__) {
          setBrowserHtml();
        } else {
          loading.remove();
        }
      },
      false
    );
  }
})();
