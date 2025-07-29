import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FinanceQuote, Vehicle } from '../models/vehicle.model';

@Injectable({
    providedIn: 'root'
})

export class FinanceCalculator {
    constructor() {}

    calculateFinance(vehicle: Vehicle, term: number, deposit: number): Observable<FinanceQuote> {
        const onTheRoadPrice = vehicle.price;
        const totalDeposit = deposit;
        const totalAmountOfCredit = onTheRoadPrice - totalDeposit;
        const numberOfMonthlyPayments = term;
        const monthlyPayment = totalAmountOfCredit / term;


        return of({
            onTheRoadPrice,
            totalDeposit,
            totalAmountOfCredit,
            numberOfMonthlyPayments,
            monthlyPayment: Math.round(monthlyPayment * 100) /100
        })
        
    }
}



