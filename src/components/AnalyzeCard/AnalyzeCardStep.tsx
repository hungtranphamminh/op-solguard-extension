import { useEffect, useState } from 'react'
import arrow from '@assets/images/Analyze/arrow.svg'
import Check from '@assets/images/Analyze/check.svg'
import Loader from '@src/screen/AnalyzeScreen/Loader'
import { LocalStorage } from '@src/utils/localStorage'
import arrowdetail from '@assets/images/Analyze/detail.svg'
import './loaderStyle.css'
import { walletFormatAddress } from '@src/utils/lib'
import { BASE_WEB_URL } from '@src/constants'
import dayjs from 'dayjs'

export default function AnalyzeCardStep({
  step,
  title,
  stepLoading,
  done,
  senderOrigin,
  data,
  chainId,
  mmMessage,
  setAgree,
  setClose,
  acceptTx,
}: any) {
  const countSeverity = (data, severity) => {
    let count = 0
    for (let i = 0; i < data.length; i++) {
      if (data[i].severity === severity) {
        count++
      }
    }
    return count
  }

  const formatTimestamp = (timestamp) => {
    const date = dayjs.unix(timestamp)
    return date.format('DD/MM/YY HH:mm')
  }

  useEffect(() => {
    if (mmMessage) console.log('passed in mm: ', mmMessage)
    console.log('data is: ', data)
  }, [])
  return (
    <div className="flex justify-start items-start gap-[8px] h-full w-full">
      {/* Step column */}
      <div className="relative flex flex-col items-start justify-start self-stretch">
        {/* Step index */}
        <div
          className=" 
        w-[32px] h-[32px] p-[4px] flex justify-center items-center bg-transparent text-[14px] font-[800] leading-7 text-[#FFF] font-DmMono border-solid border-[#5BFFFC] border relative"
        >
          {'0' + step}
        </div>

        {step !== 4 && (
          <div
            className={`w-[1px] h-[calc(100%-22px)] bg-[rgba(255,255,255,0.25)] absolute -translate-x-1/2 left-1/2 top-8`}
          ></div>
        )}
      </div>
      {/* Section content step 1*/}
      {step == 1 && (
        <div className="flex flex-col items-start bg-[rgba(25,57,67,0.05)] w-full  border-[0.5px] border-solid border-[rgba(165,210,200,0.25)] p-3">
          {/* Header */}
          <div className="flex justify-between items-center cursor-pointer w-full border-solid border-b border-b-[#5BFFFC] pb-2">
            <span className="text-[#5BFFFC] text-[13px] font-[700] leading-[13px] tracking-[-0.25px]">
              {title}
            </span>
            <img src={arrow} alt="" className=" size-[12px]" />
          </div>
          {/* Step content */}
          <div className=" mt-3 w-full">
            {/* Smart contract info code */}
            <div className=" mb-4">
              <p className="text-sm font-bold">Smart Contract Transaction </p>
              {/* time */}
              <div className="w-full flex items-center justify-between">
                <p className="">Time: </p>
                <p>{formatTimestamp(Date.now())}</p>
              </div>
              {/* chainId */}
              <div className="w-full flex items-center justify-between">
                <p className="">Chain ID :</p>
                <p>{chainId}</p>
              </div>
              {/* address */}
              {mmMessage && mmMessage.data.data.params[0].to ? (
                <div className="w-full flex items-center justify-between">
                  <p className="">Contract Address:</p>
                  <p>{walletFormatAddress({ address: mmMessage.data.data.params[0].to })}</p>
                </div>
              ) : (
                <></>
              )}
              {/* value */}
              {mmMessage && mmMessage.data.data.params[0].value ? (
                <div className="w-full flex items-center justify-between">
                  <p className="">Deposited Value:</p>
                  <p>{walletFormatAddress({ address: mmMessage.data.data.params[0].value })}</p>
                </div>
              ) : (
                <></>
              )}

              {/* name */}
              {data && data.name ? (
                <div className="w-full flex items-center justify-between">
                  <p className="">Contract Name:</p>
                  <p>{data.name}</p>
                </div>
              ) : (
                <></>
              )}
            </div>

            {stepLoading[0] ? (
              <div className="flex items-center justify-center">
                <div className="text-sm tracking-[-0.25px] font-[400px] text-[#CECBCF]">
                  Retrieving smart contract
                </div>
                <span className="ml-2 bg-teal-500 loading loading-infinity loading-md loading-info"></span>
              </div>
            ) : (
              <div className="flex items-center gap-2.5 justify-center">
                <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent font-bold text-sm">
                  Smart contract fully retrieved!
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Section content step 2*/}
      {step == 2 && (
        <div className="flex flex-col items-start bg-[rgba(25,57,67,0.05)] w-full  border-[0.5px] border-solid border-[rgba(165,210,200,0.25)] py-3">
          {/* Header */}
          <div className="flex justify-between items-center cursor-pointer w-full border-solid border-b border-b-[#5BFFFC] pb-2 px-3">
            <span className="text-[#5BFFFC] text-[14px] font-[700] leading-[14px]">{title}</span>
            <img src={arrow} alt="" className=" size-[12px]" />
          </div>
          {/* Section content */}
          <div className="flex flex-col items-center gap-4 w-full">
            {/* tool option */}

            {/* step progress note */}
            {stepLoading[1] ? (
              <div className="mt-4 text-[11px] leading-[13.2px] tracking-[-0.25px] text-[#CECBCF] font-[400] w-full px-3">
                <div className="relative h-[100px] w-[100px] mx-auto">
                  <div id="preloader">
                    <div id="loader"></div>
                  </div>
                </div>
                <div className="flex items-center justify-center mt-2">
                  <div className=" text-[#CECBCF] text-sm font-medium text-center">
                    Looking for vulnerabilities and risks with Solguard analyzer...
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center p-2 w-full h-[300px]">
                <div className="w-full h-[284px] ">
                  {data && data.standardize_result ? (
                    <>
                      <div className="text-base font-bold flex w-full items-center justify-between pb-4">
                        <div className="pt-2.5 text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-300">
                          Analyized Result
                        </div>
                        {/* detailed result */}
                        <div className="relative mt-3">
                          <button
                            className="flex items-center justify-center gap-1 text-[9px] font-bold text-[#140E24] w-11 bg-[#FFF] px-[5px] py-[1px] text-center relative z-10"
                            onClick={() => {
                              chrome.tabs.create({
                                url:
                                  BASE_WEB_URL +
                                  '/code-checker?id=' +
                                  data.unique_id +
                                  '&chainid=' +
                                  1 +
                                  '&contract_address=' +
                                  mmMessage.data.data.params[0].to,
                              })
                            }}
                          >
                            <p>Detail</p>
                            <img src={arrowdetail} width={10} height={10} alt="icon" />
                          </button>
                          <div className="absolute z-5 left-[3px] -bottom-[3px] h-[25px] w-11 border border-[#FFF]"></div>
                        </div>
                      </div>
                      {/* summary */}
                      <div className=" w-full flex flex-col items-center justify-between bg-white pt-2 rounded-[3px]">
                        {/* high */}
                        <div className=" px-3 flex w-full  items-center  justify-between font-semibold text-sm text-black pb-2 border-b border-b-black">
                          <p>Severity</p>
                          <p>Quantity</p>
                        </div>
                        <div className="px-4 flex w-full  my-1 rounded-lg p-2 items-center  justify-between font-semibold text-sm text-black border-[rgba(165,210,200,0.25)] border-b-[0.5px]">
                          <div className="flex items-center">
                            <div className="mr-2 size-6 bg-red-400 text-white text-2xl flex items-center justify-center">
                              H
                            </div>
                            <p>High</p>
                          </div>
                          <p>{countSeverity(data.standardize_result.result, 'High')}</p>
                        </div>
                        {/* medium */}
                        <div className="px-4 flex w-full  my-1 rounded-lg p-2 items-center  justify-between font-semibold text-sm text-black border-[rgba(165,210,200,0.25)] border-b-[0.5px]">
                          <div className="flex items-center">
                            <div className="mr-2 size-6 bg-yellow-200 text-white text-2xl flex items-center justify-center">
                              M
                            </div>
                            <p>Medium</p>
                          </div>
                          <p>{countSeverity(data.standardize_result.result, 'Medium')}</p>
                        </div>
                        {/* low */}
                        <div className="px-4 flex w-full  my-1 rounded-lg p-2 items-center  justify-between font-semibold text-sm text-black border-[rgba(165,210,200,0.25)] border-b-[0.5px]">
                          <div className="flex items-center">
                            <div className="mr-2 size-6 bg-teal-100 text-white text-2xl flex items-center justify-center">
                              L
                            </div>
                            <p>Low</p>
                          </div>
                          <p>{countSeverity(data.standardize_result.result, 'Low')}</p>
                        </div>
                      </div>
                      {/* optional data */}
                      <div className="flex w-full items-center justify-between text-xs mt-1">
                        <div>Result Saved</div>
                      </div>
                      {/* option button */}
                      <div className="flex items-center justify-center gap-12">
                        {/* accept */}
                        <div className="relative mt-3">
                          <button
                            className=" w-20 flex items-center justify-center gap-1 text-sm font-bold text-[#140E24]  bg-[#FFF] px-2 py-1 text-center relative z-10"
                            onClick={() => {
                              if (setAgree && setClose) {
                                setAgree(true)
                                setClose(true)
                              }
                            }}
                          >
                            <p className="bg-gradient-to-r from-emerald-500 to-lime-600 text-transparent bg-clip-text">
                              Accept
                            </p>
                          </button>
                          <div className="absolute z-5 left-[3px] -bottom-[3px] h-[25px] w-20 border border-[#FFF]"></div>
                        </div>

                        {/* reject */}
                        <div className="relative mt-3">
                          <button
                            className="w-20 flex items-center justify-center gap-1 text-sm font-bold text-[#140E24]  bg-[#FFF] px-2 py-1 text-center relative z-10"
                            onClick={() => {
                              if (setAgree && setClose) {
                                setAgree(false)
                                setClose(true)
                              }
                            }}
                          >
                            <p className="bg-clip-text bg-gradient-to-r from-red-400 to-red-900 text-transparent">
                              Reject
                            </p>
                          </button>
                          <div className="absolute z-5 left-[3px] -bottom-[3px] h-[25px] w-20 border border-[#FFF]"></div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Section content step 3*/}
      {step == 3 && (
        <div className="flex flex-col items-start bg-[rgba(25,57,67,0.05)] w-full  border-[0.5px] border-solid border-[rgba(165,210,200,0.25)] py-3">
          {/* Header */}
          <div className="w-full px-3">
            <div className="flex justify-between items-center cursor-pointer w-full border-solid border-b border-b-[#5BFFFC] pb-2">
              <span className="text-[#5BFFFC] text-[13px] font-[700] leading-[13px] tracking-[-0.25px]">
                {title}
              </span>
              <img src={arrow} alt="" className=" size-[12px]" />
            </div>
          </div>

          <div className="w-full  mt-4 items-center justify-center">
            <div className="flex items-center gap-[10px] self-stretch pl-6">
              {stepLoading[2] ? (
                <div className="flex items-center justify-center">
                  <div className="text-sm tracking-[-0.25px] font-[400px] text-[#CECBCF]">
                    {acceptTx ? 'Forwarding transaction' : 'Rejecting transaction'}
                  </div>
                  <span className="ml-2 bg-teal-500 loading loading-infinity loading-md loading-info"></span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <div className="text-sm tracking-[-0.25px] font-[400px] text-[#CECBCF]">
                    {acceptTx ? 'Transaction forwarded' : 'Transaction rejected!'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
