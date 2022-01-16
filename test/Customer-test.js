import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer';
import sampleData from '../src/sampleData';


describe('Customer', () => {
  let customer;

  beforeEach(() => {
    customer = new Customer(sampleData.customers)
  });

  it('Should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('Should be an instance of Customer', () => {
    expect(customer).to.be.an.instanceOf(Customer);
  });

  // it('Should', () => {
  //   expect().to.equal();
  // });

  // it('Should', () => {
  //   expect().to.equal();
  // });

  // it('Should', () => {
  //   expect().to.equal();
  // });

  // it('Should', () => {
  //   expect().to.equal();
  // });

  // it('Should', () => {
  //   expect().to.equal();
  // });

  // it('Should', () => {
  //   expect().to.equal();
  // });

  // it('Should', () => {
  //   expect().to.equal();
  // });

  // it('Should', () => {
  //   expect().to.equal();
  // });

  // it('Should', () => {
  //   expect().to.equal();
  // });

});