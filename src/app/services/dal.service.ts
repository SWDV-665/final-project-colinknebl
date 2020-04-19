import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DalService {
	private static _Instance: DalService;
	static key = 'scans';
	public dataChanged$: Observable<IScan[]>;
	private _dataChangedSubject: Subject<IScan[]>;

	constructor() {
		if (DalService._Instance) {
			return DalService._Instance;
		}
		DalService._Instance = this;
		this._dataChangedSubject = new Subject();
		this.dataChanged$ = this._dataChangedSubject.asObservable();
	}

	public subscribe(
		next?: (value: IScan[]) => void,
		error?: (error: any) => void,
		complete?: () => void
	) {
		return this.dataChanged$.subscribe(next, error, complete);
	}

	public save(data: string): number {
		const scans = this.fetch();
		const numOfScans = scans.unshift({
			date: new Date(),
			data,
		});
		this._commit(scans);
		this._dataChangedSubject.next(scans);
		return numOfScans;
	}

	public fetch(): IScan[] {
		let scans = localStorage.getItem(DalService.key);
		if (!scans) return [];
		const parsedScans = JSON.parse(scans);
		return parsedScans.map((scan) => ({
			data: scan.data,
			date: new Date(scan.date),
		}));
	}

	private _commit(scans: IScan[]): void {
		localStorage.setItem(DalService.key, JSON.stringify(scans));
	}
}

export interface IScan {
	date: Date;
	data: string;
}
