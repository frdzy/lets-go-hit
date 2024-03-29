# lets-go-hit

App to help coordinate tennis players to hit together

TODOs:

- [x] Schema for users, courts, availabilities, and schedules
- [x] Script to inject test data
- [x] GraphQL backend to fetch data
- [x] GraphQL backend to create confirmation
- [x] GraphQL backend to create reservation
- [x] GraphQL backend to create schedule without reservation
- [x] Use [RedwoodJS](https://redwoodjs.com)
- [x] Frontend to show currently open schedules
- [x] Add dbAuth
- [x] Switch to postgresql since that looks like the cheapest time and money cost option for production
- [x] Deploy to [Render](https://render.com/docs/deploy-redwood)
  - [x] Replaced by [Netlify](https://redwoodjs.com/docs/deploy/netlify)
- [x] Recreate necessary frontend forms to properly utilize authentication
- [x] Limit reservations and schedules to participants only
- [x] Add underline of current section
- [x] Update datetime UI to display in local timezone (and fix test accordingly)
- [x] Update permalink with friendly strings
- [x] Replace /schedules view of "Reservation id" with a Reservation cell
- [x] Also replace other reference-type cells
- [x] Order Schedules and Reservations entries by time descending
- [ ] "Attach" feature to search for a Reference
- [ ] On narrow viewports (e.g. vertical phone screen), improve table-of-objects UI

