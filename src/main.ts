import './scss/styles.scss';
import { Catalog } from './components/Models/Catalog.ts';
import { Cart } from './components/Models/Cart.ts';
import { Buyer } from './components/Models/Buyer.ts';
import { ApiService } from './components/Models/ApiService.ts';
import { Api } from './components/base/Api';
import { apiProducts } from './utils/data'; // Предполагаем, что этот файл существует в вашем проекте

// Проверка работы Catalog
console.log('Проверка Catalog');
const catalog = new Catalog();
catalog.setProducts(apiProducts.items);
console.log('Массив товаров из каталога:', catalog.getProducts());
const testProduct = catalog.getProductById('854cef69-976d-4c2a-a18c-2aa45046c390');
console.log('Товар по ID:', testProduct);

// Эмуляция выбора товара
if (testProduct) {
  catalog.setSelectedProduct(testProduct);
  console.log('Выбранный товар:', catalog.getSelectedProduct());
}

// Проверка работы Cart
console.log('Проверка Cart');
const cart = new Cart();

if (testProduct) {
  cart.addItem(testProduct);
  console.log('Товар добавлен в корзину. Текущие товары:', cart.getItems());
  console.log('Количество товаров:', cart.getCount());
  console.log('Общая стоимость:', cart.getTotalPrice());
  console.log('Проверка наличия товара (hasItem):', cart.hasItem(testProduct.id));
  cart.removeItem(testProduct);
  console.log('Товар удален. Осталось товаров:', cart.getCount());
  cart.clear();
  console.log('Корзина очищена. Осталось товаров:', cart.getCount());
}

// Проверка работы Buyer
console.log('Проверка Buyer');
const buyer = new Buyer();

// Частичное обновление данных
buyer.setData({ payment: 'card', email: 'test@example.com' });
console.log('Данные покупателя после частичного обновления:', buyer.getData());

// Полная валидация
console.log('Ошибки валидации (частичные данные):', buyer.validate());

// Полное заполнение
buyer.setData({ address: 'ул. Пушкина, д. Колотушкина', phone: '+79990000000' });
console.log('Данные покупателя после полного заполнения:', buyer.getData());
console.log('Ошибки валидации (полные данные):', buyer.validate());

// Очистка
buyer.clear();
console.log('Данные покупателя после очистки:', buyer.getData());
console.log('Ошибки валидации (после очистки):', buyer.validate());

// Запрос к серверу
const apiOrigin = import.meta.env.VITE_API_ORIGIN;
console.log('API Origin:', apiOrigin);
const apiClient: Api = new Api(apiOrigin);
const apiService = new ApiService(apiClient);

apiService
  .getProducts()
  .then((response) => {
    console.log('Ответ сервера (ProductsResponse):', response);
    catalog.setProducts(response.items);
    console.log('Товары сохранены в Catalog. Количество:', response.total);
    console.log('Массив товаров в модели:', catalog.getProducts());

    const firstProduct = catalog.getProductById(response.items[0]?.id);
    if (firstProduct) {
      console.log('Первый товар:', firstProduct);
      catalog.setSelectedProduct(firstProduct);
    }
  })
  .catch((err) => {
    console.error('Ошибка при получении товаров:', err);
  });