// test plugin
export default function TestPlugin() {
  return {
    name: 'plugin name',
    // #region build hook
    /**
     * hook类型
     * async: 异步，返回Promise
     * first: 这类hook会按顺序在各个实现此类hook的插件中执行，直到某一个插件中的此类hook执行后返回有效值(非null和非undefined)
     * sequential: 按plugin的书写顺序调用，如果前一个hook是sequential异步，则下一个插件同类型的相同hook等待上一个异步sequential hook resolved后再执行
     * parallel: 按plugin的书写顺序调用，如果前一个hook是parallel异步，则下一个插件同类型的相同hook`不会`等待上一个异步parallel hook resolved后再执行
     */

    /**
     * 完成构建或构建出错后调用
     */
    buildEnd(error) {
      console.log('buildEnd', error)
    },
    /**
     * 在每次rollup.rollup执行时调用，在此可以访问经过处理后最终要在构建时使用的options
     */
    buildStart(inputOptions) {
      console.log('buildStart', inputOptions)
    },
    /**
     * https://rollupjs.org/guide/en/#closewatcher
     */
    closeWatcher() {
      console.log('closeWatcher')
    },
    /**
     * build出错时，在buildEnd后调用，或在bundle.close()后调用
     */
    closeBundle() {
      /*  */
    },
    /**
     * 可返回模块内容，或指定一些ast、map、treeshake、meta额外参数
     * @param {*} id
     * @returns string
     * | null
     * | {
     *      code: string,
     *      map?: string | SourceMap,
     *      ast? : ESTree.Program,
     *      moduleSideEffects?: boolean | "no-treeshake" | null,
     *      syntheticNamedExports?: boolean | string | null,
     *      meta?: {[plugin: string]: any} | null} // 浅合并 a={...a,...b}
     *   }
     */
    load(id) {
      console.log('load', id)
      return `export default "this is ${id}"`
    },
    /**
     * 当模块内的引入模块都解析完成后调用，可以获取正确的引用模块信息
     * Note however that information about importing modules may be incomplete as additional importers could be discovered later. If you need this information, use the buildEnd hook.
     * @param {*} moduleInfo
     */
    moduleParsed(moduleInfo) {
      console.log('moduleInfo', moduleInfo)
    },
    /**
     * 修改传入的inputOptions内容，return null不做任何替换
     * return的options怎么合并还是直接使用？？？
     * @param {*} inputOptions
     * @returns
     */
    options(inputOptions) {
      console.log('options', inputOptions)
      return inputOptions
    },
    /**
     * 动态引入
     * 返回false标记为external，不做处理
     *
     * 当specifier为string时：
     *  返回string表示已存在的模块id
     *  返回null，相当与跳过此插件的resolveDynamicImport hook
     *
     * 当specifier为ESTree.Node时：
     *  返回null，当所有插件的此hook都返回null时，此import标记为external
     *  返回string时，会替换importer ？？？
     *
     * 返回对象时，通过对象的方式指定import的模块和是否external
     *
     * @param {string | ESTree.Node} specifier
     * @param {string} importer
     * @returns string | false | null | {id: string, external?: boolean}
     */
    resolveDynamicImport(specifier, importer) {
      console.log('resolveDynamicImport', specifier, importer)
      return null
    },
    /**
     *
     * @param {string} source
     * @param {string | undefined} importer
     * @param {{isEntry: boolean, custom?: {[plugin: string]: any}} options
     * @returns string
     * | false
     * | null
     * | {
     *  id: string,
     *  external?: boolean | "relative" | "absolute",
     *  moduleSideEffects?: boolean | "no-treeshake" | null,
     *  syntheticNamedExports?: boolean | string | null,
     *  meta?: {[plugin: string]: any} | null
     * }
     */
    resolveId(source, importer, options) {
      console.log('resolveId', source, importer, options)
    },
    /**
     * @param {{
     *  id: string,
     *  code: string,
     *  ast: ESTree.Program,
     *  meta: {[plugin: string]: any},
     *  moduleSideEffects: boolean | "no-treeshake",
     *  syntheticNamedExports: string | boolean
     * }} moduleInfo
     * @returns
     */
    shouldTransformCachedModule(moduleInfo) {
      console.log('shouldTransformCachedModule', moduleInfo)
      return null
    },
    transform() {

    },
    watchChange() {},
    // #endregion build hook
  }
}
