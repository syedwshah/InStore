import { flow, types } from 'mobx-state-tree'
import { ProductModel } from '../models/Product'

export const ShoppingCartStore = types.model('ShoppingCartStore', {
    products: types.array(types.reference(ProductModel))
})
.views(self => ({
    get totalProducts() {
        return self.products.length
    },
    get totalAmount () {
        return self.products.reduce((accum, curr) => {
            return accum + parseFloat(curr.totalPrice);
        }, 0).toFixed(2);
    },
    get productsList() {
        return self.products.slice();
    },
    get isEmpty() {
        return self.products.length === 0;
    }
}))
.actions(self =>({
    addProduct(product) {
        const entry = self.products.find(el => el.id === product.id);

        if (!entry) {
            self.products.push(product);
        }
    },
    removeProduct(product) {
        self.products = self.products.filter(el => (el.id !== product.id))
    },
    emptyCart: flow(function*() {
        if (!self.isEmpty) {
            self.products.splice(0, self.totalProducts);
        }
    }),
    logout: flow(function* () {
        try {
            yield self.emptyCart();
        } catch (error) {
            console.log(error);
        }
    }),
}))