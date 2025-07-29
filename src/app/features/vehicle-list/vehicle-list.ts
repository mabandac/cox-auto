import { Component, OnInit, computed, signal } from '@angular/core';
import { VehicleWithFormatted } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './vehicle-list.html',
  styleUrls: ['./vehicle-list.scss']
})
export class VehicleList implements OnInit{
  
  //Load vehicle data
  readonly allVehicles = signal<VehicleWithFormatted[]>([]);

  //State management signals
  readonly sortKey = signal<'price' | 'year' | 'mileage'>('price');
  readonly sortOrder = signal<'asc' | 'desc'>('asc');
  readonly termFilter = signal('');

  //Signal to sort and filter vehicles
  readonly sortedVehicles = computed(() => {
    let vehicles =  this.allVehicles();
    
    //Filter by search term
    const term = this. termFilter().toLowerCase();
    if (term) {
      vehicles = vehicles.filter((v) =>
        `${v.make} ${v.model}`.toLowerCase().includes(term)
      );
    }
  

    //Sorting
    const key = this.sortKey();
    const dir = this.sortOrder();

    vehicles = vehicles.sort((a, b) => {
      const valA =  a[key];
      const valB =  b[key];
      return dir === 'asc' ? valA - valB: valB - valA;
    });

    return vehicles;
  });
  

  constructor (private vehicleService: VehicleService){}

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe({
      next: vehicles => this.allVehicles.set(vehicles),
      error: err => { 
        console.error('Failed to get vehicle data', err);
      }
    });
  }

  //Vehicle search
  searchVehicle(term: string) {
    if(term.length >=3 || term.length ===0) {
      this.termFilter.set(term);
    }
  }

  //Sort direction
  direction(dir: 'asc' | 'desc') {
    this.sortOrder.set(dir);
  }

  //Category sorting
  sort(key: string){
    this.sortKey.set(key as 'price' | 'mileage' | 'year');
  }


}
