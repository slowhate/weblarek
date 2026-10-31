import { IApi } from '../../types/index';
import { ProductsResponse, OrderRequest, OrderSuccessResponse, OrderErrorResponse } from '../../types/index';

export class ApiService {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  async getProducts(): Promise<ProductsResponse> {
    return this.api.get<ProductsResponse>('/product/');
  }

  async sendOrder(
    orderData: OrderRequest
  ): Promise<OrderSuccessResponse | OrderErrorResponse> {
    return this.api.post<OrderSuccessResponse | OrderErrorResponse>(
      '/order/',
      orderData
    );
  }
}
