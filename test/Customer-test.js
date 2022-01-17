import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer';
const customers = require('../src/sampleData/customersData')

describe('Customer', () => {
  let customer1, customer2, customer3;

  beforeEach(() => {
    customer1 = new Customer(customers[0].id, customers[0].name);
    customer2 = new Customer(customers[1].id, customers[1].name);
    customer3 = new Customer(customers[2].id, customers[2].name);

  });

  it('Should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('Should be an instance of Customer', () => {
    expect(customer1).to.be.an.instanceOf(Customer);
  });

  it('Should have an id', () => {
    expect(customer1.id).to.equal(customers[0].id);
  });

  it('Should have a name', () => {
    expect(customer1.name).to.equal(customers[0].name);
  });

});