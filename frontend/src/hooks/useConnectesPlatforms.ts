import { useState } from "react";
interface IPlatforms {
    id: string;
    extension: string;
    mobile: boolean;
    desktop: boolean;
    createdAt: string;
    updatedAt: string;
}

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const useConnectedPlatforms = () => {
    const [platforms, setPlatforms] = useState<IPlatforms | null>()

    const fetchConnectedPlatformsDetails = async (userId?: string) => {
        try {
            const response = await fetch(`${serverUrl}/api/v1/user/fetchConnectedPlatformsDetails`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
            })

            if (!response.ok) {
                setPlatforms(null)
                throw new Error("Failed to fetch platforms details")
            }

            const data = await response.json()
            setPlatforms(data)
        } catch (error) {
            console.error(error);
        }
    }

    return { platforms, fetchConnectedPlatformsDetails }
}
