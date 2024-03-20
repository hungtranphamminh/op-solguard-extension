type Props = {}

export default function AmazonFooter({}: Props) {
  return (
    <div className="flex flex-col justify-center items-center w-full pt-2 pb-4 font-DmMono">
      <p className="text-[#777481] text-[11px] not-italic font-normal leading-[100%] mb-[6px]">
        Developed by Esol Labs
      </p>
      <p className="text-[#777481] text-[11px] not-italic font-normal leading-[100%] mb-[6px]">
        Powered by Solana
      </p>
      <div className="flex gap-[10px] items-center justify-center text-[#36F181] text-[10px] font-[400] underline cursor-pointer">
        <span>Term</span>
        <span>Privacy</span>
      </div>
    </div>
  )
}
