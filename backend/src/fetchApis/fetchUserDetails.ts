import { UserDetails, UserData, GitHubResponse } from "../types/types";
import { userDetailsQuery } from "../query/userDetailsQuery";
import { githubGraphql } from "./githubGraphql";

export const fetchUserDetails = async (username: string): Promise<UserDetails> => {
    const query = `
      query ($username: String!) {
        user(login: $username) {
          ${userDetailsQuery}
        }
      }
    `;

    const response: GitHubResponse = await githubGraphql({
        query,
        variables: { username },
    });

    const { user } = response;

    const userDetails: UserDetails = getUserStats(user);
    userDetails.username = username;


    console.log(userDetails);


    return userDetails;
};

const getUserStats = (userData: UserData): UserDetails => {
    // Calculate total stars across all repositories
    const totalStars = userData.repositoriesWithStargazerCount.nodes.reduce(
        (sum, repo) => sum + repo.stargazerCount,
        0
    );

    // console.log('Raw org data:', JSON.stringify(userData.organizationsContributedTo.nodes, null, 2));

    // Get unique organizations contributed to
    const contributedOrgs = userData.organizationsContributedTo.nodes
        .map(node => ({
            name: node.owner.login,        // Changed from name to login
            avatarUrl: node.owner.avatarUrl
        }))
        .filter((org, index, self) =>
            index === self.findIndex(o => o.name === org.name)  // Deduplication using login
        );

    const stats: UserDetails = {
        name: userData.name,
        username: '',
        bio: userData.bio,
        location: userData.location,
        followingCount: userData.following.totalCount,
        followersCount: userData.followers.totalCount,
        gistsCount: userData.gists.totalCount,
        totalCommits: userData.contributionsCollection.totalCommitContributions,
        contributedReposCount: userData.repositoriesContributedTo.totalCount,
        pullRequestsCount: userData.pullRequests.totalCount,
        issuesCount: userData.issues.totalCount,
        organizationsCount: userData.organizations.totalCount,
        organizations: userData.organizations.nodes,
        contributedOrganizations: contributedOrgs,
        sponsoringCount: userData.sponsoring.totalCount,
        sponsorsCount: userData.sponsors.totalCount,
        accountCreatedAt: new Date(userData.createdAt),
        lastUpdateAt: new Date(userData.updatedAt),
        totalRepositories: userData.repositoriesWithStargazerCount.totalCount,
        totalStars,
    };

    return stats;
};