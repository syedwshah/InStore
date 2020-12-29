import { types } from "mobx-state-tree";

//Create an interface for a CurrentUser
export const CurrentUserModel = types.model("CurrentUserModel", {
	_id: types.identifier,
	firstName: types.string,
	lastName: types.string,
	avatarUrl: types.maybe(types.string),
});