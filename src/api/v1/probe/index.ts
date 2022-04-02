import { Router } from 'express'
import { PathItemObject } from 'openapi3-ts'
import { handleLiveness, handleReadiness } from './controller'

class ProbeRoutes {
	private router = Router()
	private paths: Array<{ path: string; doc: PathItemObject }> = []

	constructor() {
		this.paths.push({
			path: '/v1/liveness',
			doc: {
				get: {
					tags: ['Probe'],
					responses: {
						200: {
							content: {
								'application/json': {
									schema: {
										type: 'object',
										properties: {},
									},
								},
							},
						},
					},
				},
			},
		})
		this.router.get('/liveness', handleLiveness)

		this.paths.push({
			path: '/v1/readiness',
			doc: {
				get: {
					tags: ['Probe'],
					responses: {
						200: {
							content: {
								'application/json': {
									schema: {
										type: 'object',
										properties: {},
									},
								},
							},
						},
					},
				},
			},
		})
		this.router.get('/readiness', handleReadiness)
	}

	public getRouter(): Router {
		return this.router
	}

	public getDocs(): Array<{ path: string; doc: PathItemObject }> {
		return this.paths
	}
}

export default new ProbeRoutes()
