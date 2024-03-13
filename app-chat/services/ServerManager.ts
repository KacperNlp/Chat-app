import axios from "axios";
import type { NewTaskInterface, NewChannelInterface } from '@/types/types';

export default abstract class ServerManager {
    static async getChannelsList(userId: string) {
        const config = useRuntimeConfig();
        return await axios.get(`${config.public.apiURL}/channels`,  {
            params: {
                userId
            }
        });
    }

    static async addNewChannel(newChannel: NewChannelInterface) {
        const config = useRuntimeConfig();
        console.log(newChannel.img)
        console.log(newChannel)
        return await axios.post(`${config.public.apiURL}/channels`, newChannel);
    }

    static async deleteTask(id: string) {
        const config = useRuntimeConfig();
        return await axios.delete(`${config.public.apiURL}/todos/${id}`);
    }
}

