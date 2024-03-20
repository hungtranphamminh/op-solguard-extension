import { useWallet, useAccountBalance } from '@suiet/wallet-kit'

export default function WalletSelector({ setWallet }) {
  const {
    connected,
    disconnect,
    address,
    select, // select
    // configuredWallets, // default wallets
    // detectedWallets, // Sui-standard wallets detected from browser env
    allAvailableWallets, // all the installed Sui-standard wallets
  } = useWallet()

  const handleClickWallet = (wallet) => {
    if (!connected) {
      select(wallet.name)
      setWallet(wallet)
    } else {
      disconnect()
    }
  }

  return (
    <div className="px-6 pb-6 pt-2">
      {[...allAvailableWallets].map((wallet) => (
        <button
          key={wallet.name}
          onClick={() => handleClickWallet(wallet)}
          className=" bg-[#00a8e1] text-white rounded-lg w-full h-[32px] flex items-center justify-center my-2 text-[14px] leading-[19px]"
        >
          {!connected ? <>Connect to {wallet.name}</> : <>Disconnect</>}
        </button>
      ))}
    </div>
  )
}
