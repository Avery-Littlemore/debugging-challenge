import axios from "axios";

const userServiceBaseUrl = "http://localhost:8080";

export const getApplications = async () => {
  const { data } = await axios.get(`${userServiceBaseUrl}/applications`);
  return data;
};

export const getSelectApplications = async (uuids) => {
  // console.log(uuids)
  const { data } = await axios.get(`${userServiceBaseUrl}/select_applications`, {params: { uuids }});
  return data;
};
