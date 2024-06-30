import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { OriginExtract } from '@src/utils/lib'
import DisStepHeader from './DisableStepHeader'
import AnalyzeCardStep from '@src/components/AnalyzeCard/AnalyzeCardStep'

import AnalyzeFooter from './AnalyzeFooter'
import { BASE_URL_API } from '@src/constants'
export default function AnalyzeScreen() {
  const [searchParams] = useSearchParams()
  const dAppOrigin = searchParams.get('dAppOrigin')
  console.log('data origin: ', dAppOrigin)
  const senderInfo = searchParams.get('senderInfo')
  const senderOrigin = ''
  const senderTabID = ''
  const message = JSON.parse(searchParams.get('txInfo'))
  const chainId = searchParams.get('chainId')
  console.log('message info retrieved: ', message)

  console.log('sender info found:', senderInfo)

  const [step, setStep] = useState(1)
  /* for showing | hiding steps */
  const [showStep, setShowStep] = useState([true, false, false, false])
  /* for step completion (completed or not) */
  const [stepStatus, setStepStatus] = useState([true, false, false, false])
  /* for step process (loading or done) */
  const [stepLoading, setStepLoading] = useState([true, true, true, true])

  const [contract, setContract] = useState<any>(null)

  const [contractInfo, setContractInfo] = useState<any>(null)
  const [analyzeRes, setAnalyzeRes] = useState<any>(null)

  const [acceptTx, setAcceptStatus] = useState<any>(null)
  const [isClose, setClose] = useState<any>(true)

  const [isWhitelisted, setWhitelisted] = useState<any>(false)

  let ref = useRef(null)

  useEffect(() => {
    /* analyze smart contract */
    RetrieveContract()
  }, [])

  const verifyWhitelist = async () => {
    try {
      await fetch(BASE_URL_API + '/whitelist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: message.data.data.params[0].to,
          chainId: chainId,
        }),
      }).then((response: any) => {
        console.log('whitelist response: ', response)
        if (response.data === 'whitelisted') {
          setAcceptStatus(true)
          setWhitelisted(true)
          setTimeout(() => {
            chrome.runtime
              .sendMessage({
                action: 'proceed message',
                data: {
                  id: senderInfo,
                  status: acceptTx,
                  mmMessage: message,
                },
              })
              .then((res) => {
                changeStepStatus(setStepLoading, 3, false)
                changeStepStatus(setStepStatus, 3, true)
              })
          }, 3000)
        }
      })
    } catch (error) {
      console.log('Whitelist error: ', error)
    }
  }

  const RetrieveContract = async () => {
    try {
      const chainNumber = chainId.slice(2)
      const fetchParams = '?address=' + message.data.data.params[0].to + '&chainid=' + chainNumber

      await fetch(BASE_URL_API + '/api/source_code' + fetchParams, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      })
        .then((response: any) => response.json())
        .then((data: any) => {
          console.log('contract data: ', data)
          setContractInfo({
            name: data.data.main_contract,
            setAgree: setAcceptStatus,
            next: handleDecision,
          })
          AnalyzeContract()
        })
    } catch (error) {
      console.log('Retrieve contract error: ', error)
    }
  }

  const changeStepStatus = (statusArray, step, value) => {
    statusArray((prevStatus) => {
      var tempStatus = [...prevStatus]
      tempStatus[step - 1] = value
      return tempStatus
    })
  }

  const AnalyzeContract = async () => {
    setStep(2)
    changeStepStatus(setShowStep, 2, true)

    const chainNumber = chainId.slice(2)

    try {
      await fetch(BASE_URL_API + '/api/analysis/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({
          address: message.data.data.params[0].to,
          chainid: chainNumber,
          wallet_address: message.data.data.params[0].from,
          dApp: dAppOrigin,
          decision: 'Approved',
        }),
      })
        .then((response: any) => response.json())
        .then((data: any) => {
          console.log('analyize result: ', data)
          changeStepStatus(setStepLoading, 2, false)
          changeStepStatus(setStepStatus, 2, true)
          setAnalyzeRes(data.data)
        })
    } catch (error) {
      console.log('Analyze contract error: ', error)
    }
  }

  const handleDecision = async () => {
    setStep(3)
    changeStepStatus(setShowStep, 3, true)
    /* send code to background */

    setTimeout(() => {
      chrome.runtime
        .sendMessage({
          action: 'proceed message',
          data: {
            id: senderInfo,
            status: acceptTx,
            mmMessage: message,
          },
        })
        .then((res) => {
          changeStepStatus(setStepLoading, 3, false)
          changeStepStatus(setStepStatus, 3, true)
        })
    }, 3000)
  }

  return (
    <div className="overflow-hidden h-[520px] w-[320px] bg-[url('../../assets/images/aptosbng.png')] bg-center  pt-[24px] text-[#FFF] flex flex-col  justify-between items-center font-monasans relative">
      {/* confirm overlay */}
      {acceptTx !== null && isClose && (
        <div className="absolute w-[320px] h-[520px] top-0 left-0 bg-black bg-opacity-80 z-[100]">
          <div className="mx-auto mt-[120px] bg-white w-[230px] flex flex-col items-center relative p-2 rounded-md">
            {acceptTx ? (
              <div className="flex flex-col items-start ">
                <div className=" flex-wrap text-black text-sm text-center font-semibold">
                  Do you want to continue this transaction despite of the risks?
                </div>
                {!isWhitelisted && (
                  <div className="form-control mt-2">
                    <label className="cursor-pointer label">
                      <input
                        type="checkbox"
                        defaultChecked={false}
                        className="checkbox checkbox-info size-4"
                      />
                      <span className="label-text ml-2">Add to whitelist</span>
                    </label>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-start">
                <div className=" flex-wrap text-black text-sm text-center font-semibold">
                  Please confirm the cancelation of this transaction?
                </div>
              </div>
            )}
            {/* confirm btn */}
            <div className="flex items-center w- justify-center gap-12">
              {/* accept */}
              <div className="relative mt-3">
                <button
                  className="bg-[rgb(91,255,252)] w-20 flex  items-center justify-center gap-1 text-sm font-bold text-[#140E24]  px-2 py-1 text-center relative z-10"
                  onClick={() => {
                    setClose(false)
                    handleDecision()
                  }}
                >
                  <p className="text-white">Confirm</p>
                </button>
                <div className="absolute z-5 left-[3px] -bottom-[3px] h-[25px] w-20 border border-[#FFF]"></div>
              </div>

              {/* reject */}
              <div className="relative mt-3">
                <button
                  className="bg-white border border-[rgb(91,255,252)] w-20 flex items-center justify-center gap-1 text-sm font-bold text-[#140E24]  px-2 py-1 text-center relative z-10"
                  onClick={() => {
                    setClose(false)
                    setAcceptStatus(null)
                  }}
                >
                  <p className=" text-black  ">Cancel</p>
                </button>
                <div className="absolute z-5 left-[3px] -bottom-[3px] h-[25px] w-20 border border-[#FFF]"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* step 1 */}
      <div className="h-[400px] no-scrollbar overflow-x-hidden overflow-y-scroll flex flex-col items-center justify-start w-full gap-3 pr-[12px] pl-[8px]">
        {step === 1 ? (
          <>
            <AnalyzeCardStep
              step={1}
              title={'Retrieve Smart Contract'}
              stepLoading={stepLoading}
              currentref={ref}
              done={stepStatus[0]}
              senderOrigin={senderOrigin}
              data={contractInfo}
              chainId={chainId}
              mmMessage={message}
            />
          </>
        ) : (
          <button
            className="w-full "
            onClick={() => {
              if (showStep[0]) setStep(1)
            }}
          >
            <DisStepHeader done={stepStatus[0]} step={1} title={'Retrieve Smart Contract'} />
          </button>
        )}
        {/* <div className="ml-3 h-4 border-l border-[#bdbdbd]"></div> */}
        {/* step 2 */}
        {step === 2 ? (
          <div className="w-full">
            <AnalyzeCardStep
              step={2}
              title={`Analyze Smart Contract`}
              stepLoading={stepLoading}
              currentref={ref}
              done={stepStatus[0]}
              senderOrigin={senderOrigin}
              data={analyzeRes}
              setAgree={setAcceptStatus}
              setClose={setClose}
              mmMessage={message}
            />
          </div>
        ) : (
          <button
            className="w-full "
            onClick={() => {
              if (showStep[1]) setStep(2)
            }}
          >
            <DisStepHeader done={stepStatus[1]} step={2} title={`Analyze Smart Contract`} />
          </button>
        )}
        {/* step 3 */}
        {step === 3 ? (
          <div className="w-full">
            <AnalyzeCardStep
              step={3}
              title={'Proceed Transaction'}
              stepLoading={stepLoading}
              currentref={ref}
              done={stepStatus[0]}
              senderOrigin={senderOrigin}
              acceptTx={acceptTx}
            />
          </div>
        ) : (
          <button
            className="w-full "
            onClick={() => {
              if (showStep[2]) setStep(3)
            }}
          >
            <DisStepHeader done={stepStatus[2]} step={3} title={'Summary Result'} />
          </button>
        )}
        {/* end part */}
        {!stepLoading[2] && (
          <div className="w-full flex flex-col items-center text-center gap-[10px] h-[140px] justify-center">
            <div className="text-white text-[16px] font-medium leading-[100%] tracking-[-0.25px]">
              Thank you for using our service!
            </div>
            <div className=" text-[14px] font-[300] text-[#CECBCF]">
              This window can now be closed.
            </div>
          </div>
        )}
      </div>
      <AnalyzeFooter />
    </div>
  )
}
