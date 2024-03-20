import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { clusterApiUrl, Connection, PublicKey, Keypair } from '@solana/web3.js'
import { encodeURL, createQR } from '@solana/pay'
import BigNumber from 'bignumber.js'
import { ValidatePayment } from '@src/utils/TransactionValidate/qrValidator'

import ActiveStepHeader from './ActiveStepHeader'
import DisStepHeader from './DisableStepHeader'
import Loader from './Loader'
import Amazon from '@assets/images/Amazon/amazon.png'
import Check from '@assets/images/Amazon/check.svg'
import AmazonCardStep from '@src/components/AmazonCard/AmazonCardStep'
//Img
import bg from '@assets/images/Amazon/bg.png'
import bg1 from '../../assets/images/Amazon/bg.png'
import AmazonFooter from './AmazonFooter'
export default function AmazonScreen() {
  const [step, setStep] = useState(1)
  /* for showing | hiding steps */
  const [showStep, setShowStep] = useState([true, false, false, false])
  /* for step completion (completed or not) */
  const [stepStatus, setStepStatus] = useState([true, false, false, false])
  /* for step process (loading or done) */
  const [stepLoading, setStepLoading] = useState([true, true, true, true])

  let ref = useRef(null)

  useEffect(() => {
    /* Establish a connection */
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

    /* Create a payment request link */
    const payment_recipient = new PublicKey('E3z9bv1GbWMceWQ34Waxcgi3C6c9FQevYSbjPckY8Ccp') // <- Merchant address
    const payment_amount = new BigNumber(0.001634) // <- Item price
    const splToken = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU') // <- Token address
    const payment_reference = new Keypair().publicKey // <- Reference(key) for tracking/validating transaction
    const payment_label = 'Savita Gems'
    const payment_message =
      'Natural Picture Jasper Beads Stretchable Bracelet, Approx 4 MM Smooth Round Beads, Stretchable Jasper Bracelet, Adjustable'
    const payment_memo = '#' + 'OrderID1945' // <- Transaction memo -> memo program

    const url = encodeURL({
      recipient: payment_recipient,
      amount: payment_amount,
      splToken: splToken,
      reference: payment_reference,
      label: payment_label,
      message: payment_message,
      memo: payment_memo,
    })

    /* Encode link into a QR code & Add the QR code to your payment page */
    const qrCode = createQR(url, 171, '#140E24', '#FFF')
    qrCode.append(ref.current)

    /* Check for payment status */
    TrackPaymentProcess(payment_reference, connection, payment_recipient, payment_amount, splToken)
  }, [])

  const TrackPaymentProcess = async (
    payment_reference,
    connection,
    payment_recipient,
    payment_amount,
    splToken
  ) => {
    try {
      const paymentStatus = await ValidatePayment(
        payment_reference,
        connection,
        payment_recipient,
        payment_amount,
        splToken
      )
      console.log('payment Status: ', paymentStatus)

      /* if payment is validated -> simulate step 2 */
      changeStepStatus(setStepLoading, 1, false)

      await simulateStep2()
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

      setTimeout(() => {
        simulateStep3()
      }, 2000)
    }, 3000)
  }

  const simulateStep3 = async () => {
    setStep(3)
    changeStepStatus(setShowStep, 3, true)
    /* send code to background */
    // await setTimeout(()=>{
    //     changeStepStatus(setStepLoading,3,false)
    //     changeStepStatus(setStepStatus,3,true)
    // },3000)
    chrome.runtime.sendMessage(
      {
        action: 'applyGiftCard',
        data: 'G6HA-IJ5K-LYUV-WZ14-DQ0R',
      },
      (response) => {
        console.log('response from background is: ', response)
        if (response.success) {
          changeStepStatus(setStepLoading, 3, false)
          changeStepStatus(setStepStatus, 3, true)
          setTimeout(() => {
            simulateStep4()
          }, 2000)
        }
      }
    )
  }

  const simulateStep4 = async () => {
    setStep(4)
    changeStepStatus(setShowStep, 4, true)

    chrome.runtime.sendMessage(
      {
        action: 'placeOrder',
      },
      (response) => {
        console.log('response from background is: ', response)
        if (response.success) {
          setTimeout(() => {
            changeStepStatus(setStepLoading, 4, false)
            changeStepStatus(setStepStatus, 4, true)
          }, 2000)
        }
      }
    )
  }

  return (
    <div className="w-[320px] h-[600px] bg-[url('../../assets/images/Amazon/bg.png')] bg-cover bg-no-repeat pr-[12px] pl-[8px] pt-[24px] pb-[16px] text-[#FFF] flex flex-col  justify-between items-center font-monasans m-0">
      {/* step 1 */}
      <div className="flex flex-col items-center justify-between w-full gap-4">
        {step === 1 ? (
          <>
            {/* <div>
                <ActiveStepHeader step={1} title={'Deposit Required USDC'} />
                <div
                  style={{ border: 'linear-gradient(90deg, #8531DA 0%, rgba(255, 65, 236, 0.00) 100%)' }}
                  className="pl-4 ml-3 border-l "
                >
                  <div className="bg-transparent border rounded-lg" ref={ref}></div>
                  {stepLoading[0] ? (
                    <div className="mt-2 text-xs opacity-50">
                      Scan the QR with a Solana compatible mobile crypto wallet.
                    </div>
                  ) : (
                    <div className="mt-2 text-xs text-green-600">Order value in USDC deposited!</div>
                  )}
                </div>
              </div> */}
            <AmazonCardStep
              step={1}
              title={'Deposit Required USDC'}
              stepLoading={stepLoading}
              currentref={ref}
            />
          </>
        ) : (
          <button
            className="w-full "
            onClick={() => {
              if (showStep[0]) setStep(1)
            }}
          >
            <DisStepHeader done={stepStatus[0]} step={1} title={'Deposit Required USDC'} />
          </button>
        )}
        {/* <div className="ml-3 h-4 border-l border-[#bdbdbd]"></div> */}
        {/* step 2 */}
        {step === 2 ? (
          <div className="w-full">
            {/* <ActiveStepHeader step={2} title={'Convert to Amazon Balance'} />
            <div className="ml-3 pl-4 border-l border-[#8531DA]">
              <div className="w-full flex flex-col gap-[16px] justify-between items-start h-fit">
                <div className="relative items-center block max-w-sm p-3 bg-white border border-gray-100 rounded-lg shadow-md h-fit w-fit ">
                  <div className="flex flex-col gap-2 w-fit">
                    <div className="flex items-center justify-between w-full gap-4">
                      <img
                        src={Amazon}
                        alt="amazon logo"
                        width={100}
                        className={`${stepLoading[1] ? 'opacity-20' : ''}`}
                      />
                      <div
                        className={`text-[#444444] font-normal ${
                          stepLoading[1] ? 'opacity-20' : ''
                        } mt-1 p-1 bg-slate-200 rounded-lg shadow-md`}
                      >
                        $16.43
                      </div>
                    </div>
                    <div
                      className={`text-[#868686] mt-1 border-t font-normal ${
                        stepLoading[1] ? 'opacity-20' : ''
                      }`}
                    >
                      Amazon Gift Card
                    </div>
                  </div>
                  {stepLoading[1] ? (
                    <div
                      role="status"
                      className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  style={{
                    background: 'linear-gradient(180deg, #0D1A2D 0%, #0C2527 100%)',
                    border: '1px solid rgba(103, 174, 214, 0.50)',
                  }}
                  className="flex justify-between items-start self-stretch px-2 py-2.5 rounded-lg"
                >
                  <div className='flex items-center gap-[10px] self-stretch'>
                      <div className='w-[1px] h-[16px] bg-[#3FFEA2]'></div>
                      <div className="font-[500] leading-[100%] text-[12px] uppercase">Order Total</div>
                  </div>
                  <div className="font-[300] text-[30px] leading-[100%] text-[#52FF97] uppercase">$16.43</div>
                </div>
              </div>
              {stepLoading[1] ? (
                <div className="mt-2 text-xs opacity-50">
                  An Amazon gift card with the value equivalent to the amount of USDC you just
                  deposited is being registered.
                </div>
              ) : (
                <div className="mt-2 text-xs text-green-600">
                  Equivalent Amazon gift card registered!
                </div>
              )}
            </div> */}
            <AmazonCardStep
              step={2}
              title={'Convert to Amazon Balance'}
              stepLoading={stepLoading}
              currentref={ref}
            />
          </div>
        ) : (
          <button
            className="w-full "
            onClick={() => {
              if (showStep[1]) setStep(2)
            }}
          >
            <DisStepHeader done={stepStatus[1]} step={2} title={'Convert to Amazon Balance'} />
          </button>
        )}
        {/* <div className="ml-3 h-4 border-l border-[#bdbdbd]"></div> */}
        {/* step 3 */}
        {step === 3 ? (
          <div className="w-full">
            {/* <ActiveStepHeader step={3} title={'Apply Card for Payment'} />
            <div className="ml-3 pl-4 border-l border-[#bdbdbd] mr-[20px]">
              <div className="flex items-center justify-between w-full px-2 py-1 text-sm border rounded-lg">
                <div className="text-xs">G6HA-IJ5K-LYUV-WZ14-DQ0R</div>
                <div className="pl-2 border-l">
                  {stepLoading[2] ? (
                    <Loader size={6} />
                  ) : (
                    <img src={Check} alt="check icon" width={20} className="bg-green-500" />
                  )}
                </div>
              </div>
              {stepLoading[2] ? (
                <div className="mt-2 text-xs opacity-50">
                  Applying the newly registered Amazon gift card balance to order's payment method.
                </div>
              ) : (
                <div className="mt-2 text-xs text-green-600">
                  Gift card balance applied for payment!
                </div>
              )}
            </div> */}
            <AmazonCardStep
              step={3}
              title={'Apply Card for Payment'}
              stepLoading={stepLoading}
              currentref={ref}
            />
          </div>
        ) : (
          <button
            className="w-full "
            onClick={() => {
              if (showStep[2]) setStep(3)
            }}
          >
            <DisStepHeader done={stepStatus[2]} step={3} title={'Apply Card for Payment'} />
          </button>
        )}
        {/* <div className="ml-3 h-4 border-l border-[#bdbdbd]"></div> */}
        {/* step 4 */}
        {step === 4 ? (
          <div className="w-full">
            {/* <ActiveStepHeader step={4} title={'Place Order'} />
            <div className="ml-3 pl-4 mr-6 border-l border-[#bdbdbd]">
              <div className="flex items-center justify-between w-full">
                <div className="mt-2 text-sm opacity-50">
                  {stepLoading[3]
                    ? 'Your order is being placed!'
                    : 'Your order has been placed successfully!'}
                </div>
                {stepLoading[3] ? (
                  <Loader size={6} />
                ) : (
                  <img src={Check} alt="check icon" width={20} className="bg-green-500" />
                )}
              </div>
            </div> */}
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
        )}
        {/* end part */}
        {/* <div className="ml-3 h-4 border-l border-[#bdbdbd]"></div> */}
        {!stepLoading[3] && (
          <div className="w-full flex flex-col items-center text-center gap-[10px]">
            <div className="text-[#36F181] text-[20px] font-[700]">
              Thanks for using our service!
            </div>
            <div className=" text-[16px] font-[300]">This window can now be closed.</div>
          </div>
        )}
      </div>
      <AmazonFooter />
    </div>
  )
}
