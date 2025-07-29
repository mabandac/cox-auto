import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FinanceQuote, VehicleWithFormatted } from '../../models/vehicle.model';
import { FinanceCalculator } from '../../services/finance-calculator.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './vehicle-detail.html',
  styleUrl: './vehicle-detail.scss'
})
export class VehicleDetail implements OnInit {
  vehicle = signal<VehicleWithFormatted | undefined>(undefined);
  pageError = signal('');

  term = 60; //default term in months
  deposit = 10; //deafult deposit percentage
  quote?: FinanceQuote;


  constructor (
    private vehicleService: VehicleService,
    private financeCalculatorService: FinanceCalculator,
    private route: ActivatedRoute
  ){}

  ngOnInit() : void {
    //Get id from route and retrieve data to display
    this.route.paramMap.subscribe(params => { 
      const id = params.get('id');
      if(id) {
        this.vehicleService.getVehicleById(id).subscribe({
          next: (v) => {
            if(!v) {
              this.pageError.set('No vehicle found.');
              return;
            }

            this.vehicle.set(v);
            this.calculatedFinance();
            },
            error: () => {
              this.pageError.set('Could not load vehicle details.');
            }
          });
      } else {
        this.pageError.set('Invalid ID.');
      }
    });
  }

  calculatedFinance() {
    const vehicle = this.vehicle();

    if(!vehicle) return;

    const depositAmount = (this.deposit/100) * vehicle.price;

    this.financeCalculatorService.calculateFinance(vehicle, this.term, depositAmount).subscribe({
      next: (quote) => {
        this.quote = quote;
      },
      error: () => {
        this.pageError.set('Failed to calculate finance quote.');
      }
    });

  }
}