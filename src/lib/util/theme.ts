import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import { logEvent } from './stats';

export interface ThemeConfig {
	isDark: boolean;
	theme?: string;
}

export const themeStore: Writable<ThemeConfig> = persist(
	writable({
		isDark: false
	}),
	createLocalStorage(),
	'themeStore'
);

const darkThemes = [
	'dark',
	'synthwave',
	'halloween',
	'aqua',
	'forest',
	'luxury',
	'black',
	'dracula'
];

export const setTheme = (theme: string): void => {
	if (theme.includes(' ')) {
		theme = theme.split(' ')[1].trim();
	}
	const isDark = darkThemes.includes(theme);
	console.log('Setting theme', theme);
	themeStore.set({ theme, isDark });
	void logEvent('themeChange', { theme, isDark });
};
