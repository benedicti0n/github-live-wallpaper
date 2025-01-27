import { Request, Response } from "express";
import { fetchContributions } from "../actions/githubGraphql";
import { StreakStats } from "../types";
import fetchUserDetails from "../actions/fetchUserData";
import fetchBasicDetails from '../actions/fetchBasicDetails'

export const fetchGithubStats = async (req: Request, res: Response): Promise<void> => {
    const { username } = req.body;
    console.log(username);

    if (!username) {
        res.status(400).json({ error: "Username is required" });
        return
    }

    try {
        console.log('hi');

        const userDetails = await fetchUserDetails(username);
        const streakStats: StreakStats = await fetchContributions(username)
        const userBasicDetails = await fetchBasicDetails(username);

        console.log('hi2');

        res.json({ userDetails, streakStats, userBasicDetails });
        return
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user details" },);
        return
    }
    return
}