export default defineNuxtRouteMiddleware((to, from) => {
    const isLoggedIn = false;

    if(!isLoggedIn && to.path !== '/login' && to.path !== '/register') {
        return navigateTo('/login')
    }
})