import { Request, Response } from "express";
import { StreakStats } from "../types/types";
import { fetchUserDetails2 } from "../fetchApis/fetchUserDetails2";
import { fetchContributions2 } from "../fetchApis/fetchContribution/fetchContributions2";

export const fetchGithubStats = async (req: Request, res: Response): Promise<void> => {
    const { username } = req.body;

    if (!username) {
        res.status(400).json({ error: "Username is required" });
        return
    }

    try {
        const userDetails = await fetchUserDetails2(username)
        const streakStats: StreakStats = await fetchContributions2(username)

        res.json({ userDetails, streakStats });
        return
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user details" },);
        return
    }
    return
}