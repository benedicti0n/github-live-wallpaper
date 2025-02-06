export interface ImageUploadState {
    TopLeft: string;
    TopRight: string;
    RightSide: string;
    BottomLeft: string;
    Background: string;
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



type GithubData = {
    userDetails: {
        userStats: {
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
        };
    };
    streakStats: {
        totalContributions: number;
        firstDateofContribution: string; // ISO or human-readable date format
        longestStreak: number;
        longestStreakStartDate: string; // ISO or human-readable date format
        longestStreakEndDate: string; // ISO or human-readable date format
        currentStreak: number;
        currentStreakStartDate: string; // ISO or human-readable date format
        currentStreakEndDate: string; // ISO or human-readable date format
    };
    userBasicDetails: {
        name: string;
        username: string;
        bio: string;
        location: string;
    };
};

export default GithubData