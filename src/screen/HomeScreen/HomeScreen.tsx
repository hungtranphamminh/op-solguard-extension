import AmazonFooter from '../AmazonScreen/AmazonFooter'
import { useEffect, useState } from 'react'
import { LocalStorage } from '@src/utils/localStorage'
import { walletFormatAddress } from '@src/utils/lib'
import ShieldOption from '@src/components/shieldOption/ShieldOption'
import DetailCard from '@src/components/DetailCard/DetailCard'
export default function HomeScreen() {
  const [address, setAddress] = useState<any>(null)
  const [openDetail, setOpen] = useState<number>(0)

  /**
   * Open login page - dev mode default to localhost port 3001
   * since port 3000 is reserved for extension
   */
  const openLoginTab = () => {
    const loginTabURL = 'http://localhost:3001/'
    chrome.tabs.create({ url: loginTabURL })
  }

  const logout = async () => {
    await chrome.storage.local.clear().then((result) => retrieveAddress())
  }

  const retrieveAddress = async () => {
    const addressStorage = await LocalStorage.getEvmAddress()
    console.log('address get: ', addressStorage)
    if (addressStorage) {
      setAddress(addressStorage)
    } else setAddress(null)
  }

  useEffect(() => {
    retrieveAddress()
  }, [])

  return (
    <div
      className={`flex flex-col bg-cover bg-[url('../../assets/images/aptosbng.png')] w-[450px] relative ${
        openDetail !== 0 ? ' overflow-y-hidden ' : ''
      }`}
    >
      {openDetail !== 0 ? <DetailCard index={openDetail} setOpen={setOpen} /> : <></>}
      <div className="py-8 flex items-center justify-center">
        <div className="relative">
          {address !== null ? (
            <button
              className="text-[16px] font-bold text-[#140E24] bg-[#FFF] py-2.5 text-center px-6 relative z-10"
              onClick={() => logout()}
            >
              {walletFormatAddress({ address: address })}
            </button>
          ) : (
            <button
              className=" text-[16px] font-bold text-[#140E24] bg-[#FFF] py-2.5 text-center px-6 relative z-10"
              onClick={openLoginTab}
            >
              Connect Wallet
            </button>
          )}
          <div className="absolute z-5 -right-[6px] -bottom-[5px] h-[44px] w-full border border-[#FFF]"></div>
        </div>
      </div>
      {address ? (
        <div className="w-full pb-8">
          <ShieldOption setOpen={setOpen} />
        </div>
      ) : (
        <></>
      )}
      <AmazonFooter />
    </div>
  )
}
