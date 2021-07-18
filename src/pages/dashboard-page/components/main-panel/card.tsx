
export default function CardComponent({ cardTitle, cardValue, cardSubtitle, cardIcon }) {
    return (
        <div className="grid shadow-float-900 bg-white rounded-md p-4 mx-3 sm:w-full sm:h-36">
            <div className="justify-self-start w-full">
                <div className=" flex flex-row justify-between font-medium text-gray-900">
                    <div>{cardTitle}</div>
                    <div><span className="text-gray-900 text-lg">{cardIcon}</span></div>
                </div>
                <div className="text-sm font-light text-gray-500 ">
                    {cardSubtitle}
                </div>    
            </div>
            <div className="flex flex-col justify-self-end  justify-end items-end">
                <div className=" text-4xl text-right">
                    {cardValue}
                </div>

            </div>
        </div>
    )
}
