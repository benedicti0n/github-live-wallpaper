const fetchBasicDetails = async (username: string): Promise<{
    name: string | null;
    bio: string | null;
    location: string | null;
}> => {
    const query = `
    query ($username: String!) {
      user(login: $username) {
        name
        bio
        location
      }
    }
  `;

    const variables = { username };

    try {
        const response = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN!}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query, variables }),
        });

        if (!response.ok) {
            throw new Error(
                `GitHub API request failed with status ${response.status}: ${response.statusText}`
            );
        }

        const result = await response.json();

        if (result.errors) {
            throw new Error(`GraphQL Errors: ${JSON.stringify(result.errors)}`);
        }

        return {
            name: result.data.user.name,
            bio: result.data.user.bio,
            location: result.data.user.location,
        };
    } catch (error) {
        console.error("Error fetching GitHub user details:", error);
        throw error;
    }
};

export default fetchBasicDetails