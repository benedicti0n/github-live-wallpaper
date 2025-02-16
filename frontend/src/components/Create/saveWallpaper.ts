const serverUrl = import.meta.env.VITE_SERVER_URL;

export const saveWallpaper = async (formData: FormData) => {
    try {
        const response = await fetch(`${serverUrl}/api/v1/wallpaper/saveWallpaper`, {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error);

        console.log("Wallpaper saved:", result);
    } catch (err) {
        console.error("Error uploading wallpaper:", err);
    }
};
