/**
 * 功能：通过鼠标按住在页面可视区域内任意拖拽元素
 *
 * Demo: <div v-draggable>拖动</div>
 */

import type { Directive } from 'vue';

interface ElType extends HTMLElement {
  parentNode: HTMLElement;
}

export const draggable: Directive = {
  mounted: function (el: ElType) {
    el.style.cursor = 'move';
    el.style.position = 'absolute';
    el.onmousedown = function (e) {
      const disX = e.pageX - el.offsetLeft;
      const disY = e.pageY - el.offsetTop;
      el.parentNode.setAttribute('unselectable', 'on');
      el.parentNode.setAttribute('onselectstart', 'return false;');
      document.onmousemove = function (e) {
        let x = e.pageX - disX;
        let y = e.pageY - disY;
        const maxX = parseInt(window.getComputedStyle(el.parentNode).width) - parseInt(window.getComputedStyle(el).width);
        const maxY = parseInt(window.getComputedStyle(el.parentNode).height) - parseInt(window.getComputedStyle(el).height);
        if (x < 0) {
          x = 0;
        } else if (x > maxX) {
          x = maxX;
        }

        if (y < 0) {
          y = 0;
        } else if (y > maxY) {
          y = maxY;
        }
        el.style.left = x + 'px';
        el.style.top = y + 'px';
      };
      document.onmouseup = function () {
        el.parentNode.removeAttribute('unselectable');
        el.parentNode.removeAttribute('onselectstart');
        document.onmousemove = document.onmouseup = null;
      };
    };
  }
};
