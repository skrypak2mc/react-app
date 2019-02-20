import React, { FC, FormEvent, useState } from 'react';
import { connect } from 'react-redux';
import BaseForm from './BaseForm';
import ICustomer from '../../models/Customer';
import { CustomerActions } from '../../actions';

const { createCustomer } = CustomerActions;

const FORM_FIELDS = [
  {
    label: 'Name',
    key: 'name',
    placeholder: 'Input name'
  },
  {
    label: 'Phone',
    key: 'phone',
    placeholder: 'Input phone'
  },
  {
    label: 'Address',
    key: 'address',
    placeholder: 'Input address'
  }
];

type Props = {
  createCustomer: Function;
};

const CustomerForm: FC<Props> = props => {
  const [customer, setCustomer] = useState({});
  const handleSubmit = (values: ICustomer) => {
    console.log(values, 'FORM');
    props.createCustomer({ ...values });
  };

  return <BaseForm formFields={FORM_FIELDS} onSubmit={handleSubmit} formData={customer} />;
};

export default connect(
  null,
  { createCustomer }
)(CustomerForm);
