import { ApplyGiftCard } from '@src/utils/applyGiftCard'
import { retrieveOrderInfo } from '@src/utils/retrieveOrderInfo'
import { OriginExtract } from '@src/utils/lib'
import WalletSelector from '../Sui/WalletSelector'
import { useWallet, useAccountBalance } from '@suiet/wallet-kit'
import { useEffect, useState } from 'react'
import { walletFormatAddress } from '@src/utils/lib'
import { IWallet } from '@suiet/wallet-kit'
import {
  S2ERequestAction,
  S2ERequestMessage,
  S2EResponseAction,
  S2EResponseMessage,
} from '@src/types'

export default function SuiCheckoutButton() {
  const wallet = useWallet()
  const { balance } = useAccountBalance()

  const [walletInfo, setWalletInfo] = useState<IWallet | undefined>()
  const [portConnection, setPortConnection] = useState<chrome.runtime.Port | undefined>()
  const [paymentID, setPaymentID] = useState<String>('')
  /* TODO: check for previous login wallet for wallet logo */

  // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //   console.log('message receive: ', message)
  //   switch (message.action) {
  //     case 'applyGiftCard': {
  //       ApplyGiftCard(message, sendResponse)
  //       break
  //     }
  //     case 'placeOrder': {
  //       var placeOrder = document.querySelector(
  //         'input[name="placeYourOrder1"].a-button-input[type="submit"]'
  //       ) as HTMLInputElement
  //       console.log('place button is: ', placeOrder)
  //       sendResponse({
  //         action: 'confirmPlaceOrder',
  //       })
  //       break
  //     }
  //     default:
  //       break
  //   }
  // })

  const handleCheckout = async () => {
    try {
      const connectionPort: chrome.runtime.Port = chrome.runtime.connect(
        'pdhkfpcgjfdkbefokcajifdledfafpbh'
      )
      setPortConnection(connectionPort)
      connectionPort.onMessage.addListener(HandleCheckout)
      connectionPort.postMessage({ action: S2ERequestAction.Init })
    } catch (error: any) {
      console.log('port connection error:', error)
    }
  }

  const HandleCheckout = async (message: S2EResponseMessage, port: chrome.runtime.Port) => {
    switch (message.action) {
      case S2EResponseAction.ConfirmInit: {
        /* save the granted payment id as a uuidv4 */
        setPaymentID(message.data.id)

        const openQrMsg: S2ERequestMessage = {
          action: S2ERequestAction.OpenPopup,
          data: {
            totalPrice: OriginExtract(document.location.hostname),
            origin: retrieveOrderInfo(OriginExtract(document.location.hostname)),
            id: message.data.id,
          },
        }
        port.postMessage(openQrMsg)
        break
      }
      default:
        break
    }
  }

  return (
    <div className="bg-white border-[3px] border-[#00a8e1] mt-4 rounded-sm">
      <div className="bg-[#00a8e1] relative text-white w-[100px] text-xs flex flex-row justify-between">
        <div className="p-1">Fuseum</div>
        <div className="border-t-[24px] border-t-transparent border-r-[12px] border-r-white"></div>
      </div>
      <div className="">
        {/* Fuseum account info section*/}
        {wallet.connected && walletInfo && (
          <div className="p-4 w-full">
            <div className="font-medium flex items-center gap-1 w-full justify-between">
              Address:
              <div className="flex flex-row items-center justify-start gap-1 py-1 px-2 rounded-md bg-slate-100">
                <img src={walletInfo.iconUrl} className="w-[15px] h-[15px]" />
                <span className="font-normal">
                  {walletFormatAddress({ address: wallet.address })}
                </span>
              </div>
            </div>
            <div className="font-medium w-full flex items-center justify-between">
              Balance:
              <div>
                <span className="pl-1 font-normal">{Number(balance) * Math.pow(10, -9)}</span>
                <span className=" font-bold pl-1">SUI</span>
              </div>
            </div>
          </div>
        )}
        {wallet.connected ? (
          <div className="px-6">
            <button
              className="rounded-lg w-full h-[32px] flex items-center justify-center border border-[#00a8e1] text-[14px] leading-[19px]"
              onClick={handleCheckout}
            >
              Checkout Order with Sui
            </button>
          </div>
        ) : (
          <></>
        )}
        <WalletSelector setWallet={setWalletInfo} />
      </div>
    </div>
  )
}
