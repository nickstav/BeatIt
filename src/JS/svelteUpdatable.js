// https://svelte.dev/repl/46356a5f61a6400fa4dbadae724e4511?version=3.38.3

import { writable } from 'svelte/store'

//Create a base class that handles all of our custom Class store logic
export class SvelteUpdatable {
	constructor() {
		this._store = writable(this)
	}
	
	//Function that updates the internal store, triggering UI update.
	//You'll still need to call this whenever you want the UI to update.
	updateUI() {
		this._store.set(this)
	}
	
	subscribe(subscriber) {
		return this._store.subscribe(subscriber)
	}
}