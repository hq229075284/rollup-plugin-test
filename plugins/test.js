// test plugin
export default function TestPlugin() {
  return {
    name: 'plugin name',
    resolveId(source) {
      console.log(source)
    },
    load(id) {
      console.log(id)
      return `export default "this is ${id}"`
    },
    // #region build hook
    async() {
      return Promise.resolve()
    },
    // 之前的`first` build hook没有返回过有效值(非null和非undefined)时，`first`会被调用
    first() {
      /*  */
    },
    /**
     * 按plugin的书写顺序调用，
     * 如果前一个sequential是异步hook，则下一个sequential hook会等待上一个异步sequential hook resolved后再执行
     */
    sequential() {
      /*  */
    },
    /**
     * 按plugin的书写顺序调用，
     * 如果前一个parallel是异步hook，则下一个parallel hook不会等待上一个异步parallel hook resolved后再执行
     */
    parallel() {
      /*  */
    },
    // #endregion build hook
  }
}
