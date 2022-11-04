/**
 * Debug插件，用于调试Vue组件在浏览器控制台打印日志，不影响生产环境
 * 给 import.meta.env 增加 DEBUG 属性，以便在其他Vue插件中使用调试
 */

import type { UserConfig, ConfigEnv, Plugin } from 'vite';

export default (options: viteUserOptions) => {
  const viteDebugPlugin = (): Plugin => {
    return {
      name: 'vite:debug-env',
      config(config: UserConfig, env: ConfigEnv) {
        if (env) {
          //bug:修复无法识别debug参数来自 env 配置 或 vite --debug 命令
          const DEBUG: string = (process.env.DEBUG as unknown as string) || 'false';
          const defineMap = { 'import.meta.env.DEBUG': DEBUG == 'true' } as Record<string, any>;
          const envPrefix = Array.isArray(config.envPrefix) ? config.envPrefix : [config.envPrefix || 'VITE_'];
          const pattern = new RegExp(`^${envPrefix.join('|')}`, 'i');
          Object.keys(process.env).forEach(key => {
            if (pattern.test(key)) {
              let realName = (process.env[key] as any).replace(/\\n/g, '\n');
              if (['true', 'false'].includes(realName.toLowerCase())) {
                defineMap[`import.meta.env.${key}`] = JSON.parse(realName.toLowerCase());
              } else {
                if (/^[0-9]*$/.test(realName)) {
                  defineMap[`import.meta.env.${key}`] = Number(realName);
                } else {
                  defineMap[`import.meta.env.${key}`] = JSON.stringify(realName);
                }
              }
            }
          });
          return {
            define: defineMap
          };
        }
        return;
      }
    };
  };
  return viteDebugPlugin();
};
