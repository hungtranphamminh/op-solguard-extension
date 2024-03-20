import interceptor from '@assets/images/interceptor.png'
import sync from '@assets/images/sync.png'
import protectedRoad from '@assets/images/protected.png'
import close from '@assets/images/Amazon/close.svg'

const DETAIL = [
  {
    name: 'Deep Interceptor',
    imgSrc: interceptor,
    description:
      'When this configuration is activated, every interaction with the blockchain made through the MetaMask wallet will be intercepted. The contract call request will then undergo analysis. Only after the user has received the analyzed results and accepted any associated risks, will the request be sent to MetaMask. The request will proceed automatically only if no vulnerabilities are found.',
    note: 'The request delay time will increase depending on the analysis time of the contract.',
  },
  {
    name: 'Syncing Analyze Profile',
    imgSrc: sync,
    description:
      'When this configuration is activated, smart contract call actions and their analyzed results will be saved. This data will be stored for analysis and displayed in the profile dashboard of the main website.',
    note: 'It is recommended to keep this configuration option active to track interactions and analysis results for enhanced account security when the "deep interceptor" config is turned off.',
  },
  {
    name: 'Lockdown Communication',
    imgSrc: protectedRoad,
    description:
      'When this configuration is activated, the method used for communication between the dApp and MetaMask will be restricted, thereby enhancing the security of your interactions with dApps.',
    note: 'The activation of this configuration might affect other extensions.',
  },
]

export default function DetailCard({ index, setOpen }) {
  return (
    <div className="w-full h-[800px] absolute z-30 bg-black bg-opacity-65">
      <div className="mx-auto w-[300px] mt-14 bg-white h-[320px] border-[8px] border-[rgba(255,255,255,0.22)] rounded-lg">
        {/* name */}
        <div className="font-bold text-sm w-full bg-[#0079DD] text-white p-3 flex items-center justify-between">
          <img
            src={DETAIL[index - 1].imgSrc}
            width={35}
            height={35}
            className=" mr-2 rounded-full p-1"
          />
          {DETAIL[index - 1].name}
          <button onClick={() => setOpen(0)}>
            <img src={close} width={30} height={30} className="" />
          </button>
        </div>
        {/* detail info */}
        <div className="h-[256px] text-xs overflow-y-auto p-3 text-justify">
          {DETAIL[index - 1].description}
          {/* note */}
          <div className="mt-1 font-light">
            <span className="font-bold underline">Note:</span> {DETAIL[index - 1].note}
          </div>
        </div>
      </div>
    </div>
  )
}
