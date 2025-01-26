import React, { useState } from 'react';

interface UserData {
    name: string;
    username: string;
    pronouns: string;
    bio: string;
    location: string;
    followers: number;
    totalStars: number;
    totalContributions: number;
    totalPRs: number;
    currentStreak: number;
    longestStreak: number;
    organizations: string[];
    totalRepositories: number;
}

const GithubUserDetails: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [username, setUsername] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const fetchGithubUserDetails = async () => {
        setError(null);

        try {
            // Fetch user profile
            const profileResponse = await fetch(`https://api.github.com/users/${username}`);
            if (!profileResponse.ok) throw new Error('Profile fetch failed');
            const profile = await profileResponse.json();

            // Fetch user's contributions
            const contributionsResponse = await fetch(`https://api.github.com/search/commits?q=author:${username}`);
            const contributionsData = await contributionsResponse.json();

            // Fetch repositories
            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
            const repos = await reposResponse.json();

            // Fetch organizations
            const orgsResponse = await fetch(`https://api.github.com/users/${username}/orgs`);
            const organizations = await orgsResponse.json();

            // Calculate total stars
            const totalStars = repos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);

            // Fetch events for streak calculation
            const eventsResponse = await fetch(`https://api.github.com/users/${username}/events`);
            const events = await eventsResponse.json();

            // Streak calculation logic
            const commitDates = events
                .filter((event: any) => event.type === 'PushEvent')
                .map((event: any) => new Date(event.created_at).toISOString().split('T')[0]);

            const uniqueDates = [...new Set(commitDates)].sort();

            let currentStreak = 0;
            let longestStreak = 0;
            let currentStreakCount = 0;

            for (let i = 1; i < uniqueDates.length; i++) {
                const prevDate = new Date(uniqueDates[i - 1]);
                const currentDate = new Date(uniqueDates[i]);

                const dayDifference = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 3600 * 24));

                if (dayDifference === 1) {
                    currentStreakCount++;
                    currentStreak = Math.max(currentStreak, currentStreakCount + 1);
                } else if (dayDifference > 1) {
                    currentStreakCount = 0;
                }

                longestStreak = Math.max(longestStreak, currentStreak);
            }

            // Construct user data
            const userData: UserData = {
                name: profile.name || profile.login,
                username: profile.login,
                pronouns: profile.company || 'Not specified',
                bio: profile.bio || 'No bio available',
                location: profile.location || 'Not specified',
                followers: profile.followers,
                totalStars: totalStars,
                totalContributions: contributionsData.total_count || 0,
                totalPRs: await fetchTotalPullRequests(username),
                currentStreak,
                longestStreak,
                organizations: organizations.map((org: any) => org.login),
                totalRepositories: repos.length
            };

            setUserData(userData);
        } catch (err: any) {
            console.error('Error fetching GitHub user details:', err);
            setError(err.message);
            setUserData(null);
        }
    };

    const fetchTotalPullRequests = async (username: string): Promise<number> => {
        try {
            const response = await fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr`);
            const data = await response.json();
            return data.total_count || 0;
        } catch {
            return 0;
        }
    };

    return (
        <div className="p-4">
            <div className="flex mb-4">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter GitHub username"
                    className="border p-2 mr-2 flex-grow"
                />
                <button
                    onClick={fetchGithubUserDetails}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Fetch User Details
                </button>
            </div>

            {error && (
                <div className="text-red-500 mb-4">
                    Error: {error}
                </div>
            )}

            {userData && (
                <div className="border p-4 bg-gray-100">
                    <h2 className="text-xl font-bold mb-2">User Details</h2>
                    <pre className="bg-white p-2 rounded overflow-auto">
                        {JSON.stringify(userData, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default GithubUserDetails;