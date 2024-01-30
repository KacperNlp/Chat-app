import ServerManager from '~/services/ServerManager';
import UserManager from '@/services/UserManager';
import type { StoreState } from '@/types/types';

export const useWebsiteStore = defineStore('websiteStore', {
    state: (): StoreState => ({
        channels: [],
        loggedUser: {
            username: '',
            email: '',
            role: ''
        },
    }),

    actions: {
        async fetchChannelsList() {
            const { data } = await ServerManager.getChannelsList();
            this.channels = data;
        },

        async fetchLoggedUserData(userId: string) {
            const { data } = await UserManager.getUserProfileInfo(userId);
            this.loggedUser = data;
        }
    }
})