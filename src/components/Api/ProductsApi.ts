import type {
    IProduct,
    ICreateProductPayLoad,
    IApiResponse
} from './ApiModels';

import { DataProducts as initialProducts } from '../data/dataProducts';

let productDb: IProduct[] = [...initialProducts];
let nextId = productDb.length + 1;

const delay = (ms: number = 1500) => new Promise(resolve => setTimeout(resolve, ms));

export const ProductApi = {
    getProducts: async (): Promise<IApiResponse<IProduct>> => {
        await delay(1300);
        return {
            data: [...productDb],
            total: productDb.length,
        };
    },

    getProductById: async (id: string): Promise<IProduct> => {
        await delay(1000);
        const product = productDb.find(p => p.id === id);
        if (!product) {
            throw new Error(`Товар с ID ${id} не найден`)
        }
        return { ...product }
    },

    createProduct: async (payload: ICreateProductPayLoad): Promise<IProduct> => {
        await delay(2000);
        const newProduct: IProduct = {
            id: String(nextId++),
            ...payload,
        };
        if (Math.random() < 0.1) {
            throw new Error('Ошибка сервера при добавлении вещи');
        }
        productDb.push(newProduct);
        return { ...newProduct }
    },

    deleteProduct: async (id: string): Promise<void> => {
        await delay(1200);
        const index = productDb.findIndex(p => p.id === id);
        if (index === -1) {
            throw new Error(`Товар с ID ${id} не найден`)
        }
        productDb.splice(index, 1)
    },
};