import axios from "axios";

const userServiceBaseUrl = "http://localhost:8080";

export const getUsers = async (pageNumber, rowsPerPage) => {
  const { data } = await axios.get(`${userServiceBaseUrl}/users?page=${pageNumber}&rows=${rowsPerPage}`);
  return data;
};

export const getSelectUsers = async (pageNumber) => {
  const { data } = await axios.get(`${userServiceBaseUrl}/users/${pageNumber}`);
  return data;
};
