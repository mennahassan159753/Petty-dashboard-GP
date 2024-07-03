interface InventoryStatus {
    label: string;
    value: string;
}
export interface Product {
    id?: string;
    order_id?: number;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: InventoryStatus;
    category?: string;
    image?: string;
    rating?: number;
    user_info?: {
        full_name: string,
        phone_number: any,
        shipping_address: string
    },
    products?: { id: number, name: string, category: string, image: string, price: number, quantity: number }[]
    age?: number,
    species?: string,
    breed?: string,
    image_url?: string,
    weight?: string,
    gender?: string,
    message?: string
}