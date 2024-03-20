import { BASE_URL_API } from '@src/constants'
import { io } from 'socket.io-client'

const socket = io(BASE_URL_API, {
  path: '/v1/socket',
  transports: ['websocket'],
})

export default socket
