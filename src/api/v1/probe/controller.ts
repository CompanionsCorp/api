import { NextFunction, Request, Response } from 'express'
import { responseCodes } from '../../../config/constants'
import { ResponseBuilder } from '../../../services/response'

export async function handleLiveness(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void | Response> {
	try {
		return new ResponseBuilder(response)
			.setStatus(responseCodes.success)
			.setData({ status: true })
			.send()
	} catch (error) {
		next(error)
	}
}

export async function handleReadiness(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void | Response> {
	try {
		return new ResponseBuilder(response)
			.setStatus(responseCodes.success)
			.setData({ status: true })
			.send()
	} catch (error) {
		next(error)
	}
}
