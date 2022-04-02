import { Response } from 'express'

interface ResponsePayload<T, K> {
	meta?: K
	data?: T
	errors?: Array<Error>
}

export class ResponseBuilder<T, K> {
	protected meta?: K
	protected data?: T
	protected response: Response<ResponsePayload<T, K>>
	protected errors?: Array<Error>

	constructor(response: Response) {
		this.response = response
	}

	private _parse(): ResponsePayload<T, K> {
		const payload: ResponsePayload<T, K> = {}

		if (this.meta !== undefined) {
			payload.meta = this.meta
		}

		if (this.data !== undefined) {
			payload.data = this.data
		}

		if (this.errors !== undefined) {
			payload.errors = this.errors
		}

		return payload
	}

	public setStatus(code: number): this {
		this.response.status(code)

		return this
	}

	public setMeta(meta: K): this {
		this.meta = meta

		return this
	}

	public setData(data: T): this {
		this.data = data

		return this
	}

	public setError(...error: Error[]): this {
		this.errors = [...error]

		return this
	}

	public send(): Response<ResponsePayload<T, K>> {
		return this.response.json(this._parse())
	}
}
