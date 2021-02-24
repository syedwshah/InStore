import { types } from "mobx-state-tree";

export const UserAddressModel = types.model({
    _id: types.identifier,
    street: types.string,
    aptNum: types.maybeNull(types.string),
    postalCode: types.string,
    city: types.string,
    state: types.string,
    instructions: types.maybe(types.string),
    geo: types.model({
        lng: types.number,
        lat: types.number,
    })
});
