'use strict';

/**
 * 重写方法使其可以获取到 @vueuse/core 的所有函数，写入到 auto-imports.d.ts 中, 目的是为了兼容 nodejs 12.x
 */
var _fs = require('fs');
var _path = require('path');
var _cache;
var vueuse_core_default = () => {
  const excluded = ['toRefs', 'utils'];
  if (!_cache) {
    let indexesJson;
    try {
      indexesJson = require('@vueuse/metadata');
      if (!indexesJson) {
        const path = _path.resolve(process.cwd(), 'node_modules', '@vueuse/metadata/index.json');
        indexesJson = JSON.parse(_fs.readFileSync.call(void 0, path, 'utf-8'));
      }
    } catch (error) {
      console.error(error);
      throw new Error('[auto-import] failed to load @vueuse/core, have you installed it?');
    }
    if (indexesJson) {
      _cache = {
        '@vueuse/core': indexesJson.functions
          .filter(i => ['core', 'shared'].includes(i.package))
          .flatMap(i => [i.name, ...(i.alias || [])])
          .filter(i => i && i.length >= 4 && !excluded.includes(i))
      };
    }
  }
  return _cache || {};
};

module.exports = vueuse_core_default;
