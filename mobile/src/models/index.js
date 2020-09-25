import { CurrentUser } from "./CurrentUser";

const currentUser = CurrentUser.create();

export const store = {
	currentUser,
};

//For testing purposes:
window.MobxStore = store;
