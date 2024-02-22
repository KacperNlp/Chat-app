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
            },
            user: {
                dashboard: 'Ustawienia konta',
                nick: 'Nazwa użytkownika:',
                role: 'Rola:'
            },
            home: {
                title: 'Musisz wybrać kanał',
                form: {
                    name: 'Nazwa kanału',
                    color: 'Wybierz kolor kanału',
                    users: 'Dodaj użytkowników do kanału',
                    btn: 'Stwórz kanał!'
                },
                channel: {
                    btnSettings: 'Ustawienia kanału',
                    btn: 'Wejdź do chatu'
                }
            }
        },
        en: {
            footer: 'Chat App',
            logout: 'Logout',
            nav: {
                dashboard: 'Dashboard',
                users: 'Users'
            },
            user: {
                dashboard: 'Account settings',
                nick: 'Nickname:',
                role: 'Role:'
            },
            home: {
                title: 'You have to choose channel',
                form: {
                    name: 'Channel name',
                    color: 'Pick the color of channel',
                    users: 'Add users to channel',
                    btn: 'Create channel!'
                },
                channel: {
                    btnSettings: 'Channel settings',
                    btn: 'Open the chat'
                }
            }
        }
    }
  }))