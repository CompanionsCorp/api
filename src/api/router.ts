import { Application, NextFunction, Request, Response } from 'express'
import { ResponseBuilder } from '../services/response'
import { responseCodes } from '../config/constants'
import { logger } from '../services/logger'
import ProbeRoutes from './v1/probe/index'
import { OpenApiBuilder } from 'openapi3-ts'
import { defaultOpenAPIInfo } from './openapi'

function parseRequest(request: Request) {
	type Body = typeof request.body
	type Query = typeof request.query
	type Params = typeof request.params

	const info: {
		body?: Body
		query?: Query
		params?: Params
		path: string
		baseUrl: string
	} = {
		path: request.path,
		baseUrl: request.baseUrl,
	}

	if (Object.keys(request.body).length > 0) {
		Object.assign(info, { body: request.body })
	}

	if (Object.keys(request.query).length > 0) {
		Object.assign(info, { query: request.query })
	}

	if (Object.keys(request.params).length > 0) {
		Object.assign(info, { params: request.params })
	}

	return info
}

async function handleDocs(
	request: Request,
	response: Response,
	next: NextFunction
) {
	try {
		const openapi = new OpenApiBuilder()
		openapi.addInfo(defaultOpenAPIInfo)

		const routes = [...ProbeRoutes.getDocs()]

		for (const route of routes) {
			openapi.addPath(route.path, route.doc)
		}

		return response.json(openapi.getSpec())
	} catch (e) {
		next(e)
	}
}

export function initRoutes(app: Application, serveAPIDocs = true): void {
	// Attach route stacks
	app.use('/v1', ProbeRoutes.getRouter())

	if (serveAPIDocs) {
		app.use('/v1/docs', handleDocs)
	}
	/**
	 * Not found handler
	 */
	app.use((request: Request, response: Response) => {
		return new ResponseBuilder(response)
			.setMeta(parseRequest(request))
			.setStatus(responseCodes.not_found)
			.setData({ message: request.__('resource_not_found') })
			.send()
	})
	/**
	 * Express error handler
	 */
	app.use(
		(
			error: Error,
			request: Request,
			response: Response,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			_next: NextFunction
		) => {
			logger.error('Request error', request, error)
			return new ResponseBuilder(response)
				.setStatus(responseCodes.error)
				.setError(error)
				.setData({ message: request.__('internal_server_error') })
				.send()
		}
	)
}
