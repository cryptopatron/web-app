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
    // amount_per is in full currency units.
    // So for example if the subscription is 3 USDC per payment,
    // amount_per would be 3,
    // not 3,000,000 (which might be expected because USDC has 6 decimals)
    amount_per: number,
    network: string,
    currency_name: string,
    payment_schedule: number[],
    to_address: string
}