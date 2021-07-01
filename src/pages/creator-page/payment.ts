export interface Payment {
    amount?: number,
    type?: number, // 1 for stream, 2 for one-timer
    wallet?: string,
    creator?: string,
    isStreamIndefinite?: boolean,
    streamPer?: number // 1 for week, 2 for month, 3 for year
    streamPeriod?: number,

}