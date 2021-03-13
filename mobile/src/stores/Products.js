import { types, flow } from 'mobx-state-tree';

import { ProductModel } from '../models/Product'

export const ProductsStore = types.model('ProductsStore', {
    data: types.array(types.reference(ProductModel)),
}).views(self => ({
    get isEmpty() {
        return self.data.length === 0;
    },
}))
.actions(self =>({
    logout: flow(function* () {
        try {
            if (!self.isEmpty) {
                self.data.map(item => {
                    item.removeFromCart();
                })
            }
        } catch (error) {
            console.log(error);
        }
    }),
}))