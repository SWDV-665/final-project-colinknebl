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
	private _dal: DalService = new DalService();

	constructor() {}

	public async addNewToGallery(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const capturedPhoto = await Camera.getPhoto(
				PhotoService.CameraOptions
			);

			const qr = new QrCode();
			qr.callback = (error, scan) => {
				if (error) {
					console.log(error);
					return reject(error);
				}
				this._dal.save(scan.result);
				return resolve();
			};

			qr.decode(capturedPhoto.webPath);
		});
	}
}
