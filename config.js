// config.js

const GEMINI_MODEL = 'gemini-2.5-flash';

// Special, non-deletable folders.
const SPECIAL_FOLDERS = {
    all: { id: 'all', name: '📚 All Items' },
    uncategorized: { id: 'uncategorized', name: '📥 Uncategorized' },
    favorites: { id: 'favorites', name: '⭐ Favorites' },
};

// Emojis for folder creation modal.
const FOLDER_ICONS = [ '📁', '📂', '📚', '⭐', '❤️', '✅', '💡', '🧪', '🌐', '👽', '🧠', '🎨', '💼', '💬', '📜', '📈', '📌', '⚙️', '🔍', '📅', '🔑', '⌬', '🗺️', '🏛️', '🎭', '🎼', '🍔', '✈️', '🚢', '🚗', '🚀', '⏳', '💰', '🌿', '💊', '👑', '🏆', '💎', '🔥', '🌊', '🔰', '🎌', '🏁', '🤖', '👾', '🦉', '🦊', '🦋', '🎉', '🎁', '✉️', '🏡', '💯' ];

const LOADING_MESSAGES = [ "Warming up the AI brain...", "Translating the cosmos...", "Brewing fresh language...", "Unscrambling syntax...", "Polishing phonemes...", "Consulting ancient texts...", "Generating genius...", "Crafting clever content...", "Assembling awesome articles..." ];

// Language Configuration with emoji flags.
const LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
    { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
    { code: 'no', name: 'Norwegian', flag: '🇳🇴' },
    { code: 'da', name: 'Danish', flag: '🇩🇰' },
    { code: 'fi', name: 'Finnish', flag: '🇫🇮' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'pl', name: 'Polish', flag: '🇵🇱' },
    { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'zh', name: 'Chinese (Mandarin)', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'he', name: 'Hebrew', flag: '🇮🇱' },
    { code: 'el', name: 'Modern Greek', flag: '🇬🇷' },
    { code: 'la', name: 'Latin', flag: '🏛️' }, 
    { code: 'grc', name: 'Koine Greek', flag: '📜' },
    { code: 'grc-att', name: 'Attic Greek', flag: '🦉'}
];

// Language Theme Color Palette
const LANGUAGE_THEMES = {
    'default': { base: '#58cc02', dark: '#4aa402', light: '#72e213' }, // Maimo Green
    'es': { base: '#ff4b4b', dark: '#d93a3a', light: '#ff6b6b' }, // Spanish Red
    'fr': { base: '#1cb0f6', dark: '#1899d6', light: '#4acbff' }, // French Blue
    'de': { base: '#ffc107', dark: '#d39e00', light: '#ffd54f' }, // German Gold
    'it': { base: '#009688', dark: '#00695f', light: '#26a69a' }, // Italian Teal
    'pt': { base: '#8bc34a', dark: '#689f38', light: '#9ccc65' }, // Portuguese Lime
    'ja': { base: '#e91e63', dark: '#c2185b', light: '#ec407a' }, // Japanese Pink
    'zh': { base: '#f44336', dark: '#d32f2f', light: '#ef5350' }, // Chinese Red
    'ko': { base: '#3f51b5', dark: '#303f9f', light: '#5c6bc0' }, // Korean Indigo
    'ru': { base: '#2196f3', dark: '#1976d2', light: '#42a5f5' }, // Russian Blue
    'la': { base: '#795548', dark: '#5d4037', light: '#8d6e63' }, // Latin Brown
    'grc': { base: '#673ab7', dark: '#512da8', light: '#7e57c2' }, // Koine Purple
    'grc-att': { base: '#9c27b0', dark: '#7b1fa2', light: '#ab47bc' }, // Attic Magenta
};