import { types } from 'mobx-state-tree'
import { ProductModel } from '../models/Product'

export const ShoppingCartStore = types.model('ShoppingCartStore', {
    products: types.array(types.reference(ProductModel))
})