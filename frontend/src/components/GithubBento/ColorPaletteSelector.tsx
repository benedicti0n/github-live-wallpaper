import React from 'react';
import { ColorPaletteType } from './types'; // Ensure this import matches your type definition location

interface ColorPaletteSelectorProps {
    selectedPalette: ColorPaletteType;
    setSelectedPalette: (palette: ColorPaletteType) => void;
}

const ColorPaletteSelector: React.FC<ColorPaletteSelectorProps> = ({ selectedPalette, setSelectedPalette }) => (
    <div className="w-1/2 font-[ChivoRegular]">
        <label className="text-xl font-[ChivoMedium] block mb-2 invert">Select Color Palette:</label>
        <select
            value={selectedPalette}
            onChange={(e) => setSelectedPalette(e.target.value as ColorPaletteType)}
            className="invert p-2 border rounded-lg w-full shadow-sm"
        >
            <option value="earthTones">Earth Tones</option>
            <option value="coolBlue">Cool Blue</option>
            <option value="forestGreen">Forest Green</option>
            <option value="vividPurple">Vivid Purple</option>
            <option value="warmSunset">Warm Sunset</option>
        </select>
    </div>
);

export default ColorPaletteSelector; 