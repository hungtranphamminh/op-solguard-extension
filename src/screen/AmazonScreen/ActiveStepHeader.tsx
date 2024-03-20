export default function ActiveStepHeader({step, title}:any){
    return(
        <div className="flex items-center justify-start py-2">
            <div className="mr-2 w-6 h-6 flex items-center justify-center bg-[#a9dd56] rounded-full text-white text-[14px]">
                {step}
            </div>
            <div className="font-medium text-[#FFF]">
                {title}
            </div>
        </div>
    )
}