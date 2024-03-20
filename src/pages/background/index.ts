import { LocalStorage } from '@src/utils/localStorage'
import { createPopupWindow } from '@src/utils/popUpOpener'
import EventEmitter from 'eventemitter3'
import { v4 as uuidv4 } from 'uuid'
import { InitConfig } from './InitConfig'
const backgroundEventBroadcast = new EventEmitter()

/*
 * This content script is injected programmatically because
 * MAIN world injection does not work properly via manifest
 * https://bugs.chromium.org/p/chromium/issues/detail?id=634381
 */
const registerInPageContentScript = async () => {
  try {
    console.log('injecting')
    await chrome.scripting.registerContentScripts([
      {
        id: 'sui-inpage',
        matches: ['<all_urls>'],
        js: ['src/pages/sui/index.js'],
        runAt: 'document_end',
        world: 'MAIN',
      },
    ])
  } catch (err) {
    /**
     * An error occurs when app-init.js is reloaded. Attempts to avoid the duplicate script error:
     * 1. registeringContentScripts inside runtime.onInstalled - This caused a race condition
     *    in which the provider might not be loaded in time.
     * 2. await chrome.scripting.getRegisteredContentScripts() to check for an existing
     *    inpage script before registering - The provider is not loaded on time.
     */
    console.warn(`Dropped attempt to register inpage content script. ${err}`)
  }
}

InitConfig()
registerInPageContentScript()

/* Port storage implementation */
/* TODO: implement a complete storage for port connections */
/* Simple channel storage using js map object */
const s2ePortStorage = new Map()

/* External port connection */
/* TODO: handle auto disconnect port */
chrome.runtime.onConnectExternal.addListener((port) => {
  console.log('new external connection!')
  port.onMessage.addListener((message: any, port: chrome.runtime.Port) => {
    switch (message.action) {
      case 'init intercept port': {
        const newUuidv4 = uuidv4()
        console.log('uuid is: ', newUuidv4)
        s2ePortStorage.set(newUuidv4, port)
        const popupResponse = {
          action: 'confirm init',
          data: {
            id: newUuidv4,
          },
        }
        port.postMessage(popupResponse)
        break
      }
      case 'retrieve configuration': {
        ReturnConfig(message.id)
        break
      }
      case 'open interceptor administrator': {
        console.log('reach here')
        createPopupWindow('/amazon_checkout', 336, 560, {
          senderInfo: message.id,
          txInfo: JSON.stringify(message.data.mmMessage),
          chainId: message.data.chainId,
        })
        break
      }
      default:
        break
    }
  })
})

/* Internal extension communication */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  /* return true for asynchronous responses */
  switch (message.action) {
    case 'proceed message': {
      console.log(
        'proceed message request from: ',
        message.data.id,
        ' with status ',
        message.data.status
      )
      const port = s2ePortStorage.get(message.data.id)
      port.postMessage({
        action: message.action,
        status: message.data.status,
        message: message.data.mmMessage,
      })
      break
    }
    default:
      break
  }
  /* return if need asynchronous return */
  // return true
})

const ReturnConfig = async (id) => {
  // console.log('port retrive: ', s2ePortStorage.get(id))
  const port = s2ePortStorage.get(id)
  let status = []
  status.push(await LocalStorage.getConfigStatus(1))
  status.push(await LocalStorage.getConfigStatus(2))
  status.push(await LocalStorage.getConfigStatus(3))
  console.log('status retrieved: ', status)
  port.postMessage({ action: 'response config', data: status })
}
