import { types, flow, getParent, destroy } from 'mobx-state-tree';

import { baseApi } from "../api/Api";
import { UserAddressModel } from "./UserAddresses";

//Create an interface for a CurrentUser
export const CurrentUserModel = types.model("CurrentUserModel", {
	_id: types.identifier,
	firstName: types.string,
	lastName: types.string,
	avatarUrl: types.maybe(types.string),
	addresses: types.optional(types.array(UserAddressModel), []),
}).views(self => ({
	get addressesIsEmpty() {
		return self.addresses.length === 0;
	},
	get auth() {
		return getParent(self);
	},
})).actions(self => ({
	createAddress: flow(function*(data) {
		try {
			const res = yield baseApi
				.url('/addresses')
				.auth(`Bearer ${self.auth.authToken}`)
				.post({ data }).json();

			if (res.address) {
				self.addresses.push(res.address);
			}
		} catch (error) {
			throw error;
		}
	}),

	getAddresses: flow(function*() {
		try {
			const res = yield baseApi
				.url('/addresses')
				.auth(`Bearer ${self.auth.authToken}`)
				.get()
				.json();

			if (Array.isArray(res.addresses)) {
				self.addresses = res.addresses;
			}
		} catch (error) {
			throw error;
		}
	}),
	
	removeAddress(address) {
		destroy(address);
	}
}))