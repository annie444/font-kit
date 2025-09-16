import { z } from 'zod';

const fileSizeLimit = 5 * 1024 * 1024;

export const formSchema = z.object({
	font: z
		.instanceof(File, { message: 'Please upload a font file' })
		.refine(
			(file) => {
				console.log(file);
				return [
					'font/ttf',
					'font/otf',
					'font/woff',
					'font/woff2',
					'application/font-sfnt',
					'application/vnd.ms-fontobject',
					'application/font-woff',
					'application/font-woff2'
				].includes(file.type);
			},
			{ message: 'Invalid font file type' }
		)
		.refine((file) => file.size <= fileSizeLimit, {
			message: 'File size should not exceed 5MB'
		})
});

export type FormSchema = typeof formSchema;
