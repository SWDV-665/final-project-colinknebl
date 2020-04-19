import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { ToastController } from '@ionic/angular';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
	constructor(
		public photoService: PhotoService,
		public toastController: ToastController
	) {}

	public capturePicture() {
		this.photoService
			.addNewToGallery()
			.then(async () => {
				const toast = await this.toastController.create({
					message: 'Scan successful!',
					duration: 5000,
					color: 'success',
					position: 'top',
				});
				toast.present();
			})
			.catch(async (error) => {
				console.error(error);

				const toast = await this.toastController.create({
					message: error.message || error,
					duration: 5000,
					color: 'danger',
					position: 'top',
				});
				toast.present();
			});
	}
}
