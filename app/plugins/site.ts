/**
 * 通用插件：注入站点信息（服务端 + 客户端都会执行）
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const appConfig = useAppConfig()

  return {
    provide: {
      site: {
        name: config.public.appName as string,
        campus: config.public.campusName as string,
        themePrimary: appConfig.theme.primary,
      },
    },
  }
})
