import axios from "axios";
import type { ChatMessage } from '@/types/types';

export default abstract class ChannelManager {
    static async getMessages(roomId: string): Promise<ChatMessage[]> {
        const config = useRuntimeConfig();
        const { data } = await axios.get(`${config.public.apiURL}/channels/messages`,  {
            params: {
                roomId
            }
        });

        return data;
    }
}

