import type { FormSchema } from '$lib/forms/font';
import { type SuperValidated, type Infer } from 'sveltekit-superforms';
import type { SubmitFunction } from '@sveltejs/kit';
import type { HTMLAttributes } from 'svelte/elements';
import FontForm from './font.svelte';
export { FontForm };

export interface FontInfo {
  url: string;
  font: string;
  features: string[];
  format: string;
  fileName: string;
}

export type Font = FontInfo | null;

export interface FormData {
  form: SuperValidated<Infer<FormSchema>>;
}

export interface FontFormProps extends HTMLAttributes<HTMLDivElement> {
  data: FormData;
  font: Font;
}

export type FontFormSubmit = Parameters<SubmitFunction>[0];
