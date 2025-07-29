export interface Vehicle {
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    colour: string;
    id: string;
}

export interface FinanceQuote {
    onTheRoadPrice: number;
    totalDeposit: number;
    totalAmountOfCredit: number;
    numberOfMonthlyPayments: number;
    monthlyPayment: number;
}

export interface VehicleWithFormatted extends Vehicle {
    priceFormatted: string;
    mileageFormatted: string
  }