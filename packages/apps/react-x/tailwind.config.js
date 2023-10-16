/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{tsx, ts, jsx, js}"
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false  // 禁用 tailwindcss 的基础样式，否则会导致 markdown 的样式被覆盖，需要重新设置
  },
  plugins: [],
}

