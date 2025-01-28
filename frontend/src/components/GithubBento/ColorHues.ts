interface IColorPallete {
    bgColor: string;
    main1: string,
    main2: string,
    main3: string,
    main4: string,
    textColor: string;
    githubHeatmap: {
        0: string,
        1: string,
        2: string,
        3: string,
        4: string,
    }
}

export const coolBluePalette: IColorPallete = {
    bgColor: "#f0faff", // Soft light blue
    main1: "#007acc",   // Vibrant blue
    main2: "#005f99",   // Deep blue
    main3: "#003f66",   // Darker blue
    main4: "#001f33",   // Almost black blue
    textColor: "#ffffff", // Pure white
    githubHeatmap: {
        0: "#e0f7ff", // Very light blue
        1: "#b3e0ff", // Light blue
        2: "#80cfff", // Medium blue
        3: "#4db8ff", // Bright blue
        4: "#0099ff", // Bold blue
    }
};

export const warmSunsetPalette: IColorPallete = {
    bgColor: "#fff4e6", // Soft peach
    main1: "#ff6f3c",   // Fiery orange
    main2: "#d9542c",   // Deep burnt orange
    main3: "#a13d1f",   // Dark orange-red
    main4: "#6b2913",   // Brownish orange
    textColor: "#fff", // Dark brown
    githubHeatmap: {
        0: "#ffe6cc", // Light peach
        1: "#ffc299", // Soft orange
        2: "#ff9966", // Bright orange
        3: "#ff7040", // Bold orange
        4: "#ff471a", // Strong fiery orange
    }
};

export const forestGreenPalette: IColorPallete = {
    bgColor: "#eef7f1", // Light mint green
    main1: "#2d6a4f",   // Forest green
    main2: "#1b4332",   // Dark green
    main3: "#74c69d",   // Very dark green
    main4: "#081c15",   // Vibrant green
    textColor: "#fefefe", // Off white
    githubHeatmap: {
        0: "#e5f2e8", // Very light green
        1: "#cde4d6", // Soft mint
        2: "#aad9bc", // Light green
        3: "#7fcf9f", // Vibrant green
        4: "#4cba75", // Bold green
    }
};

export const vividPurplePalette: IColorPallete = {
    bgColor: "#f9f4ff", // Light lavender
    main1: "#9d4edd",   // Bold purple
    main2: "#7b2cbf",   // Deep purple
    main3: "#5a189a",   // Dark purple
    main4: "#3c096c",   // Almost black purple
    textColor: "#ffffff", // Pure white
    githubHeatmap: {
        0: "#f0e5ff", // Light lavender
        1: "#d9b3ff", // Light purple
        2: "#bf80ff", // Medium purple
        3: "#a64dff", // Bright purple
        4: "#8c1aff", // Vivid purple
    }
};

export const earthTonesPalette: IColorPallete = {
    bgColor: "#f7f2e8", // Soft beige
    main1: "#a68a64",   // Earthy brown
    main2: "#7f6240",   // Deep brown
    main3: "#4f3625",   // Dark chocolate
    main4: "#2e1f13",   // Almost black
    textColor: "#ffffff", // White
    githubHeatmap: {
        0: "#f0e4d2", // Light beige
        1: "#d8c1a6", // Muted tan
        2: "#b89b7c", // Soft brown
        3: "#8f7158", // Medium brown
        4: "#634d3b", // Dark brown
    }
};
