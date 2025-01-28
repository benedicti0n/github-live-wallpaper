import {
    calculateCurrentStreak,
    calculateLongestStreak,
    calculateTotalContributions,
    formatDate,
} from "../../utils/calculations";
import { fetchContributionYears } from "./fetchContributionYears";
import { fetchYearContributions } from "./fetchYearContributions";

export async function fetchContributions2(username: string): Promise<{
    totalContributions: number;
    firstDateofContribution: string | null;
    longestStreak: number;
    longestStreakStartDate: string | null;
    longestStreakEndDate: string | null;
    currentStreak: number;
    currentStreakStartDate: string | null;
    currentStreakEndDate: string | null;
}> {
    const contributionYears = await fetchContributionYears(username);
    let allContributionDays: { date: string; contributionCount: number }[] = [];

    for (const year of contributionYears) {
        const yearContributions = await fetchYearContributions(username, year);
        allContributionDays = allContributionDays.concat(yearContributions);
    }

    allContributionDays.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    const { total, firstContributionDate } =
        calculateTotalContributions(allContributionDays);
    const firstDateofContribution = formatDate(firstContributionDate);
    const {
        longestStreak,
        startDate: longestStreakStart,
        endDate: longestStreakEnd,
    } = calculateLongestStreak(allContributionDays);
    const longestStreakStartDate = formatDate(longestStreakStart);
    const longestStreakEndDate = formatDate(longestStreakEnd);
    const {
        currentStreak,
        startDate: currentStreakStart,
        endDate: currentStreakEnd,
    } = calculateCurrentStreak(allContributionDays);
    const currentStreakStartDate = formatDate(currentStreakStart);
    const currentStreakEndDate = formatDate(currentStreakEnd);

    return {
        totalContributions: total,
        firstDateofContribution,
        longestStreak,
        longestStreakStartDate,
        longestStreakEndDate,
        currentStreak,
        currentStreakStartDate,
        currentStreakEndDate,
    };
}
