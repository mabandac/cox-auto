import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, throwError } from 'rxjs';
import { Vehicle, VehicleWithFormatted } from '../models/vehicle.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class VehicleService {
	constructor(private http: HttpClient) {}

	getVehicles(): Observable<VehicleWithFormatted[]> {
		return this.http.get<Vehicle[]>('data/vehicles.json').pipe(
		delay(500),
		map((vehicles) =>
			vehicles.map((v) => ({
				...v,
				priceFormatted: this.formatNumbers(v.price),
				mileageFormatted: this.formatNumbers(v.mileage)
			}))
		),
		catchError(error => {
			return throwError(() => new Error(`Error loading list of vehicles: ${error}`));
		}));
	}

	getVehicleById(id: string): Observable<VehicleWithFormatted | undefined> {
		return this.http.get<Vehicle[]>('data/vehicles.json').pipe(
			delay(500),
			map((vehicles) => {
				const vehicle = vehicles.find((v=> v.id == id));

				if(!vehicle) {
					throw new Error(`Vehicle with ID ${id} not found`);
				}

				return {
					...vehicle,
					priceFormatted: this.formatNumbers(vehicle.price),
					mileageFormatted: this.formatNumbers(vehicle.mileage)
				};
		}),
			catchError(error => {
				return throwError(() => new Error(`Failed to retrieve vehicle with ID ${id}: ${error}`));
			})
		);
	}

	//Format numbers assume 3 figures after decimal for mileage and price
	private formatNumbers(value: number):string {
		return value.toLocaleString('en-US');
	}
}



