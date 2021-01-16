import { ProductModel } from "../models/Product";
import { AuthStore } from "./Auth";
import { ProductsStore } from './Products';
import { ShoppingCartStore } from './ShoppingCart'

const authStore = AuthStore.create();

const shoppingCartStore = ShoppingCartStore.create({ products: [] })

const productsStore = ProductsStore.create({
	data: [
		ProductModel.create({
			id: '1',
			name: 'Red Apple',
			imageUrl: require('../../assets/img/products/apple.png'),
			kgPrice: 10.12,
			unityPrice: 1.9,
		}),
		ProductModel.create({
			id: '2',
			name: 'Tomato',
			imageUrl: require('../../assets/img/products/tomato.png'),
			kgPrice: 9.51,
			unityPrice: 1.25,
		}),
	]
})

export const store = {
	authStore,
	shoppingCartStore,
	productsStore
};

//For testing purposes:
window.MobxStore = store;
