export type ProductModel = {
    id: string;
    name: string;
    price: number;
    image: string | null;
    barcode: string | null;
    stock_available: number;
    is_favorite: boolean;
    category_id_list: string[];
    deleted_at: string | null;
}
