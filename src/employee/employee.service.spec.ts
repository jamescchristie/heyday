import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeService],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all employees', () => {
    const allEmployees: Employee[] = service.getEmployees();
    expect(allEmployees).toBeDefined();
    expect(allEmployees).toMatchInlineSnapshot(`
      Array [
        Object {
          "budget": 44,
          "companyId": 1,
          "id": 1,
          "name": "Raffael",
        },
        Object {
          "budget": 44,
          "companyId": 1,
          "id": 2,
          "name": "Mathis",
        },
        Object {
          "budget": 44,
          "companyId": 1,
          "id": 3,
          "name": "Tim",
        },
        Object {
          "budget": 60,
          "companyId": 1,
          "id": 4,
          "name": "Beatrix",
        },
        Object {
          "budget": 30,
          "companyId": 2,
          "id": 5,
          "name": "Angela",
        },
        Object {
          "budget": 30,
          "companyId": 2,
          "id": 6,
          "name": "Alina",
        },
        Object {
          "budget": 30,
          "companyId": 2,
          "id": 7,
          "name": "Corinna",
        },
        Object {
          "budget": 30,
          "companyId": 2,
          "id": 8,
          "name": "Greta",
        },
        Object {
          "budget": 30,
          "companyId": 2,
          "id": 9,
          "name": "Heinz",
        },
        Object {
          "budget": 100,
          "companyId": 3,
          "id": 10,
          "name": "Gregor",
        },
      ]
    `);
  });

  it('should return all employees in company 1', () => {
    const allEmployees: Employee[] = service.getEmployees(1);
    expect(allEmployees).toBeDefined();
    expect(allEmployees).toMatchInlineSnapshot(`
      Array [
        Object {
          "budget": 44,
          "companyId": 1,
          "id": 1,
          "name": "Raffael",
        },
        Object {
          "budget": 44,
          "companyId": 1,
          "id": 2,
          "name": "Mathis",
        },
        Object {
          "budget": 44,
          "companyId": 1,
          "id": 3,
          "name": "Tim",
        },
        Object {
          "budget": 60,
          "companyId": 1,
          "id": 4,
          "name": "Beatrix",
        },
      ]
    `);
  });
  it('should return all employees in company 1 with budget >= 10 in Feb', () => {
    const allEmployees: Employee[] = service.getEmployees(1, 2);
    expect(allEmployees).toBeDefined();
    expect(allEmployees).toMatchInlineSnapshot(`
      Array [
        Object {
          "budget": 14,
          "companyId": 1,
          "id": 1,
          "name": "Raffael",
        },
        Object {
          "budget": 30,
          "companyId": 1,
          "id": 4,
          "name": "Beatrix",
        },
      ]
    `);
  });

  it('should return all employees in company 1 for Feb', () => {
    const allEmployees: Employee[] = service.getEmployees(1, 2, 0);
    expect(allEmployees).toBeDefined();
    expect(allEmployees).toMatchInlineSnapshot(`
      Array [
        Object {
          "budget": 14,
          "companyId": 1,
          "id": 1,
          "name": "Raffael",
        },
        Object {
          "budget": 0,
          "companyId": 1,
          "id": 2,
          "name": "Mathis",
        },
        Object {
          "budget": 4,
          "companyId": 1,
          "id": 3,
          "name": "Tim",
        },
        Object {
          "budget": 30,
          "companyId": 1,
          "id": 4,
          "name": "Beatrix",
        },
      ]
    `);
  });

  it('should return all employees in company with net salary and taxes', () => {
    const allEmployees: Employee[] = service.getEmployeesWithEarnings(1, 2);
    expect(allEmployees).toBeDefined();
    expect(allEmployees).toMatchInlineSnapshot(`
      Array [
        Object {
          "budget": 44,
          "companyId": 1,
          "id": 1,
          "name": "Raffael",
          "netSalary": 14,
          "taxes": 4.2,
        },
        Object {
          "budget": 44,
          "companyId": 1,
          "id": 2,
          "name": "Mathis",
          "netSalary": 0,
          "taxes": 0,
        },
        Object {
          "budget": 44,
          "companyId": 1,
          "id": 3,
          "name": "Tim",
          "netSalary": 4,
          "taxes": 1.2,
        },
        Object {
          "budget": 44,
          "companyId": 1,
          "id": 4,
          "name": "Beatrix",
          "netSalary": 30,
          "taxes": 9,
        },
      ]
    `);
  });
});
