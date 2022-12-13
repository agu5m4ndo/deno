export type Uuid = string;

export interface Product {
    uuid: Uuid,
    name: string,
    price: number,
    thumbnail: string
}
