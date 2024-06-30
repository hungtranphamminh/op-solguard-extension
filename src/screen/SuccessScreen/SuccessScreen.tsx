import LineRight from '@assets/images/Analyze/lineRight2.svg'
import LineLeft from '@assets/images/Analyze/lineLeft2.svg'
import Done from '@assets/images/Analyze/done.png'

export default function DoneScreen() {
  return (
    <div className="flex flex-col w-[320px] bg-cover bg-[url('../../assets/images/aptosbng.png')] bg-no-repeat font-monasans">
      <div className="py-[32px] flex items-center">
        <img src={LineLeft} className="w-[35px]" alt="line left" />
        <div className="flex flex-col items-center grow justify-center">
          <img src={Done} alt="done img" className="w-[40px] mb-[16px]" />
          <div className="text-[16px] leading-[16px] font-bold text-[#36F181] mb-[4px]">
            Login successfully
          </div>
          <div className="text-[14px] leading-[14px] font-light text-[#cecbcf] text-center">
            You're now able to use our service!
          </div>
        </div>
        <img src={LineRight} className="w-[35px]" alt="line right" />
      </div>
    </div>
  )
}
