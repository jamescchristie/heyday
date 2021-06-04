import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Employee } from './employee.entity';

@ObjectType()
export class EmployeeSalary extends Employee {
  @Field(() => Int, { description: 'Net salary', defaultValue: 0 })
  netSalary: number;

  @Field(() => Float, { description: 'Taxes levvied', defaultValue: 0 })
  taxes: number;
}
