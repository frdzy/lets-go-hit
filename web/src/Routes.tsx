// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from "@redwoodjs/router";
import AppLayout from "src/layouts/AppLayout/AppLayout";

const Routes = () => {
  return (
    <Router>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Set wrap={AppLayout}>
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Private unauthenticated="home">
        <Set wrap={AppLayout}>
          <Route path="/schedule/{id}" page={SchedulePage} name="schedule" />
          <Route path="/schedules" page={SchedulesPage} name="schedules" />
        </Set>
      </Private>
      <Route notfound page={NotFoundPage} />
    </Router>
  );
};

export default Routes;
