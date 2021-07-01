

export default function StreamForComponent({interval, forInterval, setForInterval}) {
    
    return (
        <div>
            <span> for </span>
            <input type="number" className="px-3 text-center focus:outline-none py-2 bg-graywhite-100 w-20 mx-auto rounded-md"
            value={forInterval}
            onChange={(e)=> setForInterval(e.target.value)}
             />
            <span> {interval.per} </span>
        </div>
    )
}
