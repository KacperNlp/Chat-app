import ServerManager from '~/services/ServerManager';
import UserManager from '@/services/UserManager';
import UsersManager from '~/services/UsersManager';
import type { StoreState, ChatMessage } from '@/types/types';

export const useWebsiteStore = defineStore('websiteStore', {
    state: (): StoreState => ({
        channels: [],
        loggedUser: {
            username: '',
            email: '',
            role: '',
            id: ''
        },
        users: [],
        searchValue: ''
    }),

    getters: {
        filteredChannels: ({ searchValue, channels }) => {
            channels.sort((channelA, channelB) => {
                if(!channelA.lastMessage && !channelB.lastMessage) 
                    return 0;

                if (!channelA.lastMessage) 
                    return 1

                if (!channelB.lastMessage) 
                    return -1

                return new Date(channelB.lastMessage.date).getTime() - new Date(channelA.lastMessage.date).getTime();
            })

            if(!searchValue) return channels;


            const channelsAfterFilters = channels.filter(channel => channel.name.includes(searchValue));
            return channelsAfterFilters;
        }
    },

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
        },

        updateSearchValue(newValue: string) {
            this.searchValue = newValue;
        },

        updateChannelLastMessage(newMessage: ChatMessage, roomId: string) {
            this.channels.forEach(channel => {
                if(channel._id === roomId) channel.lastMessage = newMessage;

                return channel;
            })
        }
    }
})