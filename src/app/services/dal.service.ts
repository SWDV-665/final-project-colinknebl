import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class DalService {
	static key = 'scans';

	constructor() {}

	public save(title: string, data: string): number {
		const scans = this.fetch();
		const numOfScans = scans.unshift({
			date: new Date(),
			title,
			data,
		});
		this._commit(scans);
		return numOfScans;
	}

	public fetch(): IScan[] {
		let scans = localStorage.getItem(DalService.key);
		if (!scans) return [];
		return JSON.parse(scans);
	}

	private _commit(scans: IScan[]): void {
		localStorage.setItem(DalService.key, JSON.stringify(scans));
	}
}

interface IScan {
	date: Date;
	title: string;
	data: string;
}
