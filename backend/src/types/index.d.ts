// export interface UserDetails {
//     name: string;
//     login: string;
//     bio: string | null; // Bio can be null if not provided
//     location: string | null; // Location can also be null
//     createdAt: string; // ISO date string
//     followers: {
//         totalCount: number;
//     };
//     contributionsCollection: {
//         totalCommitContributions: number;
//         contributionsByYear: {
//             year: number;
//             totalCount: number;
//         }[];
//         pullRequestContributions: {
//             totalCount: number;
//         };
//         repositoriesWithContributedTo: {
//             totalCount: number;
//             nodes: {
//                 name: string;
//                 owner: {
//                     login: string;
//                 };
//             }[];
//         };
//         streak: {
//             longestStreak: {
//                 length: number;
//                 startDate: string; // ISO date string
//                 endDate: string; // ISO date string
//             } | null; // Can be null if no streak
//             currentStreak: {
//                 length: number;
//                 startDate: string; // ISO date string
//                 endDate: string; // ISO date string
//             } | null; // Can be null if no streak
//         };
//     };
// }

// types.ts
export interface UserStats {
    Followers: number;
    Repositories: number;
    Organizations: number;
    Gists: number;
    "Pull Requests": number;
    Issues: number;
    Commits: number;
    Sponsors: number;
    "Contributed To": number;
    "Star Earned": number;
}

export interface User {
    followers: { totalCount: number };
    gists: { totalCount: number };
    contributionsCollection: { totalCommitContributions: number };
    repositoriesContributedTo: { totalCount: number };
    pullRequests: { totalCount: number };
    issues: { totalCount: number };
    organizations: { totalCount: number };
    sponsors: { totalCount: number };
    repositoriesWithStargazerCount: {
        totalCount: number;
        nodes: { stargazerCount: number }[];
    };
}

export interface GitHubResponse {
    user: User;
    rateLimit: any;
}

export type StreakStats = {
    totalContributions: number;
    firstDateofContribution: string | null;
    longestStreak: number;
    longestStreakStartDate: string | null;
    longestStreakEndDate: string | null;
    currentStreak: number;
    currentStreakStartDate: string | null;
    currentStreakEndDate: string | null;
};

export type Graph = {
    date: string;
    contributionCount: number;
};
