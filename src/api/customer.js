import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

// utils
import { fetcher } from 'utils/axios';
import axios from 'axios';

const initialState = {
  modal: false
};
const baseUrl="http://localhost:8082/";

export const endpoints = {
  key: 'api/customer',
  list: '/list', // server URL
  modal: '/modal', // server URL
  insert: '/insert', // server URL
  update: '/update', // server URL
  delete: '/delete' // server URL
};

export function useGetCustomer() {
  // const { data, isLoading, error, isValidating } = useSWR(endpoints.key+'/'+clientId, fetcher, {
    const { data, isLoading, error, isValidating } = useSWR(endpoints.key+endpoints.list, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      customers: data?.customers,
      customersLoading: isLoading,
      customersError: error,
      customersValidating: isValidating,
      customersEmpty: !isLoading && !data?.customers?.length
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export  function insertCustomer(newCustomer) {
  // to update local state based on key
  const data = { newCustomer };
  
  return axios.post(baseUrl+endpoints.key+endpoints.insert, data);
   
}
export function customersListUpdate(newCustomer){

  mutate(
    endpoints.key + endpoints.list,
    (currentCustomer) => {
      const addedCustomer = [...currentCustomer.customers, newCustomer];
      return {
        ...currentCustomer,
        customers: addedCustomer
      };
    },
    false
  );
}
export async function updateCustomer(customerId, updatedCustomer) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.list,
    (currentCustomer) => {
      const newCustomer = currentCustomer.customers.map((customer) =>
        customer.id === customerId ? { ...customer, ...updatedCustomer } : customer
      );

      return {
        ...currentCustomer,
        customers: newCustomer
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { list: updatedCustomer };
  //   await axios.post(endpoints.key + endpoints.update, data);
}

export async function deleteCustomer(customerId) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.list,
    (currentCustomer) => {
      const nonDeletedCustomer = currentCustomer.customers.filter((customer) => customer.id !== customerId);

      return {
        ...currentCustomer,
        customers: nonDeletedCustomer
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { customerId };
  //   await axios.post(endpoints.key + endpoints.delete, data);
}

export function useGetCustomerMaster() {
  const { data, isLoading } = useSWR(endpoints.key + endpoints.modal, () => initialState, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      customerMaster: data,
      customerMasterLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export async function uploadPhoto(file) {
  let response = null;
  await axios
    .post(baseUrl + 'api/v1/filehandler/upload', file)
    .then((data) => {
      response = data;
    })
    .catch((error) => {
      throw error;
    });
  return response;
}

export function handlerCustomerDialog(modal) {
  // to update local state based on key

  mutate(
    endpoints.key + endpoints.modal,
    (currentCustomermaster) => {
      return { ...currentCustomermaster, modal };
    },
    false
  );
}
