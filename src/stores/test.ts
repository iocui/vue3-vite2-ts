export const useTestStore = defineStore('testStore', {
  //初始化
  state: () => {
    const count = 0;
    return { count, name: 'test' };
  },
  //方法
  actions: {
    setName() {
      this.name = this.count > 2 ? 'test变化' : 'test';
    },
    inc() {
      this.count++;
      this.setName();
    },
    cut() {
      this.count > 0 && this.count--;
      this.setName();
    },
    zero() {
      this.count = 0;
    },
    getCount() {
      return this.count;
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
    doublePlusOne(): number {
      return this.doubleCount + 1;
    }
  },
  // 开启数据缓存 see https://seb-l.github.io/pinia-plugin-persist/advanced/strategies.html
  persist: {
    enabled: true,
    strategies: [
      {
        paths: ['count']
      }
    ]
  }
});
