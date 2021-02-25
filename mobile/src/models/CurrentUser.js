import { flow } from "mobx";
import get from 'lodash.get';

import { getParent, types } from "mobx-state-tree";
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
	pushAddress: flow(function*(data) {
		yield self.addresses.push(data);
	}),
	createAddress: flow(function*(data) {
		try {
			const res = yield baseApi
				.url('/addresses')
				.auth(`Bearer ${self.auth.authToken}`)
				.post({ data }).json();

				if (res.address) {
					self.pushAddress(res.address)
				}
		} catch (error) {
			throw error
		}
	}),
	getAddress: flow(function*(data) {
		yield self.addresses = data;
	}),
	getAddresses: flow(function*() {
		try {
			const res = yield baseApi
				.url('/addresses')
				.auth(`Bearer ${self.auth.authToken}`)
				.get().json();

				console.log('res', res);
				if (Array.isArray(res.addresses)) {
					self.getAddress(res.addresses);
				}
		} catch (error) {
			throw error;
		}
	})
}))