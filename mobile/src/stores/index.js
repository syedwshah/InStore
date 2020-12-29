import { AuthStore } from "./Auth";

const authStore = AuthStore.create();

export const store = {
	authStore,
};

//For testing purposes:
window.MobxStore = store;
