"use client";

import { colors } from "../config/colors";
import { useTheme } from "../context/ThemeContext";

export default function ColorPicker() {
  const { theme, updateTheme } = useTheme();

  const colorOptions = [
    { name: "Primary", key: "primary" },
    { name: "Secondary", key: "secondary" },
    { name: "Success", key: "success" },
    { name: "Warning", key: "warning" },
    { name: "Danger", key: "danger" },
  ];

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-2">Theme Colors</h3>
      <div className="space-y-2">
        {colorOptions.map(({ name, key }) => (
          <div key={key} className="flex items-center gap-2">
            <label className="text-sm w-20">{name}</label>
            <select
              value={theme[key]}
              onChange={(e) => updateTheme({ [key]: e.target.value })}
              className="border rounded px-2 py-1 text-sm"
            >
              {Object.entries(colors[key]).map(([shade, color]) => (
                <option key={shade} value={color}>
                  {shade} - {color}
                </option>
              ))}
            </select>
            <div
              className="w-6 h-6 rounded border"
              style={{ backgroundColor: theme[key] }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
