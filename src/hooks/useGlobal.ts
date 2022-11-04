import type { ComponentInternalInstance } from 'vue';
import { getCurrentInstance } from 'vue';
export default () => {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  const proxy = appContext.config.globalProperties;
  return { proxy };
};
