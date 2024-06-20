import axios from "axios";

const userServiceBaseUrl = "http://localhost:8080";

export const getPayments = async () => {
  const { data } = await axios.get(`${userServiceBaseUrl}/payments`);
  return data;
};

export const getSelectPayments = async (uuids) => {
  const { data } = await axios.get(`${userServiceBaseUrl}/select_payments`, {params: { uuids }});
  return data;
};

export const createPayment = async ({ applicationUuid, requestedAmount }) => {
  const { data } = await axios.post(`${userServiceBaseUrl}/payments`, {
    applicationUuid,
    paymentAmount: requestedAmount,
  });
  return data;
};
