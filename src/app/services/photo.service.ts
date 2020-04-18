import { Injectable } from '@angular/core';
import {
	Plugins,
	CameraResultType,
	Capacitor,
	FilesystemDirectory,
	CameraPhoto,
	CameraSource,
} from '@capacitor/core';

import QrCode from 'qrcode-reader';
import { DalService } from './dal.service';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
	providedIn: 'root',
})
export class PhotoService {
	static CameraOptions = {
		resultType: CameraResultType.Uri,
		source: CameraSource.Camera,
		quality: 100,
	};
	private qr: {
		decode(path: string): IScan;
		callback(error: Error, result: IScan): void;
	};
	private _dal: DalService = new DalService();

	constructor() {
		this._initQrCodeReader();
	}

	public async addNewToGallery() {
		const capturedPhoto = await Camera.getPhoto(PhotoService.CameraOptions);

		this.qr.decode(capturedPhoto.webPath);
	}

	private _initQrCodeReader(): void {
		this.qr = new QrCode();
		this.qr.callback = (error, scan) => {
			if (error) {
				console.log(error);
				return;
			}
			// image decoded
			console.log('scan', scan);
			this._dal.save('my scan', scan.result);
			return scan;
		};
	}
}

interface IScan {
	result: string;
	points: any[];
}
