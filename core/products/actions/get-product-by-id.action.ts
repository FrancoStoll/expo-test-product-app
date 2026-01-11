import { API_URL, productsApi } from "@/core/api/productsApi";
import { Gender, type Product } from "../interfaces/product.interface";

const emptyProduct: Product = {
    id: '',
    title: 'Nuevo Producto',
    description: '',
    price: 0,
    slug: '',
    gender: Gender.Men,
    sizes: [],
    stock: 0,
    images: []

}


export const getProductById = async (id: string) => {


    if (id === 'new') return emptyProduct

    try {

        const { data } = await productsApi.get<Product>(`/products/${id}`, {
        })
        return {
            ...data,
            images: data.images.map(img => `${API_URL}/files/product/${img}`)
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Unable to load product with id ${id}`)
    }
}