import { flow, types, getParent, applySnapshot } from "mobx-state-tree";
import get from 'lodash.get';

import { baseApi } from '../api/Api'

export const UserAddressModel = types.model({
    _id: types.identifier,
    street: types.string,
    aptNum: types.maybeNull(types.string),
    postalCode: types.string,
    city: types.string,
    state: types.string,
    instructions: types.maybe(types.string),
    geo: types.model({
        lng: types.maybeNull(types.number),
        lat: types.maybeNull(types.number),
    })
}).preProcessSnapshot(snap => ({
    ...snap,
    geo: {
        lng: get(snap, ['geo', 'coords', 0]),
        lat: get(snap, ['geo', 'coords', 1]),
    },
}))
.views(self => ({
    get user() {
        return getParent(self, 2)
    }
}))
.actions(self => ({
    update(newData) {
        applySnapshot(self, newData);
    },
    updateAddress: flow(function*(data) {
        try {
            const res = yield baseApi
                .url(`/addresses/${self._id}`)
                .auth(`Bearer ${self.user.auth.authToken}`)
                .put({ data })
                .json();

            if (res.addresses) {
                self.update(res.addresses);
            }
        } catch (error) {
            throw error;
        }
    }),
    deleteAddress: flow(function*() {
        try {
            const res = yield baseApi
                .url(`/addresses/${self._id}`)
                .auth(`Bearer ${self.user.auth.authToken}`)
                .delete()
                .res();

            if (res.status === 204) {
                self.user.removeAddress(self);
            }
        } catch (error) {
            throw error;
        }
    }),
}));