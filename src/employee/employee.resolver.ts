import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { EmployeeSalary } from './entities/employeeSalary.entity';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [Employee], { name: 'employees' })
  getEmployees(
    @Args('companyId', { nullable: true }) companyId?: number,
    @Args('budget', { defaultValue: 10 }) budget?: number,
    @Args('month', { nullable: true }) month?: number,
  ) {
    return this.employeeService.getEmployees(companyId, budget, month);
  }

  @Query(() => [EmployeeSalary], { name: 'employeesSalary' })
  getEmployeeSalary(
    @Args('companyId') companyId: number,
    @Args('month', { nullable: true }) month?: number,
  ) {
    return this.employeeService.getEmployeesWithEarnings(companyId, month);
  }

  @Query(() => Employee, { name: 'employee' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.employeeService.findOne(id);
  }
}
