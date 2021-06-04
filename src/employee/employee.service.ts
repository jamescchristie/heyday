import { Injectable } from '@nestjs/common';
import MOCK_EMPLOYEES from '@data/employees';
import { EmployeeSalary } from './entities/employeeSalary.entity';
import MOCK_ORDERS from '@data/orders';
import MOCK_VOUCHERS from '@data/vouchers';
import { DataWrapper } from '@src/data/dataWrapper';
import { Employee } from './entities/employee.entity';

interface Voucher {
  id: number;
  amount: number;
  partnerId: number;
}

@Injectable()
export class EmployeeService {
  dataWrapper = new DataWrapper();

  getEmployees(companyId?: number, month?: number, budget = 10) {
    const m = month ? month : new Date().getMonth();
    const employees = this.dataWrapper
      .getData('employees')
      .filter((e) => (companyId ? e.companyId == companyId : true))
      .map((e) => this.caculateRemainingBudget(e as Employee, m))
      .filter((e) => e.budget >= budget);
    return employees;
  }

  getEmployeesWithEarnings(
    companyId: number,
    month?: number,
  ): EmployeeSalary[] {
    return this.getEmployees(companyId, month, 0).map((e) => {
      const salaried = e as EmployeeSalary;
      const taxRate = 30;
      const initialBudget = 44;
      salaried.netSalary = e.budget;
      salaried.budget = initialBudget;
      salaried.taxes = this.calcPercent(salaried.netSalary, taxRate);
      return salaried;
    });
  }

  findOne(id: number) {
    return this.dataWrapper.getData('employees').find((e: Employee) => {
      return (e as Employee).id == id;
    });
  }

  private caculateRemainingBudget(employee: Employee, month: number): Employee {
    const vouchers: Voucher[] = this.getVouchersForEmployee(employee.id, month);
    const voucherTotal = vouchers.reduce((acc, curr) => acc + curr.amount, 0);
    employee.budget -= voucherTotal;
    return employee;
  }

  private getVouchersForEmployee(employeeId: number, month: number): Voucher[] {
    return this.dataWrapper
      .getData('orders')
      .filter((o) => o.employeeId == employeeId && o.date.getMonth() == month)
      .map((o) => this.getVoucherById(o.voucherId));
  }

  private getVoucherById(voucherId: number): Voucher {
    return this.dataWrapper
      .getData('vouchers')
      .find((v) => v.id == voucherId) as Voucher;
  }

  private calcPercent(value: number, percent: number, decimals = 2): number {
    return parseFloat(((value / 100) * percent).toFixed(decimals));
  }
}
