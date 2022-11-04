// [生产环境资源压缩，结合nginx gzip部署访问丝滑无比](https://github.com/alloc/vite-plugin-compress)
import viteCompression from 'vite-plugin-compression';

export default (options: viteUserOptions) => {
  if (options.envs?.VITE_APP_BUILD_ZIP && options.isBuild && options.mode == 'production') {
    return viteCompression();
  }
  return false;
};
