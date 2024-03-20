import { ApplyGiftCard } from '@src/utils/applyGiftCard'
import { retrieveOrderInfo } from '@src/utils/retrieveOrderInfo'
import { OriginExtract } from '@src/utils/lib'

export default function CheckoutButton() {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('message receive: ', message)
    switch (message.action) {
      case 'applyGiftCard': {
        ApplyGiftCard(message, sendResponse)
        break
      }
      case 'placeOrder': {
        var placeOrder = document.querySelector(
          'input[name="placeYourOrder1"].a-button-input[type="submit"]'
        ) as HTMLInputElement
        console.log('place button is: ', placeOrder)
        sendResponse({
          action: 'confirmPlaceOrder',
        })
        break
      }
      default:
        break
    }
  })

  const handleCheckout = async () => {
    retrieveOrderInfo(OriginExtract(document.location.hostname))
    await chrome.runtime.sendMessage({
      action: 'openQR',
    })
  }

  return (
    <button
      className="rounded-lg w-full h-[32px] flex items-center justify-center border my-2 border-black text-[14px] leading-[19px]"
      onClick={handleCheckout}
    >
      Checkout with Solana
    </button>
  )
}
