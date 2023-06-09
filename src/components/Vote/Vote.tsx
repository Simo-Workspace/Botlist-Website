import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import { BotStructure, DiscordUser } from "../../types";
import { UserContext } from "../../contexts/UserContext";
import api from '../../api';
import { ThemeContext } from "../../contexts/ThemeContext";
import { VoteLoading } from "./Loading";

export const VoteComponent: React.FC = () => {
    const { user } = useContext(UserContext);
    const { botid } = useParams<string>();
    const { color } = useContext(ThemeContext);

    const [voteStatus, setVoteStatus] = useState<{ canVote: boolean; restTime: string; }>();
    const [discordBotData, setDiscordBotData] = useState<DiscordUser>();
    const [botData, setBotData] = useState<BotStructure>();

    const getVoteStatus = async () => {
        const res: AxiosResponse<{ canVote: boolean; restTime: string; }> = await api.voteStatus(botid as string, user?.id as string);
        return setVoteStatus(res.data);
    };

    const getBotData = async () => {
        const res: AxiosResponse<BotStructure> = await api.getBotInfos(botid as string);
        return setBotData(res.data);
    };

    const getDiscordBotData = async () => {
        const res: AxiosResponse<DiscordUser> = await api.getDiscordUser(botid as string);
        return setDiscordBotData(res.data);
    };

    const handleVote = async () => {
        await api.voteBot(user?.id as string, botid as string);
        getBotData();
        return;
    };

    useEffect(() => {
        getDiscordBotData();
        getBotData();
    }, []);

    useEffect(() => {
        if (user) {
            getVoteStatus();
        };
    }, [user]);

    return user ? (
        discordBotData ? (
            <section className="text-white p-3 w-[100vw] flex flex-col items-center justify-center">
                <div className="flex flex-row p-3 rounded-lg items-center gap-3">
                    <img
                        className="w-[100px] rounded-full"
                        src={`https://cdn.discordapp.com/avatars/${discordBotData?.id}/${discordBotData?.avatar}.png?size=2048`}
                        alt={`${discordBotData?.username}'s Avatar`}
                    />
                    <div>
                        <h1 className="flex">Votar em {discordBotData?.username}</h1>
                        <span>Votos: {botData?.votes.length}</span>
                    </div>
                </div>
                <div className="flex border-2 w-[60vw] h-[80px] flex-row rounded-lg items-center bg-neutral-900">
                    <span className="text-[20px] w-[82%] ml-3">{voteStatus?.canVote ? "Você pode votar agora!" : "Calma lá amigão, você ja votou hoje, volte amanhã."}</span>
                    <div className="flex justify-end">
                        <button 
                        className={`transition-all duration-300 border-2 rounded-xl w-[100px] h-[50px] disabled:opacity-40
                            ${color === "blue" && "bg-blue-900 hover:bg-blue-500 border-blue-500 disabled:hover:bg-blue-900"} 
                            ${color === "green" && "bg-green-900 hover:bg-green-700 border-green-700 disabled:hover:bg-green-900"} 
                            ${color === "red" && "bg-red-900 hover:bg-red-500 border-red-500 disabled:hover:bg-red-900"}
                            ${color === "purple" && "bg-purple-900 hover:bg-purple-500 border-purple-500 disabled:hover:bg-purple-900"}`}
                        disabled={!voteStatus?.canVote}
                        onClick={handleVote}
                    >Votar</button>
                    </div>
                </div>
            </section>
        ) : (
            <VoteLoading/>
        )
    ) : (
        <div className="text-white">você precisa logar para votar</div>
    )
};