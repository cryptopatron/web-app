export interface OneTimePayment {
    // amount is in full currency units.
    // So for example if the payment is for USDC,
    // amount would be 3,
    // not 3,000,000 (which might be expected bc USDC has 6 decimals)
    amount: number,
    network: string,
    currency_name: string,
    to_address: string
}

export interface Subscription {
    // amount_per_day is in full currency units.
    // So for example if the subscription is at a rate of 3 USDC per day,
    // amount_per_day would be 3,
    // not 3,000,000 (which might be expected bc USDC has 6 decimals)
    amount_per_day: number,
    frequency_type: number, // 0 for weekly, 1 for monthly
    network: string,
    currency_name: string,
    expiry: number,
    to_address: string
}