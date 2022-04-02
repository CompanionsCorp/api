import { Server } from 'http'
import { logger } from './services/logger'
import { generateExpressApplication } from './config'

const application = generateExpressApplication()
const server = new Server(application)

server.listen(Number(process.env.PORT), () => {
	logger.info('Server is up on http://localhost:' + process.env.PORT)
})

export default server
