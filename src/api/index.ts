import axios, { AxiosResponse } from "axios";
import {
    BotStructure,
    UserStructure,
    VoteStructure,
    botDataStructure,
    DiscordUser,
    Snowflake
} from "../types";
const key = import.meta.env.VITE_API_KEY as string;
const header = {
    headers: {
        Authorization: key,
    },
};

const api = {
    getAllBots: async () => {
        const res: AxiosResponse = await axios.get<AxiosResponse<BotStructure[]>>("/api/bots", header);
        return res;
    },
    getUserData: async () => {
        const res: AxiosResponse = await axios.get<AxiosResponse<UserStructure>>("/api/auth/user", { ...header, withCredentials: true });
        return res;
    },
    getDiscordUser: async (userID: string | Snowflake) => {
        const res: AxiosResponse = await axios.get<AxiosResponse<DiscordUser>>("/api/users/" + userID, header);
        return res;
    },
    getBotInfos: async (botID: string | Snowflake) => {
        const res: AxiosResponse = await axios.get<AxiosResponse<BotStructure>>("/api/bots" + botID, header);
        return res;
    }
};

export default api;