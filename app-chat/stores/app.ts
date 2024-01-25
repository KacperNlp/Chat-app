import ServerManager from '~/services/ServerManager';
import UserManager from '@/services/UserManager';
import type { StoreState } from '@/types/types';

export const useWebsiteStore = defineStore('websiteStore', {
    state: (): StoreState => ({
        tasks: [],
        loggedUser: {},
    }),

    actions: {
        async fetchTasks() {
            const { data } = await ServerManager.getTasksList();
            this.tasks = data;
        },

        async fetchLoggedUserData(userId: string) {
            const { data } = await UserManager.getUserProfileInfo(userId);
            console.log(data)
        }
    }
})