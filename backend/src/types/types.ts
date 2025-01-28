export interface GitHubResponse {
    user: UserData;
}

export interface UserData {
    name: string;
    bio: string | null;
    location: string | null;
    following: { totalCount: number };
    followers: { totalCount: number };
    gists: { totalCount: number };
    contributionsCollection: {
        totalCommitContributions: number;
    };
    repositoriesContributedTo: { totalCount: number };
    pullRequests: { totalCount: number };
    issues: { totalCount: number };
    organizations: {
        nodes: Array<{
            name: string;
            avatarUrl: string;
        }>;
        totalCount: number;
    };
    organizationsContributedTo: {
        nodes: Array<{
            owner: {
                login: string;      // Changed from name to login
                avatarUrl: string;
            };
        }>;
    };
    sponsoring: { totalCount: number };
    sponsors: { totalCount: number };
    createdAt: string;
    updatedAt: string;
    repositoriesWithStargazerCount: {
        totalCount: number;
        nodes: Array<{
            stargazerCount: number;
        }>;
    };
}

export interface UserDetails {
    name: string;
    username: string;
    bio: string | null;
    location: string | null;
    followingCount: number;
    followersCount: number;
    gistsCount: number;
    totalCommits: number;
    contributedReposCount: number;
    pullRequestsCount: number;
    issuesCount: number;
    organizationsCount: number;
    organizations: Array<{
        name: string;
        avatarUrl: string;
    }>;
    contributedOrganizations: Array<{
        name: string;
        avatarUrl: string;
    }>;
    sponsoringCount: number;
    sponsorsCount: number;
    accountCreatedAt: Date;
    lastUpdateAt: Date;
    totalRepositories: number;
    totalStars: number;
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
