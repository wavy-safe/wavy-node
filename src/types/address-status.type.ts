export interface IStatus {
	status: 'clean' | 'dirty',
	tags: string[],
	lastTxs: any[], // todo: define these two interfaces?
	lastDapps: any[]
}
