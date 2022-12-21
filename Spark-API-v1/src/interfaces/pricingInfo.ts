export default interface PricingInfo {
    type: string;
    description: string;
    start: number;
    minute: number;
    parking: number;
    discountStartFee: number;
    discountEndParkingZone: number;
    discountEndCharging: number;
}
