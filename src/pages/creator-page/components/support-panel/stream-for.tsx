

export default function StreamForComponent({interval, forInterval, setForInterval}) {
    
    return (
        <div>
            <span> for </span>
            <input type="number" className=" appearance-none px-3 text-center focus:outline-none py-2 bg-graywhite-100 w-20 mx-auto rounded-md"
            value={forInterval}
            onChange={(e)=> setForInterval(parseFloat(e.target.value))}
             />
            <span> {interval.per} </span>
        </div>
    )
}
