import blackcheck from '@assets/images/Amazon/blackcheck.svg'

import arrow from '@assets/images/Amazon/arrow.svg'
export default function DisStepHeader({ done, step, title }: any) {
  return (
    <div className="flex items-center justify-start gap-[8px] w-full">
      <div className="relative flex flex-col items-center self-start">
        <div
          className={`size-[32px] border-solid border border-[#82959B] flex items-center justify-center text-[14px] font-[800] leading-7 text-[#82959B]  font-DmMono  ${
            !done ? 'bg-transparent' : 'bg-[#5BFFFC]'
          }`}
        >
          {!done ? '0' + step : <img src={blackcheck} alt="check icon" width={20} />}
        </div>
        {done && (
          <div className="w-[1px] h-[12px] bg-[rgba(255,255,255,0.25)] absolute top-[32px]"></div>
        )}
      </div>
      {/* Step title */}
      <div className="flex justify-between bg-[rgba(25,57,67,0.05)] items-center w-full h-8 p-4 border-[0.5px] border-solid border-[rgba(165,210,200,0.25)]">
        <div
          className={`${
            !done ? `text-white` : `text-[#5BFFFC]`
          } text-[13px] leading-[13px] font-bold tracking-[-0.26px]`}
        >
          {title}
        </div>
        <img src={arrow} alt="" className=" size-[12px]" />
      </div>
    </div>
  )
}
