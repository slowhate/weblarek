export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}


export type TPayment = 'card' | 'cash' | '';

export interface IProduct {
  id: string;
  title: string;
  image: string;
  category: string;
  price: number | null;
  description: string;
}

export interface IBuyer {
  payment: TPayment;
  address: string;
  email: string;
  phone: string;
}

export interface ProductsResponse {
  total: number;
  items: IProduct[];
}

export interface OrderRequest {
  buyer: IBuyer;
  items: IProduct[];
  total: number;
}

export interface OrderSuccessResponse {
  id: string;
  total: number;
}

export interface OrderErrorResponse {
  error: string;
}