import ServerManager from '~/services/ServerManager';
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
            console.log(userId)
        }
    }
})