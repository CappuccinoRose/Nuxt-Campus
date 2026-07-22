/**
 * 全局中间件：每次路由切换都会执行
 * 文件名带 .global.ts 即为全局中间件
 */
export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) {
    // 仅服务端打印，避免客户端控制台噪音
    console.log(`[route] ${from.path} -> ${to.path}`)
  }
})
