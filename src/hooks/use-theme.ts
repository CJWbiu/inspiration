import {ref, computed} from 'vue';
import darkTheme from '@/themes/dark';
import lightTheme from '@/themes/light';

const THEME_KEY = 'INSPIRATION_THEME';
const localTheme = localStorage.getItem(THEME_KEY) || 'light';
const theme = ref(localTheme);

export default function () {
    const setTheme = (themeName: string) => {
        theme.value = themeName;
        localStorage.setItem(THEME_KEY, themeName);
    };

    const getThemeConfig = (compName: string) => {
        return theme.value === 'light' ? 
            lightTheme[compName] : 
            darkTheme[compName];
    }

    return {
        theme,
        setTheme,
        getThemeConfig
    };
}