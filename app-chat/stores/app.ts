import ServerManager from '~/services/ServerManager';
import UserManager from '@/services/UserManager';
import UsersManager from '~/services/UsersManager';
import type { StoreState } from '@/types/types';

export const useWebsiteStore = defineStore('websiteStore', {
    state: (): StoreState => ({
        channels: [],
        loggedUser: {
            username: '',
            email: '',
            role: '',
            id: ''
        },
        users: []
    }),

    actions: {
        async fetchChannelsList(userId: string) {
            const { data } = await ServerManager.getChannelsList(userId);
            this.channels = data;
        },

        async fetchLoggedUserData(userId: string) {
            const { data } = await UserManager.getUserProfileInfo(userId);
            this.loggedUser = data;
        },

        async fetchAllUsers() {
            const { data } = await UsersManager.getAllUsers();
            this.users = data;
        }
    }
})