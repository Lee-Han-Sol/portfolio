/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            // 기존
            // colors: {
            //     "surface-container": "#171f33",
            //     surface: "#0b1326",
            //     "secondary-fixed": "#6ffbbe",
            //     "on-error-container": "#ffdad6",
            //     "secondary-fixed-dim": "#4edea3",
            //     "tertiary-container": "#de8712",
            //     "on-secondary": "#003824",
            //     "on-surface-variant": "#bec8d2",
            //     "on-primary": "#00344d",
            //     "primary-fixed-dim": "#89ceff",
            //     "surface-container-low": "#131b2e",
            //     error: "#ffb4ab",
            //     "primary-fixed": "#c9e6ff",
            //     "on-primary-container": "#003751",
            //     "inverse-surface": "#dae2fd",
            //     "surface-tint": "#89ceff",
            //     "inverse-primary": "#006591",
            //     "tertiary-fixed": "#ffdcbd",
            //     primary: "#89ceff",
            //     "surface-dim": "#0b1326",
            //     secondary: "#4edea3",
            //     "surface-container-highest": "#2d3449",
            //     "on-primary-fixed": "#001e2f",
            //     "outline": "#88929b",
            //     "surface-container-high": "#222a3d",
            //     "inverse-on-surface": "#283044",
            //     tertiary: "#ffb86e",
            //     "on-secondary-fixed": "#002113",
            //     "outline-variant": "#3e4850",
            //     "on-surface": "#dae2fd",
            //     "surface-container-lowest": "#060e20",
            //     "surface-bright": "#31394d",
            //     background: "#0b1326",
            //     "on-tertiary": "#492900",
            //     "on-background": "#dae2fd",
            //     "primary-container": "#0ea5e9",
            //     "secondary-container": "#00a572",
            //     "on-error": "#690005",
            //     "error-container": "#93000a",
            //     "surface-variant": "#2d3449",
            // },
            
            // github 스타일
            colors: {
                "surface-container": "#161B22",
                surface: "#0D1117",

                "secondary-fixed": "#56D364",
                "secondary-fixed-dim": "#3FB950",
                "on-secondary": "#0D2818",

                "on-error-container": "#FFDCD7",

                "tertiary-container": "#9E6A03",
                tertiary: "#D29922",
                "tertiary-fixed": "#F8E3A1",
                "on-tertiary": "#341A00",

                // "on-surface-variant": "#8B949E",
                "on-surface-variant": "#C9D1D9",
                "on-primary": "#0D1117",
                "primary-fixed-dim": "#79C0FF",

                "surface-container-low": "#161B22",
                "surface-container-lowest": "#010409",
                "surface-container-high": "#21262D",
                "surface-container-highest": "#30363D",

                error: "#FF7B72",
                "error-container": "#67060C",
                "on-error": "#FFFFFF",

                "primary-fixed": "#A5D6FF",
                "on-primary-container": "#DBF0FF",

                "inverse-surface": "#F0F6FC",
                "inverse-on-surface": "#24292F",
                "inverse-primary": "#0969DA",

                primary: "#58A6FF",
                "primary-container": "#1F6FEB",

                secondary: "#3FB950",
                "secondary-container": "#238636",

                "surface-dim": "#0D1117",
                "surface-bright": "#30363D",
                "surface-tint": "#58A6FF",

                outline: "#30363D",
                "outline-variant": "#21262D",

                "surface-variant": "#161B22",

                background: "#0D1117",
                "on-background": "#E6EDF3",
                // "on-surface": "#E6EDF3",
                "on-surface": "#F0F6FC",
            },
            borderRadius: {
                DEFAULT: "0.125rem",
                lg: "0.25rem",
                xl: "0.5rem",
                full: "0.75rem",
            },
            spacing: {
                "stack-md": "24px",
                "stack-sm": "12px",
                "stack-lg": "48px",
                "margin-mobile": "16px",
                gutter: "24px",
                base: "8px",
                "container-max": "1280px",
            },
            fontFamily: {
                "headline-lg-mobile": ["Inter", "sans-serif"],
                "label-caps": ["JetBrains Mono", "monospace"],
                "display-lg": ["Inter", "sans-serif"],
                "body-md": ["Inter", "sans-serif"],
                "headline-lg": ["Inter", "sans-serif"],
                "code-sm": ["JetBrains Mono", "monospace"],
            },
            fontSize: {
                "headline-lg-mobile": [
                    "24px",
                    { lineHeight: "32px", fontWeight: "600" },
                ],
                "label-caps": [
                    "12px",
                    { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "600" },
                ],
                "display-lg": [
                    "48px",
                    { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" },
                ],
                "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
                "headline-lg": [
                    "32px",
                    { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "600" },
                ],
                "code-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
            },
        },
    },
    plugins: [],
};