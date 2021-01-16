import { types } from 'mobx-state-tree'
import { store } from '../stores';

export const ProductModel = types.model('ProductModel', {
    id: types.identifier,
    name: types.string,
    imageUrl: types.number,
    unityPrice: types.number,
    kgPrice: types.number,
    cartQuantity: 0,
    inCart: false
}).views(self => ({
    get price() {
        return self.unityPrice.toFixed(2);
    },
    get totalPrice() {
        return (self.cartQuantity * self.unityPrice).toFixed(2);
    }
})).actions(self => ({
    incCartQty() {
        self.cartQuantity += 1;
    },
    decCartQty() {
        self.cartQuantity -= 1;
    },
    addToCart() {
        store.shoppingCartStore.addProduct(self);
        self.inCart = true;
        self.incCartQty();
    },
    removeFromCart() {
        store.shoppingCartStore.removeProduct(self)
        self.inCart = false;
        self.cartQuantity = 0;
    }
}))