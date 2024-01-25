export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'pl',
    messages: {
        pl: {
            footer: 'Chat App',
            logout: 'Wyloguj',
            nav: {
                dashboard: 'Panel Główny',
                users: 'Użytkownicy'
            }
        },
        en: {
            footer: 'Chat App',
            logout: 'Logout',
            nav: {
                dashboard: 'Dashboard',
                users: 'Users'
            }
        }
    }
  }))