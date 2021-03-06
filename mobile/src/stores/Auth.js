import AsyncStorage from "@react-native-async-storage/async-storage";
import { types, flow } from "mobx-state-tree";

import { customersApi } from "../api/Api";
import { NavigationService } from "../api/NavigationService";
import { CurrentUserModel } from "../models/CurrentUser";

//Setup for AsyncStorage:
const TOKEN_KEY = "@instore/token";

//create AuthStore model that handle login persistence and various models
export const AuthStore = types
	.model("AuthStore", {
		authToken: types.maybe(types.string),
		info: types.maybe(CurrentUserModel),
	})
	.actions((self) => ({
		setupAuth: flow(function* () {
			yield self.getAuthToken();
			yield self.getUserInfo();
		}),
		getAuthToken: flow(function* () {
			try {
				const token = yield AsyncStorage.getItem(TOKEN_KEY);

				if (token) {
					self.authToken = token;
				} else {
					NavigationService.navigate("Auth");
				}
			} catch (error) {
				console.log("error", error);
			}
		}),
		saveToken: flow(function* (token) {
			try {
				console.log("saveToken");
				yield AsyncStorage.setItem(TOKEN_KEY, token);
			} catch (error) {
				console.log("error", error);
			}
		}),
		destroyToken: flow(function* () {
			try {
				yield AsyncStorage.removeItem(TOKEN_KEY);
			} catch (error) {
				console.log("error", error);
			}
		}),
		login: flow(function* (providerToken, provider) {
			try {
				const res = yield customersApi
					.post({
						token: providerToken,
						provider,
					})
					.json();

				if (res.token) {
					self.authToken = res.token;
					yield self.saveToken(res.token);
					yield self.getUserInfo();
				}
			} catch (error) {
				console.log(error);
			}
		}),
		logout: flow(function* () {
			try {
				if (self.authToken) {
					yield self.destroyToken();
					self.authToken = undefined;
					self.info = undefined;
				}
			} catch (error) {
				console.log(error);
			}
		}),
		getUserInfo: flow(function* () {
			try {
				if (self.authToken) {
					const res = yield customersApi
						.url("/me")
						.headers({ Authorization: `Bearer ${self.authToken}` })
						.get()
						.json();

					// self.info = res;
					if (!self.info) {
						self.info = res;
					}

					NavigationService.navigate("Main");
				}
			} catch (error) {
				console.log("error", error);
			}
		}),
	}));
