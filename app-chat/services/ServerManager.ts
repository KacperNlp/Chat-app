import axios from "axios";

export default abstract class ServerManager {
    static async getTasksList() {
        return await axios.get('/tasks');
    }
}

