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
    bgColor: "#eff6ff", // Soft light blue
    main1: "#63a3f7",   // Vibrant blue
    main2: "#3378f1",   // Deep blue
    main3: "#2962e7",   // Darker blue
    main4: "#203988",   // Almost black blue
    textColor: "#ffffff", // Pure white
    githubHeatmap: {
        0: "#eff6ff", // Very light blue
        1: "#95c3fb", // Light blue
        2: "#63a3f7", // Medium blue
        3: "#3378f1", // Bright blue
        4: "#2962e7", // Bold blue
    }
};

export const warmSunsetPalette: IColorPallete = {
    bgColor: "#fef9ec", // Soft peach
    main1: "#e5901b",   // Fiery orange
    main2: "#cb6d14",   // Deep burnt orange
    main3: "#a84e15",   // Dark orange-red
    main4: "#893c17",   // Brownish orange
    textColor: "#fff", // Dark brown
    githubHeatmap: {
        0: "#fef9ec", // Light peach
        1: "#f5dc92", // Soft orange
        2: "#ecaf33", // Bright orange
        3: "#cb6d14", // Bold orange
        4: "#a84e15", // Strong fiery orange
    }
};

export const forestGreenPalette: IColorPallete = {
    bgColor: "#edfff7", // Light mint green
    main1: "#00965b",   // Forest green
    main2: "#06754a",   // Dark green
    main3: "#07603f",   // Very dark green
    main4: "#003722",   // Vibrant green
    textColor: "#fefefe", // Off white
    githubHeatmap: {
        0: "#edfff7", // Very light green
        1: "#70ffc8", // Soft mint
        2: "#00f192", // Light green
        3: "#00965b", // Vibrant green
        4: "#07603f", // Bold green
    }
};

export const vividPurplePalette: IColorPallete = {
    bgColor: "#f6f3ff", // Light lavender
    main1: "#b388fd",   // Bold purple
    main2: "#9d58fa",   // Deep purple
    main3: "#9235f2",   // Dark purple
    main4: "#380e67",   // Almost black purple
    textColor: "#ffffff", // Pure white
    githubHeatmap: {
        0: "#f6f3ff", // Light lavender
        1: "#c0a1ff", // Light purple
        2: "#9d58fa", // Medium purple
        3: "#8323de", // Bright purple
        4: "#5a1a98", // Vivid purple
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
