import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DalService, IScan } from '../services/dal.service';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
	public scans: IScan[];
	private _scansSubscription: Subscription;

	constructor(public dal: DalService) {
		this.scans = dal.fetch();
		this._scansSubscription = dal.subscribe((scans) => {
			this.scans = scans;
		});
	}

	ngOnDestroy() {
		this._scansSubscription.unsubscribe();
	}
}
