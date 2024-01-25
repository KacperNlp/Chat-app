export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token');
    const userId = useCookie('userId');

    if(!token.value && !userId.value && to.path !== '/login' && to.path !== '/register') {
        return navigateTo('/login')
    }
})