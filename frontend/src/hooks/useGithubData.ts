import { useAtom } from "jotai";
import { githubDataAtomWithPersistence } from "../atoms/githubData";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const useGithubData = () => {
    const [githubData, setGithubData] = useAtom(githubDataAtomWithPersistence);

    const fetchGithubData = async (username: string) => {
        if (!username.trim()) return alert("Enter a GitHub username!");

        try {
            const response = await fetch(`${serverUrl}/api/v1/fetchGithubStats`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username }),
            });

            if (!response.ok) {
                setGithubData(null);
                throw new Error("Failed to fetch GitHub stats");
            }

            const data = await response.json();
            setGithubData(data); // ✅ Updates state & localStorage
        } catch (error) {
            console.error(error);
        }
    };

    return { githubData, fetchGithubData };
};
