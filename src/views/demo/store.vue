<script setup>
const testStore = useTestStore();

//解构赋值不具响应式特性
const { count } = testStore;

//解构赋值具有响应式特性
const { count: counts } = storeToRefs(testStore);

//赋值具有响应式特性
const doubleCount = computed(() => testStore.count);

//同时变更多个值
const setAll = () => {
  testStore.$patch({
    count: 500,
    name: 'admin'
  });
};

// 监听执行的方法
testStore.$onAction(({ name, store, args, after, onError }) => {
  console.log('执行方法', name, store, args);
  after(() => {
    //这里可以执行一些操作
  });
  //onError钩子类似一个错误级中间件，当函数抛出promise的失败状态就会调用
  onError(error => {
    console.log(error);
  });
});

// 订阅 state 的改变
const _subscribe = testStore.$subscribe(
  (mutation, state) => {
    // 我们就可以在此处监听store中值的变化，当变化为某个值的时候，去做一些业务操作之类的
    console.log('监听变化', mutation, JSON.stringify(state));
    state.name = state.count > 500 ? 'admin变化' : state.name;
  },
  // 第二个参数options对象，是各种配置参数
  // detached:布尔值，默认是 false，正常情况下，当订阅所在的组件被卸载时，订阅将被停止删除，
  // 如果设置 detached 值为 true 时，即使所在组件被卸载，订阅依然在生效
  // 参数还有 immediate / deep / flush 等等参数 和vue3 watch的参数是一样的，详细看文档
  // see https://pinia.vuejs.org/core-concepts/state.html#subscribing-to-the-state
  { detached: false }
);

// 调用上方声明的变量值，即可以停止订阅
// _subscribe()
</script>

<template>
  <div style="text-align: center" class="mt-10">
    <h1 class="mb-4">值不具记亿，刷新复位：{{ testStore.name }}</h1>
    <hr class="m-6" />
    以下具有记忆功能，刷新保持
    <div class="mt-5">不具响应式：{{ count }}</div>
    <div class="mt-5">具有响应式：{{ counts }}</div>
    <div class="mb-5">具有响应式：{{ doubleCount }}</div>
    <div>倍进调用一次：{{ testStore.doubleCount }}</div>
    <div class="mb-5">倍进调用二次(模拟复用)：{{ testStore.doubleCount }}</div>
    <div>倍进加一调用一次：{{ testStore.doublePlusOne }}</div>
    <div class="mb-5">倍进加一调用二次(模拟复用)：{{ testStore.doublePlusOne }}</div>
    <hr class="m-4" />
    <button @click="testStore.inc()">+递增</button>
    <input type="text" style="text-align: center" readonly :value="testStore.count" />
    <button @click="testStore.cut()">递减-</button>
    <div class="m-5">
      <button @click="testStore.$reset()">重置</button>
      |
      <button @click="testStore.zero()">归零</button>
      |
      <button @click="setAll()">同时改</button>
      |
      <button type="button" @click="$router.go(0)">刷新</button>
    </div>
  </div>
</template>
