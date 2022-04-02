import { createLogger, transports } from 'winston'
import { winstonFormat } from './helper'

export const logger = createLogger({
	format: winstonFormat,
	transports: [new transports.Console()],
})
