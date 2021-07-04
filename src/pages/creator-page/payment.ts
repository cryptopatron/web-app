export interface Payment {
    amount?: number,
    type?: number, // 1 for stream, 2 for one-timer
    isStreamIndefinite?: boolean,
    streamPer?: string 
    streamFor?: number,
}