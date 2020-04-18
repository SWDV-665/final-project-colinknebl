import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-scan',
	templateUrl: './scan.component.html',
	styleUrls: ['./scan.component.scss'],
})
export class ScanComponent implements OnInit {
	constructor() {
		console.log('scan constructor');
	}

	ngOnInit() {
		console.log('on init!');
	}
}
