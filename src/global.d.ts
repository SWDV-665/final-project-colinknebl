declare module 'qrcode-reader' {
	type Scan = {
		result: string;
		points: any[];
	};

	export default class QrCode {
		decode(path: string): Scan;
		callback(error: Error, result: Scan): void;
	}
}
