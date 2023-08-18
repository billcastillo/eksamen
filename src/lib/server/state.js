import { writable, get } from 'svelte/store';

const localState = localStorage.getItem('state');
const initialState = {
	quiz: new Map()
};

if (!localState) {
	localStorage.setItem('state', JSON.stringify(initialState));
	// Set localStorage "state" to the "initialState"
}

const appState = localState ? JSON.parse(localState) : initialState;

export const state = writable(appState);

export const update = (callback) => {
	const updatedState = callback(get(state));

	state.update(() => updatedState);
	localStorage.setItem('state', JSON.stringify(updatedState));
};
