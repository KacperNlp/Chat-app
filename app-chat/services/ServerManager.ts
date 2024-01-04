import axios from "axios";
import type { NewTaskInterface } from '@/types/types';

export default abstract class ServerManager {
    static async getTasksList() {
        const config = useRuntimeConfig();
        return await axios.get(`${config.public.apiURL}/todos`);
    }

    static async addNewTask(task: NewTaskInterface) {
        const config = useRuntimeConfig();
        return await axios.post(`${config.public.apiURL}/todos`, task);
    }

    static async deleteTask(id: string) {
        const config = useRuntimeConfig();
        return await axios.delete(`${config.public.apiURL}/todos/${id}`);
    }
}

