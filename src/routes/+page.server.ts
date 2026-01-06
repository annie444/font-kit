import type { PageServerLoad, Actions } from './$types.js';
import { superValidate, fail, message } from 'sveltekit-superforms';
import { formSchema } from '$lib/forms/font';
import type { FontFeature } from '$lib/components/forms/index.js';
import { getFeatureInfo } from '$lib/utils/feature-info.js';
import { zod4 } from 'sveltekit-superforms/adapters';
import * as fontkit from 'fontkit';
import { CDN_URL } from '$lib/consts';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {
	S3_ACCESS_KEY_ID,
	S3_SECRET_ACCESS_KEY,
	S3_BUCKET_NAME,
	S3_REGION,
	S3_ACCOUNT_ID
} from '$env/static/private';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod4(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		// Validate the form
		const form = await superValidate(event, zod4(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		// Parse font file for the family name
		let font = fontkit.create(Buffer.from(await form.data.font.arrayBuffer()));
		let fontName: string = 'Unknown';
		if ('familyName' in font) {
			fontName = font.familyName;
		} else if ('fonts' in font) {
			const fontFamily = new Set(font.fonts.map((f) => f.familyName)).values().next().value;
			if (fontFamily) {
				fontName = fontFamily;
			} else {
				return fail(400, { form, message: 'Invalid font file' });
			}
			const singleFont = font.getFont(fontName);
			if (singleFont) {
				font = singleFont;
			} else {
				return fail(400, { form, message: 'Invalid font file' });
			}
		}

		// Upload to S3
		const S3 = new S3Client({
			region: S3_REGION,
			endpoint: `https://${S3_ACCOUNT_ID}.r2.cloudflarestorage.com`,
			credentials: {
				accessKeyId: S3_ACCESS_KEY_ID,
				secretAccessKey: S3_SECRET_ACCESS_KEY
			}
		});

		// Use original file name
		const fileName = form.data.font.name;

		// Determine font format
		let format = 'unknown';
		if (fileName.endsWith('.ttf') || fileName.endsWith('.otf')) {
			format = 'truetype';
		} else if (fileName.endsWith('.woff')) {
			format = 'woff';
		} else if (fileName.endsWith('.woff2')) {
			format = 'woff2';
		}

		// Create S3 put command
		const command = new PutObjectCommand({
			ACL: 'public-read',
			Expires: new Date(Date.now() + 3600 * 1000), // 1 hour from now
			Bucket: S3_BUCKET_NAME,
			Key: fileName,
			Body: await form.data.font.bytes(),
			ContentType: form.data.font.type
		});

		// Upload the file
		try {
			await S3.send(command);
		} catch (error) {
			console.error('Error uploading file:', error);
			return fail(500, { form, message: 'Error uploading file' });
		}

		const features: FontFeature[] = [];
		for (const feature of font.availableFeatures) {
			features.push({ name: feature, info: getFeatureInfo(feature) });
		}

		// Return success message with font name and URL
		return message(form, {
			type: 'success',
			text: 'File uploaded successfully!',
			url: `${CDN_URL}/${fileName}`,
			name: fontName,
			fileName: fileName,
			features: features,
			format: format
		});
	}
};
