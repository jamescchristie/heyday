# heyday tech challenge starter project

You can use this project as a starter for your tech challenge for heyday.

This starter project uses the [Nest](https://github.com/nestjs/nest) framework.

## Challenge Progress

The API should be able to answer the following three requests (note: It’s not a deal breaker if you are not able to implement all three requests):

- List all employees grouped by company that have more than 10€ in benefits left to spend this month. This query should be flexible in such a way that you can provide a past month as an argument as well.
- A list of employees from a single company with their spending in a certain month. It should list the money per employee that was spent up to 44€ as tax free and the money above this threshold should be split up by net salary and taxes. There should also be a total per employee.
- ~~List the revenue per partner~~. _I got bogged down in some silly areas so didn't get round to this one given the time._

## Areas for improvement

- improve test coverage including e2e
- improve entity shape to include spent budget as well as initial budget
- make things like tax rate, budgets etc configurable globally

## Installation

```bash
yarn
```

## Running the app

```bash
# Development
yarn start

# Watch mode
yarn start:dev
```

## Tests

```bash
# Unit tests
yarn test

# e2e tests
yarn test:e2e
```

## GraphQL

The GraphQL playground is available at http://localhost:3000/graphql

### Queries

#### AppInfo

```graphql
# All employees
employees () {
  name, id, budget, companyId
}

# All employees in company one for February
employees (companyId: 1, month: 2) {
  name, id, budget, companyId
}

# All employees with salary / tax details in company one for February
employeesSalary (companyId: 1, month: 2) {
    name, id, budget, companyId, taxes, netSalary
  }
```
