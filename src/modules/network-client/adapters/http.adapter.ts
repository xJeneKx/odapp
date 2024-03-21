import { BaseAdapter } from "./base.adapter.ts";

// ToDo: area for improving, put in constructor?
let fetch: any;
if (typeof window !== 'undefined') {
  ({fetch} = window);
} else {
  fetch = require('node-fetch');
}

export class HttpAdapter implements BaseAdapter {
  readonly #baseUrl: string;

  constructor(baseUrl: string) {
    this.#baseUrl = baseUrl;
  }

  async request(data: any): Promise<any> {
    // ToDo: http or https (?)
    const result = await fetch(`http://${this.#baseUrl}/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return result.json();
  }
}
