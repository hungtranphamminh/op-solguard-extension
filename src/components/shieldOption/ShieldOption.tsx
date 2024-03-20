import moreInfo from '@assets/images/Amazon/moreinfo.svg'
import { LocalStorage } from '@src/utils/localStorage'
import { useState, useEffect } from 'react'

export default function ShieldOption({ setOpen }) {
  const [config1, setConfig1] = useState(null)
  const [config2, setConfig2] = useState(null)
  const [config3, setConfig3] = useState(null)

  const handleChangeConfig = async (e, index) => {
    console.log('change value: ', e.target.checked)
    if (e.target.checked) {
      await LocalStorage.setConfigStatus(index, 1)
      updateConfig(index, 1)
    } else {
      const bef = await LocalStorage.getConfigStatus(index)

      console.log('before update: ', bef)
      await LocalStorage.setConfigStatus(index, 0)
      const befa = await LocalStorage.getConfigStatus(index)
      console.log('after update: ', befa)

      updateConfig(index, 0)
    }
  }

  const retrieveConfig = async () => {
    const configF = await LocalStorage.getConfigStatus(1)
    console.log('retrieved: ', configF)
    setConfig1(configF)
    const configS = await LocalStorage.getConfigStatus(2)
    setConfig2(configS)
    const configT = await LocalStorage.getConfigStatus(3)
    setConfig3(configT)
  }

  const updateConfig = async (index, value) => {
    if (index === 1) setConfig1(value)
    else if (index === 2) setConfig2(value)
    else setConfig3(value)
  }

  useEffect(() => {
    retrieveConfig()
  }, [])

  return (
    <div className=" w-[340px] mx-auto h-[240px] flex flex-col border-[8px] border-[rgba(255,255,255,0.12)] rounded-lg">
      <div className=" bg-white h-full w-full rounded-lg p-4">
        <p className="text-[#041E42] text-base font-bold">Shield Configuration:</p>
        {/* option sections */}
        <div className=" mt-2">
          {/* deep interceptor */}
          <div className=" flex items-center w-full justify-between">
            {config1 !== null ? (
              <label className="inline-flex items-center cursor-pointer ">
                <input
                  type="checkbox"
                  defaultChecked={config1 === 1}
                  className="sr-only peer"
                  onChange={(e) => handleChangeConfig(e, 1)}
                />
                <div
                  className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
              peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 
              peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
              after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 
              after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
              </label>
            ) : (
              <></>
            )}
            <div className="flex items-center gap-1">
              <div className="flex items-center ms-3 text-sm font-medium">
                <p>Deep Interceptor</p>
              </div>
              <button className="hover:cursor-pointer" onClick={() => setOpen(1)}>
                <img src={moreInfo} width={16} height={16} className="ml-2" />
              </button>
            </div>
          </div>
          {/* save history */}
          <div className="flex items-center w-full justify-between">
            {config2 !== null ? (
              <label className="inline-flex items-center cursor-pointer mt-2">
                <input
                  type="checkbox"
                  defaultChecked={config2 === 1}
                  className="sr-only peer"
                  onChange={(e) => handleChangeConfig(e, 2)}
                />
                <div
                  className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
             peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 
             peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
             after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 
             after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
              </label>
            ) : (
              <></>
            )}
            <div className="flex items-center gap-1">
              <div className="ms-3 text-sm font-medium ">Sync Analyze History</div>
              <button className="hover:cursor-pointer mt-2" onClick={() => setOpen(2)}>
                <img src={moreInfo} width={16} height={16} className="ml-2" />
              </button>
            </div>
          </div>

          {/* Wallet Lock */}
          <div className="flex w-full items-center justify-between">
            {config3 !== null ? (
              <label className="inline-flex items-center cursor-pointer mt-2">
                <input
                  type="checkbox"
                  defaultChecked={config3 === 1}
                  className="sr-only peer"
                  onChange={(e) => handleChangeConfig(e, 3)}
                />
                <div
                  className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
             peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 
             peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
             after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 
             after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
              </label>
            ) : (
              <></>
            )}

            <div className="flex items-center gap-1">
              <div className="ms-3 text-sm font-medium ">Lockdown Communication</div>
              <button className="hover:cursor-pointer" onClick={() => setOpen(3)}>
                <img src={moreInfo} width={16} height={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
        {/* protection level */}
        <div className=" mt-2">
          <p className="text-[#041E42] text-base font-bold">Protection Level:</p>

          <div className="flex items-center justify-between">
            {config1 + config2 + config3 === 1 ? (
              <div className="mt-2 flex items-center justify-start gap-[2px]">
                <div className={`w-[60px] h-[5px] rounded-xl bg-orange-500`}></div>
                <div className="text-orange-500 ml-4"> Medium</div>
              </div>
            ) : (
              <></>
            )}
            {config1 + config2 + config3 === 2 ? (
              <div className="mt-2 flex items-center justify-start gap-[2px]">
                <div className={`w-[60px] h-[5px] rounded-xl bg-yellow-300`}></div>
                <div className={`w-[60px] h-[5px] rounded-xl bg-yellow-300`}></div>
                <div className="text-yellow-300 ml-4"> Medium-High</div>
              </div>
            ) : (
              <></>
            )}
            {config1 + config2 + config3 === 3 ? (
              <div className="mt-2 flex items-center justify-start gap-[2px]">
                <div className={`w-[60px] h-[5px] rounded-xl bg-green-400`}></div>
                <div className={`w-[60px] h-[5px] rounded-xl bg-green-400`}></div>
                <div className={`w-[60px] h-[5px] rounded-xl bg-green-400`}></div>
                <div className="text-green-400 ml-4 font-bold"> High</div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
