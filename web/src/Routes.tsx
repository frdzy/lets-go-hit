// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router';

import ScaffoldLayout from 'src/layouts/ScaffoldLayout';
import AppLayout from 'src/layouts/AppLayout/AppLayout';

import { useAuth } from './auth';

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Private unauthenticated="home">
        <Set
          wrap={ScaffoldLayout}
          title="Schedules"
          titleTo="schedules"
          buttonLabel="New Schedule"
          buttonTo="newSchedule"
        >
          <Route
            path="/schedules/new"
            page={ScheduleNewSchedulePage}
            name="newSchedule"
          />
          <Route
            path="/schedules/{id}/edit"
            page={ScheduleEditSchedulePage}
            name="editSchedule"
          />
          <Route
            path="/schedules/{id}"
            page={ScheduleSchedulePage}
            name="schedule"
          />
          <Route
            path="/schedules"
            page={ScheduleSchedulesPage}
            name="schedules"
          />
        </Set>
        <Set
          wrap={ScaffoldLayout}
          title="Reservations"
          titleTo="reservations"
          buttonLabel="New Reservation"
          buttonTo="newReservation"
        >
          <Route
            path="/reservations/new"
            page={ReservationNewReservationPage}
            name="newReservation"
          />
          <Route
            path="/reservations/{id}/edit"
            page={ReservationEditReservationPage}
            name="editReservation"
          />
          <Route
            path="/reservations/{id}"
            page={ReservationReservationPage}
            name="reservation"
          />
          <Route
            path="/reservations"
            page={ReservationReservationsPage}
            name="reservations"
          />
        </Set>
        <Set
          wrap={ScaffoldLayout}
          title="Court Locations"
          titleTo="courtLocations"
          buttonLabel="New Court Location"
          buttonTo="newCourtLocation"
        >
          <Route
            path="/court-locations/new"
            page={CourtLocationNewCourtLocationPage}
            name="newCourtLocation"
          />
          <Route
            path="/court-locations/{id}/edit"
            page={CourtLocationEditCourtLocationPage}
            name="editCourtLocation"
          />
          <Route
            path="/court-locations/{id}"
            page={CourtLocationCourtLocationPage}
            name="courtLocation"
          />
          <Route
            path="/court-locations/{id}/{optionalName}"
            page={CourtLocationCourtLocationPage}
            name="courtLocationWithName"
          />
          <Route
            path="/court-locations"
            page={CourtLocationCourtLocationsPage}
            name="courtLocations"
          />
        </Set>
      </Private>
      <Set wrap={AppLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route
          path="/forgot-password"
          page={ForgotPasswordPage}
          name="forgotPassword"
        />
        <Route
          path="/reset-password"
          page={ResetPasswordPage}
          name="resetPassword"
        />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  );
};

export default Routes;
