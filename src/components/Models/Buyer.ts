import { TPayment, IBuyer } from '../../types/index';

export class Buyer {
  private payment: TPayment = '';
  private address: string = '';
  private email: string = '';
  private phone: string = '';

  constructor() {}

  setData(data: Partial<IBuyer>): void {
    if (data.payment !== undefined) this.payment = data.payment;
    if (data.address !== undefined) this.address = data.address;
    if (data.email !== undefined) this.email = data.email;
    if (data.phone !== undefined) this.phone = data.phone;
  }

  getData(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      email: this.email,
      phone: this.phone,
    };
  }

  clear(): void {
    this.payment = '';
    this.address = '';
    this.email = '';
    this.phone = '';
  }

  validate(): Record<keyof IBuyer, string> | {} {
    const errors: Partial<Record<keyof IBuyer, string>> = {};

    if (!this.payment) {
      errors.payment = 'Не выбран вид оплаты';
    }
    if (!this.address) {
      errors.address = 'Укажите адрес доставки';
    }
    if (!this.email) {
      errors.email = 'Укажите емэйл';
    }
    if (!this.phone) {
      errors.phone = 'Укажите номер телефона';
    }

    return errors as Record<keyof IBuyer, string>;
  }
}
