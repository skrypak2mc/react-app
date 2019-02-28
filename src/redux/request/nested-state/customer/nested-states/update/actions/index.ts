import { action, createStandardAction } from 'typesafe-actions';
import ICustomer from '../../../../../../../shared/models/Customer';
import { URL_ALL_CUSTOMERS } from '../../../../../../../shared/utils/api';

export enum UpdateCustomerTypes {
  UPDATE_CUSTOMER_REQUEST = '@invoice-app/customer/UPDATE_CUSTOMER_REQUEST',
  UPDATE_CUSTOMER_SUCCESS = '@invoice-app/customer/UPDATE_CUSTOMER_SUCCESS',
  UPDATE_CUSTOMER_FAILURE = '@invoice-app/customer/UPDATE_CUSTOMER_FAILURE'
}

export const UpdateCustomerActions = {
  editCustomer: (customer: ICustomer) =>
    action(UpdateCustomerTypes.UPDATE_CUSTOMER_REQUEST, {
      url: URL_ALL_CUSTOMERS,
      body: customer
    }),
  editCustomerSuccess: createStandardAction(UpdateCustomerTypes.UPDATE_CUSTOMER_SUCCESS)<
    ICustomer
  >(),
  editCustomerFailure: createStandardAction(UpdateCustomerTypes.UPDATE_CUSTOMER_FAILURE)<
    Error
  >()
};
