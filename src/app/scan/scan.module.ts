import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanComponent } from './scan.component';

@NgModule({
	declarations: [ScanComponent],
	exports: [ScanComponent],
	imports: [CommonModule, FormsModule, IonicModule],
})
export class ScanComponentModule {}
