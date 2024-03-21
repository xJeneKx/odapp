import { getTag, sleep } from "./utils.js";
import { kvFunction } from "./interfaces/kv.interface.ts";

let WebSocket: new (url: string) => any;
let fetch: any;
if (typeof window !== 'undefined') {
	({ WebSocket } = window);
	({ fetch } = window);
} else {
	WebSocket = require('ws'); // eslint-disable-line global-require
    // @ts-ignore
	fetch = require('node-fetch');
}

export default class APIBase {
	#tagToHandler: kvFunction = {};
	#ws: any;
	#queue = [];
	#rest;
	testnet = false;
	
	constructor(testnet = false, REST = false,) {
		this.#rest = REST;
		this.testnet = testnet;
		if (!this.#rest) {
			this.#connectWS();
		}
	}
	
	#connectWS() {
		this.#ws = new WebSocket('ws://localhost:3000/ws');
		this.#ws.addEventListener('open', this.#openHandler.bind(this));
		this.#ws.addEventListener('message', this.#messageHandler.bind(this));
		this.#ws.addEventListener('error', (err: { code: string; }) => {
			console.log('[WS] error', err.code);
		})
		this.#ws.addEventListener('close', async () => {
			await sleep(3000);
			this.#connectWS();
		});
	}
	
	#openHandler() {
		this.#queue.forEach((msg) => {
			this.#ws.send(JSON.stringify(msg));
		});
		this.#queue = [];
	}
	
	#messageHandler(event: { data: string }) {
		const data = JSON.parse(event.data);
		const id = data.id;
		if (this.#tagToHandler[id]) {
			this.#tagToHandler[id](data.result);
			delete this.#tagToHandler[id];
		}
	}
	
	async #checkReady() {
		if (this.#ws.readyState === 1) return true;
		
		for (; ;) {
			if (this.#ws.readyState === 1) {
				return true;
			} else if (this.#ws.readyState === 2 || this.#ws.readyState === 3) {
				return false;
			}
			
			await sleep(5); // if still not ready(connecting), wait 5ms
		}
	}
	
	async asyncRequest(data: any) {
		if (this.#rest) {
			return this.restRequest(data);
		} else {
			return this.wsRequest(data);
		}
	}
	
	async restRequest(data: any) {
		const result = await fetch('http://localhost:3000/request', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		
		return result.json();
	}
	
	async wsRequest(data: any) {
		const ready = await this.#checkReady();

		const id = getTag();
		const msg = {
			id,
			...data
		}

		if (!ready) {
			// @ts-ignore
			this.#queue.push(msg);
			return new Promise((resolve) => {
				this.#tagToHandler[id] = resolve;
			});
		}

		this.#ws.send(JSON.stringify(msg));

		return new Promise((resolve) => {
			this.#tagToHandler[id] = resolve;
		});
	}
}
