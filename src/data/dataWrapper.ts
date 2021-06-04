import { Injectable } from '@nestjs/common';
import MOCK_COMPANIES from '@data/companies';
import MOCK_EMPLOYEES from '@data/employees';
import MOCK_ORDERS from '@data/orders';
import MOCK_PARTNERS from '@data/partners';
import MOCK_VOUCHERS from '@data/vouchers';
import { Employee } from '@src/employee/entities/employee.entity';

@Injectable()
export class DataWrapper {
  getData(name: string): any[] {
    switch (name) {
      case 'employees':
        return this.copy(MOCK_EMPLOYEES);

      case 'orders':
        return this.copy(MOCK_ORDERS);

      case 'vouchers':
        return this.copy(MOCK_VOUCHERS);

      case 'partners':
        return this.copy(MOCK_PARTNERS);

      case 'companies':
        return this.copy(MOCK_COMPANIES);
    }
    return [];
  }

  private copy(array: any[]): any[] {
    return array.map((o) => Object.assign({}, o));
  }
}
