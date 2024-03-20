let originalPostMessage
let targetOrigin_g, transfer_g, context_g, chainId_g

export const InitInterceptor = async () => {
  const interceptPort = chrome.runtime.connect('liknlkfmpnlbcfdbjonfgieffnklkifm')
  interceptPort.postMessage({
    action: 'init intercept port',
  })

  // Add event listener
  window.addEventListener(
    'message',
    (event) => {
      if (event.data.data.data.method === 'metamask_chainChanged') {
        console.log('chain changed received message: ', event.data)
        chainId_g = event.data.data.data.params.chainId
      }
    },
    false
  )

  let id
  let isDeepIntercept = true
  let isSync = true
  let isLock = true

  interceptPort.onMessage.addListener(function (message) {
    console.log('incoming message is: ', message)
    switch (message.action) {
      case 'confirm init': {
        id = message.data.id
        interceptPort.postMessage({ action: 'retrieve configuration', id: id })
        break
      }
      case 'response config': {
        if (message.data[0] !== 0) isDeepIntercept = true
        else isDeepIntercept = false

        if (message.data[1] !== 0) isSync = true
        else isSync = false

        if (message.data[2] !== 0) isLock = true
        else isLock = false

        LockdownWindow(interceptPort, id)

        break
      }
      case 'proceed message': {
        console.log('proceed message with info: ', message.message)
        console.log('proceed message with status: ', message.status)
        if (message.status) {
          ForwardRequest(message.message, targetOrigin_g, transfer_g, context_g)
        } else {
          RejectRequest(message.message, targetOrigin_g, transfer_g, context_g)
        }
        break
      }
      default:
        break
    }
  })
}

const LockdownWindow = (interceptPort: chrome.runtime.Port, id: string) => {
  /* save the postMessage method */
  originalPostMessage = window.postMessage
  window.protectedPostMessage = window.postMessage
  /* lockdown communication */
  Object.defineProperty(window, 'protectedPostMessage', {
    value: window.protectedPostMessage,
    writable: false, // This prevents the function from being overridden
    configurable: false, // This prevents this property descriptor from being changed
  })

  // Override the postMessage function
  window.postMessage = function (
    message: any,
    targetOrigin: string,
    transfer?: Transferable[]
  ): void {
    if (message.data.data.method !== 'eth_sendTransaction') {
      /* Transfer message straightly */
      console.log('incoming non intercept message is: ', message)

      targetOrigin_g = targetOrigin
      transfer_g = transfer
      context_g = this

      console.log('incoming non intercept message id is: ', message.data.data.id)

      originalPostMessage.call(this, message, targetOrigin, transfer)
    } else {
      console.log('Intercepted a message before handle: ', message)

      /* Initialize interceptor */
      if (message.data.data.params[0].data)
        InterceptMetamask(
          message,
          originalPostMessage,
          targetOrigin,
          transfer,
          this,
          interceptPort,
          id
        )
      else originalPostMessage.call(this, message, targetOrigin, transfer)
    }
  }
  /* lockdown communication */
  Object.defineProperty(window, 'postMessage', {
    value: window.postMessage,
    writable: false, // This prevents the function from being overridden
    configurable: false, // This prevents this property descriptor from being changed
  })
  console.log('window post message locked')
}

const InterceptMetamask = async (
  mmMessage: any,
  originalPostMessage: any,
  targetOrigin,
  transfer,
  context,
  interceptPort: chrome.runtime.Port,
  id: string
) => {
  console.log('Intercepted a message: ', mmMessage)

  /* simulate API analysis */
  interceptPort.postMessage({
    action: 'open interceptor administrator',
    id: id,
    data: {
      address: mmMessage.data.data.params[0].to,
      mmMessage: mmMessage,
      chainId: chainId_g,
    },
  })
}

const ForwardRequest = (message: any, targetOrigin, transfer, context) => {
  console.log('window object is: ', context)
  console.log('message is: ', message)
  window.protectedPostMessage.call(context, message, targetOrigin, transfer)
}

const RejectRequest = (message: any, targetOrigin, transfer, context) => {
  let rejectFrame = {
    target: 'metamask-inpage',
    data: {
      name: 'metamask-provider',
      data: {
        id: 0,
        jsonrpc: '2.0',
        error: {
          code: 4001,
          message: 'User rejected the request.',
        },
      },
    },
  }

  rejectFrame.data.data.id = message.data.data.id
  originalPostMessage.call(this, rejectFrame, targetOrigin, transfer)
  window.protectedPostMessage.call(context, message, targetOrigin, transfer)
}
