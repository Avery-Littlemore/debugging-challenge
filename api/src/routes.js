import express from 'express';
import UserModel from './models/user.js';
import ApplicationModel from './models/application.js';
import PaymentModel from './models/payment.js';

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();

// Instantiate mocked "models" so that data can be persisted for the life of the server
const User = new UserModel();
const Application = new ApplicationModel();
const Payment = new PaymentModel();

router.get('/users', (req, res) => {
  const page = req.query.page
  const rows = req.query.rows
  const users = User.getSelect(page, rows);
  res.json({ count: users.count, body: users.body });
});

// router.get('/users/:pageNumber', (req, res) => {
//   const pageNumber = req.params.pageNumber
//   console.log(pageNumber)
//   const body = User.getSelect(pageNumber);
//   res.json({ body });
// });

router.get('/applications', (req, res) => {
  const body = Application.getAll();
  res.json({ body });
});

router.get('/select_applications', (req, res) => {
  const uuids = req.query.uuids
  console.log(uuids)
  const body = Application.getSelect(uuids);
  res.json({ body });
});

router.get('/payments', (req, res) => {
  const body = Payment.getAll();
  res.json({ body });
});

router.get('/select_payments', (req, res) => {
  const uuids = req.query.uuids
  const body = Payment.getSelect(uuids);
  res.json({ body });
});

router.post('/payments', (req, res) => {
  const body = Payment.create(req.body);
  res.json({ body });
});

export default router;