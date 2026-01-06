import { writable } from 'svelte/store';

export type UploadStage =
	| 'idle'
	| 'uploading'
	| 'processing'
	| 'saving'
	| 'loading_font'
	| 'complete'
	| 'error';

export interface UploadStatus {
	stage: UploadStage;
	progress: number;
	message: string;
	error?: string;
	fileSize?: number;
	startTime?: number;
}

const initialState: UploadStatus = {
	stage: 'idle',
	progress: 0,
	message: ''
};

function createUploadStatusStore() {
	const { subscribe, set, update } = writable<UploadStatus>(initialState);

	return {
		subscribe,

		startUpload: (fileSize: number) =>
			set({
				stage: 'uploading',
				progress: 0,
				message: 'Uploading font...',
				fileSize,
				startTime: Date.now()
			}),

		updateUploadProgress: (progress: number) =>
			update((s) => ({
				...s,
				progress,
				message: `Uploading font... ${progress}%`
			})),

		startProcessing: () =>
			set({
				stage: 'processing',
				progress: 0,
				message: 'Processing font...'
			}),

		startSaving: (fileSize: number) =>
			set({
				stage: 'saving',
				progress: 0,
				message: 'Saving to cloud...',
				fileSize,
				startTime: Date.now()
			}),

		updateSavingProgress: (progress: number) =>
			update((s) => ({
				...s,
				progress,
				message: `Saving to cloud... ${progress}%`
			})),

		startLoadingFont: () =>
			set({
				stage: 'loading_font',
				progress: 0,
				message: 'Loading font preview...'
			}),

		complete: () =>
			set({
				stage: 'complete',
				progress: 100,
				message: 'Font ready!'
			}),

		error: (errorMessage: string) =>
			set({
				stage: 'error',
				progress: 0,
				message: 'Upload failed',
				error: errorMessage
			}),

		reset: () => set(initialState)
	};
}

export const uploadStatus = createUploadStatusStore();
