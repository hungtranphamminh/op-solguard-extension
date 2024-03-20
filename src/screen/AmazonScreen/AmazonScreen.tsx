import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { OriginExtract } from '@src/utils/lib'
import DisStepHeader from './DisableStepHeader'
import AmazonCardStep from '@src/components/AmazonCard/AmazonCardStep'

import AmazonFooter from './AmazonFooter'
export default function AmazonScreen() {
  const [searchParams] = useSearchParams()
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

  const [contractInfo, setContractInfo] = useState<any>(null)
  const [analyzeRes, setAnalyzeRes] = useState<any>(null)

  const [acceptTx, setAcceptStatus] = useState<any>(null)
  const [isClose, setClose] = useState<any>(true)

  let ref = useRef(null)

  useEffect(() => {
    /* Encode link into a QR code & Add the QR code to your payment page */

    /* Check for payment status */
    TrackPaymentProcess()

    console.log('document location: ', document.location)
  }, [])

  const TrackPaymentProcess = async () => {
    try {
      /* if payment is validated -> simulate step 2 */
      setTimeout(async () => {
        changeStepStatus(setStepLoading, 1, false)
        setContractInfo({
          name: 'wormhole',
          setAgree: setAcceptStatus,
          next: simulateStep3,
        })
        await simulateStep2()
      }, 7000)
    } catch (error) {
      console.log('payment error: ', error)
    }
  }

  const changeStepStatus = (statusArray, step, value) => {
    statusArray((prevStatus) => {
      var tempStatus = [...prevStatus]
      tempStatus[step - 1] = value
      return tempStatus
    })
  }

  const simulateStep2 = async () => {
    setStep(2)
    changeStepStatus(setShowStep, 2, true)

    setTimeout(async () => {
      changeStepStatus(setStepLoading, 2, false)
      changeStepStatus(setStepStatus, 2, true)

      const mockup_result = {
        time: '32s',
        result: {
          high: '1',
          medium: '0',
          low: '0',
        },
      }
      setAnalyzeRes(mockup_result)
      // setTimeout(() => {
      //   simulateStep3()
      // }, 2000)
    }, 3)
  }

  const simulateStep3 = async () => {
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
              </div>
            ) : (
              <div className="flex flex-col items-start">
                <div className=" flex-wrap text-black text-sm text-center font-semibold">
                  Please confirm the cancelation of this transaction?
                </div>
                <div className="form-control mt-2">
                  <label className="cursor-pointer label">
                    <input
                      type="checkbox"
                      defaultChecked={false}
                      className="checkbox checkbox-info size-4"
                    />
                    <span className="label-text ml-2">Add to blacklist</span>
                  </label>
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
                    simulateStep3()
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
            <AmazonCardStep
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
            <AmazonCardStep
              step={2}
              title={`Analyze Smart Contract`}
              stepLoading={stepLoading}
              currentref={ref}
              done={stepStatus[0]}
              senderOrigin={senderOrigin}
              data={analyzeRes}
              setAgree={setAcceptStatus}
              setClose={setClose}
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
            <AmazonCardStep
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
        {/* step 4 */}
        {/* {step === 4 ? (
          <div className="w-full">
            <AmazonCardStep
              step={4}
              title={'Place Order'}
              stepLoading={stepLoading}
              currentref={ref}
            />
          </div>
        ) : (
          <button
            className="w-full "
            onClick={() => {
              if (showStep[3]) setStep(4)
            }}
          >
            <DisStepHeader done={stepStatus[3]} step={4} title={'Place Order'} />
          </button>
        )} */}
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
      <AmazonFooter />
    </div>
  )
}
