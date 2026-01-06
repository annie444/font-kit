/**
 * Estimates R2 upload duration based on file size.
 * Cloudflare R2 typically achieves 50-200 Mbps upload speeds.
 * We use conservative estimates to avoid completing before actual upload.
 */
export function estimateR2UploadDuration(fileSizeBytes: number): number {
	// Conservative estimate: 20 Mbps = 2.5 MB/s
	const bytesPerSecond = 2.5 * 1024 * 1024;

	// Minimum 1.5 seconds, maximum 10 seconds
	// Add 500ms base latency for S3 client initialization
	const estimatedSeconds = Math.max(1.5, Math.min(10, fileSizeBytes / bytesPerSecond + 0.5));

	return estimatedSeconds * 1000; // Return milliseconds
}

/**
 * Easing function - starts fast, slows near end
 */
function easeOutQuart(t: number): number {
	return 1 - Math.pow(1 - t, 4);
}

/**
 * Creates an eased progress animation that slows near completion.
 * This prevents the progress bar from sitting at 100% while waiting.
 */
export function createProgressAnimator(
	duration: number,
	maxProgress: number = 95, // Never reach 100% until actual completion
	onProgress: (progress: number) => void
): { start: () => void; complete: () => void; cancel: () => void } {
	let animationFrame: number | null = null;
	let startTime: number;

	function animate() {
		const elapsed = Date.now() - startTime;
		const rawProgress = Math.min(elapsed / duration, 1);
		const easedProgress = easeOutQuart(rawProgress) * maxProgress;

		onProgress(Math.round(easedProgress));

		if (rawProgress < 1) {
			animationFrame = requestAnimationFrame(animate);
		}
	}

	return {
		start: () => {
			startTime = Date.now();
			animate();
		},
		complete: () => {
			if (animationFrame) cancelAnimationFrame(animationFrame);
			onProgress(100);
		},
		cancel: () => {
			if (animationFrame) cancelAnimationFrame(animationFrame);
		}
	};
}
