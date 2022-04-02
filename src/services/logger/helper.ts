import { format } from 'winston'

const consoleDefaultFormat = format.printf(
	({ level, message, label, timestamp }) => {
		return `${timestamp} [${label}] ${level}: ${message}`
	}
)

export const winstonFormat = format.combine(
	format.label({ label: process.env.NAME }),
	format.timestamp(),
	format.colorize(),
	consoleDefaultFormat
)
