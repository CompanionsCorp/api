import compression from 'compression'
import cors from 'cors'
import i18n from 'i18n'
import express, { Application, json, urlencoded } from 'express'
import { contentSecurityPolicy, hidePoweredBy, xssFilter } from 'helmet'
import { memoryLimit } from './constants'
import { initRoutes } from '../api/router'
import { resolve } from 'path'

export function generateExpressApplication(): Application {
	const app = express()

	app.disable('x-powered-by')

	app.use(hidePoweredBy()) // return fake Powered by response
	app.use(xssFilter()) // some XSS filtes
	app.use(cors()) // cors settings
	app.use(json({ limit: memoryLimit }))
	app.use(compression())
	app.use(urlencoded({ limit: memoryLimit, extended: false }))

	app.use(
		contentSecurityPolicy({
			directives: {
				defaultSrc: ["'self'", process.env.HOST as string],
				objectSrc: [],
				sandbox: ['allow-forms', 'allow-scripts'],
				scriptSrc: ["'self'", "'unsafe-inline'"],
			},
		})
	)

	i18n.configure({
		locales: ['en', 'de', 'ba'],
		defaultLocale: 'en',
		directory: resolve(__dirname, '../../locales'),
	})

	app.use(i18n.init)

	initRoutes(app)

	return app
}
