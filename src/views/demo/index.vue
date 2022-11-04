<script setup>
import { chunk } from 'lodash';

const { x, y } = useMouse();
</script>

<template>
  <div class="text-center mt-30 mb-30">
    捕捉鼠标位置
    <div>x坐标 {{ x }} y坐标 {{ y }}</div>
    {{ chunk(['a', 'b', 'c', 'd'], 2) }}
  </div>
</template>
