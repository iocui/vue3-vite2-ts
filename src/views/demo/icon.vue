<script setup lang="tsx">
//一个动态菜单
const iconComponent = useIcons('icon-person', 'svg');

//模拟后端动态菜单
const menuData = [
  {
    label: '且听风吟',
    icon: 'icon-pailietubiao-32'
  },
  {
    label: '寻羊冒险记',
    icon: 'icon-erweima'
  }
];

//临时使用jsx语法写一个菜单列表树
const nodes: any = [];
menuData.forEach(data => {
  const icon = useIcons(data.icon);
  const node = (
    <span>
      {icon} {data.label}
    </span>
  );
  nodes.push(node);
});
</script>
<template>
  <div style="color: green; font-size: 1.2em" class="p-10">
    本地静态化iconify:
    <icons-svg-github />

    <hr />
    线上静态化iconify:
    <icons-svg-mdi-github />
    <icons-svg-mdi-access-point />

    <hr />
    iconfont 阿里Symbol格式svg图标:
    <icons-font name="icon-pailietubiao-32" type="svg" />
    <icons-font name="icon-erweima" type="svg" />

    <hr />
    iconfont 阿里font-class格式font图标:
    <icons-font name="icon-pailietubiao-32" />
    <icons-font name="icon-erweima" />

    <hr />
    iconfont 阿里图标重新着色示例:
    <span style="font-size: 38px">
      <icons-font name="icon-person" type="font" style="color: red" />
      <icons-font name="icon-person" type="svg" style="color: red" />
      <icons-font name="icon-gengduogongneng" type="font" style="color: red" />
      <icons-font name="icon-gengduogongneng" type="svg" style="color: red" />
    </span>

    <hr class="mt-4 mb-2" />
    动态化图标示例:
    <component :is="iconComponent" />
    <ul style="font-size: 16px; color: blue">
      <li v-for="node in nodes"><component :is="node" /></li>
    </ul>
  </div>
</template>
