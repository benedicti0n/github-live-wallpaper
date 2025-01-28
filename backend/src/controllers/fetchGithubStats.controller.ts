import { Request, Response } from "express";
import { StreakStats } from "../types/types";
import { fetchUserDetails } from "../fetchApis/fetchUserDetails";
import { fetchContributions } from "../fetchApis/fetchContribution/fetchContributions";

export const fetchGithubStats = async (req: Request, res: Response): Promise<void> => {
    const { username } = req.body;

    if (!username) {
        res.status(400).json({ error: "Username is required" });
        return
    }

    try {
        const userDetails = await fetchUserDetails(username)
        const streakStats: StreakStats = await fetchContributions(username)

        res.json({ userDetails, streakStats });
        return
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user details" },);
        return
    }
    return
}