import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Employee {
  @Field(() => Int, { description: 'Employee id' })
  id: number;

  @Field({ description: 'Employee name' })
  name: string;

  @Field(() => Float, { description: 'Benefit budget' })
  budget: number;

  // @Field(() => Float, {
  //   description: 'Benefit budget after orders',
  //   defaultValue: 44,
  // })
  // remainingBudget: number;

  @Field(() => Int, { description: 'Employee company id' })
  companyId: number;
}
