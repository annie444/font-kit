import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Font } from '$lib/components/forms';

const STORAGE_KEY = 'font-kit-saved-font';

function createFontStore() {
	// Load initial value from localStorage if available
	const initialValue: Font = browser ? loadFromStorage() : null;

	const { subscribe, set, update } = writable<Font>(initialValue);

	return {
		subscribe,
		set: (font: Font) => {
			if (browser) {
				if (font) {
					localStorage.setItem(STORAGE_KEY, JSON.stringify(font));
				} else {
					localStorage.removeItem(STORAGE_KEY);
				}
			}
			set(font);
		},
		update,
		clear: () => {
			if (browser) {
				localStorage.removeItem(STORAGE_KEY);
			}
			set(null);
		}
	};
}

function loadFromStorage(): Font {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			return JSON.parse(stored) as Font;
		}
	} catch (e) {
		console.error('Failed to load font from storage:', e);
		localStorage.removeItem(STORAGE_KEY);
	}
	return null;
}

export const fontStore = createFontStore();
