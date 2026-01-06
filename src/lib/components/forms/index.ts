import type { FormSchema } from '$lib/forms/font';
import type { FeatureInfo } from '$lib/utils/feature-info';
import { type SuperValidated, type Infer } from 'sveltekit-superforms';
import type { SubmitFunction } from '@sveltejs/kit';
import type { HTMLAttributes } from 'svelte/elements';
import FontForm from './font.svelte';
export { FontForm };

export interface FontInfo {
	url: string;
	font: string;
	features: FontFeature[];
	format: string;
	fileName: string;
}

export interface FontFeature {
	name: string;
	info: FeatureInfo | null;
}

export type Font = FontInfo | null;

export interface FormData {
	form: SuperValidated<Infer<FormSchema>>;
}

export interface FontFormProps extends HTMLAttributes<HTMLDivElement> {
	data: FormData;
	font: Font;
	toastId?: string | number;
}

export type FontFormSubmit = Parameters<SubmitFunction>[0];
