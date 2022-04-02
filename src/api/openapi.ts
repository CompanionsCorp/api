import { InfoObject } from 'openapi3-ts'

export const defaultOpenAPIInfo: InfoObject = {
	title: process.env.NAME as string,
	description: process.env.DESCRIPTION,
	version: process.env.VERSION !== undefined ? process.env.VERSION : 'v1.0.0',
	contact: {
		name: process.env.AUTHOR,
		url: process.env.AUTHOR_URL,
		email: process.env.AUTHOR_EMAIL,
	},
	license:
		process.env.LICENSE !== undefined
			? {
					name: process.env.LICENSE,
					url: process.env.LICENSE_URL,
			  }
			: undefined,
}
