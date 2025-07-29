import { Routes } from '@angular/router';
import { VehicleList } from './features/vehicle-list/vehicle-list';
import { VehicleDetail } from './features/vehicle-detail/vehicle-detail';

export const routes: Routes = [
	{ path: '', redirectTo: 'vehicles', pathMatch: 'full'}, // Default when empty
	{ path: 'vehicles', component: VehicleList },
	{ path: 'vehicles/:id', component: VehicleDetail},
];
