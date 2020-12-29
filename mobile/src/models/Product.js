import { types } from 'mobx-state-tree'

export const ProductModel = types.model('ProductModel', {
    id: types.identifier,
    name: types.string,
    imageUrl: types.number,
    unityPrice: types.number,
    kgPrice: types.number,
    cartQuantity: 0,
    inCart: false
})