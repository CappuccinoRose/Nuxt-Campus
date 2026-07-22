/**
 * app.config.ts —— 响应式应用配置
 * 可通过 useAppConfig() 在组件中读取，支持热更新
 * 与 runtimeConfig 的区别：这里适合放「主题、功能开关」等非敏感配置
 */
export default defineAppConfig({
  theme: {
    primary: '#0f766e',
    accent: '#ea580c',
    surface: '#f0fdfa',
  },
  features: {
    enableFavorites: true,
    enablePublish: true,
    maxUploadHint: '学习项目使用本地 mock，无需实际上传文件',
  },
})
