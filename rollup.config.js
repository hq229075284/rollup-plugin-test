// import rollup from 'rollup'
import path from 'path'
import myPlugin from './plugins/test'

export default {
  input: path.resolve(__dirname, './src/index.js'),
  plugins: [myPlugin()],
  output: [
    {
      file: 'bundle.js',
      format: 'es',
    },
  ],
}
