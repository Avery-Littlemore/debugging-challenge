import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./components/table.jsx";
import { Container, Button, CircularProgress } from "@material-ui/core";
import formatCurrency from "./utils/formatCurrency";
import TablePagination from '@material-ui/core/TablePagination';

import { getUsers } from "./services/users.js";
import { getApplications } from "./services/applications.js";
import { getPayments, createPayment } from "./services/payments.js";

const App = () => {
  /**
   * Hydrate data for the table and set state for users, applications, and payments
   */
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [payments, setPayments] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [totalUsers, setTotalUsers] = useState(0)

  useEffect(() => {
    const fetchApplicationsAndPayments = async () => {
      const applicationsData = await getApplications()
      const paymentsData = await getPayments()
      setApplications(applicationsData.body);
      setPayments(paymentsData.body);
    }
    fetchApplicationsAndPayments()
  }, [])

  async function fetchUsers() {
    const usersData = await getUsers(pageNumber, rowsPerPage)
    setTotalUsers(usersData.count)
    setUsers(usersData.body);
  }

  useEffect(() => {
    setDataLoaded(false)
    fetchUsers().then(() => setDataLoaded(true));
  }, [pageNumber, rowsPerPage]);

  const initiatePayment = async ({ applicationUuid, requestedAmount }) => {
    const { body } = await createPayment({
      applicationUuid,
      requestedAmount,
    });
    setPayments([...payments, body]);
  };

  let tableData = [];
  if (dataLoaded) {
    tableData = users.map(({ uuid, name, email }) => {
      const { requestedAmount, uuid: applicationUuid } =
        applications.find((application) => application.userUuid === uuid) || {};
      
      const { paymentAmount, paymentMethod } =
        payments.find(
          (payment) => payment.applicationUuid === applicationUuid
        ) || {};
        
      // Format table data to be passed into the table component, pay button tacked
      // onto the end to allow payments to be issued for each row
      return {
        uuid,
        name,
        email,
        requestedAmount: formatCurrency(requestedAmount),
        paymentAmount: formatCurrency(paymentAmount),
        paymentMethod,
        initiatePayment: !paymentAmount && requestedAmount ? (
          <Button
            onClick={() =>
              initiatePayment({
                applicationUuid,
                requestedAmount,
              })
            }
            variant="contained"
          >
            Pay
          </Button>
        ) : null,
      };
    });
  }

  const handleChangePage = (_event, newPage) => {
    setPageNumber(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(0);
  }

  return (
    <div className="App">
      <Container>
        {dataLoaded ? (
            <>
              <Table data={tableData} />
              <TablePagination
                rowsPerPageOptions={[10, 15, 20]}
                component="div"
                count={totalUsers}
                rowsPerPage={rowsPerPage}
                page={pageNumber}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          ) : (
            <CircularProgress /> // Show a spinner while loading
          )}
      </Container>
    </div>
  );
};

export default App;
