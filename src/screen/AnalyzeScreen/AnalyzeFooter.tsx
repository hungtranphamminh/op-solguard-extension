import React from 'react'

type Props = {}

export default function AnalyzeFooter({}: Props) {
  return (
    <div className="flex flex-col justify-center items-center gap-3 w-full py-4 px-0 bg-[#041318] border-t-[0.5px] border-solid border-[#rgba(165,210,200,0.25)]">
      <p className=" text-[11px] font-normal leading-[100%] text-[#82959B]">Powered by Solguard</p>
      <div className="flex gap-2.5 items-center justify-center text-[#fff] leading-[100%] text-[11px] font-medium cursor-pointer">
        <span>Term</span>
        <span>Privacy</span>
      </div>
    </div>
  )
}
