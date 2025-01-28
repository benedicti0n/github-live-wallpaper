export const userDetailsQuery = `
  name
  bio
  location
  following {
    totalCount
  }
  followers {
    totalCount
  }
  gists {
    totalCount
  }
  contributionsCollection {
    totalCommitContributions
  }
  repositoriesContributedTo(
    first: 1
    contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]
  ) {
    totalCount
  }
  organizations(first: 100) {
    nodes {
      name
      avatarUrl
    }
    totalCount
  }
  organizationsContributedTo: repositoriesContributedTo(first: 3) {
  nodes {
    owner {
      ... on User {
        login
        avatarUrl
      }
      ... on Organization {
        login
        avatarUrl
      }
    }
  }
}
  pullRequests(first: 1) {
    totalCount
  }
  issues(first: 1) {
    totalCount
  }
  sponsoring(first: 1) {
    totalCount
  }
  sponsors {
    totalCount
  }
  createdAt
  updatedAt
  repositoriesWithStargazerCount: repositories(
    first: 100
    privacy: PUBLIC
    ownerAffiliations: OWNER
    orderBy: {field: STARGAZERS, direction: DESC}
  ) {
    totalCount
    nodes {
      stargazerCount
    }
  }
`