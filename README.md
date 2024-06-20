# Notes
- Happens with Alford Bridson and Knox MacNeill as well (likely more), both of which are affected when Kay Parisson is clicked too
- Changes to ACH for all users without a Requested Amount value

# Assumptions
## First Challenge
- If user does not have any amount requested, they should not be able to initiate a payment.
  - Block the user from paying by display the Pay button only if (payment amount is thruthy and) amount has been requested
  - Must also block on the backend so that a POST request can't override the lack of Pay button

## Third Challenge
- Can't assume that the backend is ordered
- Payments relies on Applications which relies on Users
  - Must do each in order, and must await for data to be returned before executing the next backend call
  - Can no longer use `Promise.all`
- Fetching 11 users from the backend to see if there's another page to load