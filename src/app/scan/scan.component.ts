import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-scan',
	templateUrl: './scan.component.html',
	styleUrls: ['./scan.component.scss'],
})
export class ScanComponent implements OnInit {
	@Input() date: string;

	@Input() data: string;

	constructor() {}

	ngOnInit() {
		if (this.date) {
			this.date = this.formattedDate(new Date(this.date));
		}
	}

	public formattedDate(d: Date): string {
		return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
	}
}
