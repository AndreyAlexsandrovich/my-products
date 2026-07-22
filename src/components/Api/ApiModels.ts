export interface IProduct { 
    id: string;
    name: string;
    category: string;
    addAt: string;
    image?: string;
    detailDescription: string;
}

export type ICreateProductPayLoad = Omit<IProduct, 'id'>;

export interface IApiResponse<T> { 
    data: T[];
    total: number;
}