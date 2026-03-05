import { io } from 'socket.io-client';
import { writable } from 'svelte/store';

// If your frontend is served on the same domain as your backend
export const sc = io();

// If your backend is on a different domain/port
// e.g., frontend on http://localhost:3000, backend on http://localhost:4000
//const URL = 'http://localhost:4000';
//const socket = io(URL);
export const ip =  "10.10.1.117:3000"

interface Ils {
    name: string
    room: string
}


const ls2: Ils = { name: '', room: '' };
// 
export const ls = writable({} as Ils)

export const check = writable(true)

//export const sc = socket.connect('http://' + ip)