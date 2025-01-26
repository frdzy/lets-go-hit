import { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms';
import { Link, navigate, routes } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';
import { toast, Toaster } from '@redwoodjs/web/toast';

import { useAuth } from 'src/auth';

const WELCOME_MESSAGE = 'Welcome back!';
const REDIRECT = routes.home();

const LoginPage = ({ type }) => {
  const {
    isAuthenticated,
    client: webAuthn,
    loading,
    logIn,
    reauthenticate,
  } = useAuth();
  const [shouldShowWebAuthn, setShouldShowWebAuthn] = useState(false);
  const [showWebAuthn, setShowWebAuthn] = useState(
    webAuthn.isEnabled() && type !== 'password',
  );

  // should redirect right after login or wait to show the webAuthn prompts?
  useEffect(() => {
    if (isAuthenticated && (!shouldShowWebAuthn || webAuthn.isEnabled())) {
      navigate(REDIRECT);
    }
  }, [isAuthenticated, shouldShowWebAuthn, webAuthn]);

  // focus on the email field as soon as the page loads
  const emailRef = useRef<HTMLInputElement | undefined>();
  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const onSubmit = async (data) => {
    const webAuthnSupported = await webAuthn.isSupported();

    if (webAuthnSupported) {
      setShouldShowWebAuthn(true);
    }
    const response = await logIn({
      username: data.email,
      password: data.password,
    });

    if (response.message) {
      // auth details good, but user not logged in
      toast(response.message);
    } else if (response.error) {
      // error while authenticating
      toast.error(response.error);
    } else {
      // user logged in
      if (webAuthnSupported) {
        setShowWebAuthn(true);
      } else {
        toast.success(WELCOME_MESSAGE);
      }
    }
  };

  const onAuthenticate = useCallback(async () => {
    try {
      await webAuthn.authenticate();
      await reauthenticate();
      toast.success(WELCOME_MESSAGE);
      navigate(REDIRECT);
    } catch (e) {
      if (e.name === 'WebAuthnDeviceNotFoundError') {
        toast.error('Device not found, log in with Email/Password to continue');
        setShowWebAuthn(false);
      } else {
        toast.error(e.message);
      }
    }
  }, [reauthenticate, webAuthn]);

  const onRegister = async () => {
    try {
      await webAuthn.register();
      toast.success(WELCOME_MESSAGE);
      navigate(REDIRECT);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const onSkip = () => {
    toast.success(WELCOME_MESSAGE);
    setShouldShowWebAuthn(false);
  };

  const AuthWebAuthnPrompt = () => {
    return (
      <div className="rw-webauthn-wrapper">
        <h2>WebAuthn Login Enabled</h2>
        <p>Log in with your fingerprint, face or PIN</p>
        <div className="rw-button-group">
          <button className="rw-button rw-button-blue" onClick={onAuthenticate}>
            Open Authenticator
          </button>
        </div>
      </div>
    );
  };

  const RegisterWebAuthnPrompt = () => (
    <div className="rw-webauthn-wrapper">
      <h2>No more Passwords!</h2>
      <p>
        Depending on your device you can log in with your fingerprint, face or
        PIN next time.
      </p>
      <div className="rw-button-group">
        <button className="rw-button rw-button-blue" onClick={onRegister}>
          Turn On
        </button>
        <button className="rw-button" onClick={onSkip}>
          Skip for now
        </button>
      </div>
    </div>
  );

  const PasswordForm = () => (
    <Form onSubmit={onSubmit} className="rw-form-wrapper">
      <Label
        name="email"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Email
      </Label>
      <TextField
        name="email"
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        ref={emailRef}
        validation={{
          required: {
            value: true,
            message: 'Email is required',
          },
        }}
      />

      <FieldError name="email" className="rw-field-error" />

      <Label
        name="password"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Password
      </Label>
      <PasswordField
        name="password"
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        autoComplete="current-password"
        validation={{
          required: {
            value: true,
            message: 'Password is required',
          },
        }}
      />

      <div className="rw-forgot-link">
        <Link to={routes.forgotPassword()} className="rw-forgot-link">
          Forgot Password?
        </Link>
      </div>

      <FieldError name="password" className="rw-field-error" />

      <div className="rw-button-group">
        <Submit className="rw-button rw-button-blue">Login</Submit>
      </div>
    </Form>
  );

  const formToRender = () => {
    if (showWebAuthn) {
      if (webAuthn.isEnabled()) {
        return <AuthWebAuthnPrompt />;
      } else {
        return <RegisterWebAuthnPrompt />;
      }
    } else {
      return <PasswordForm />;
    }
  };

  const linkToRender = () => {
    if (showWebAuthn) {
      if (webAuthn.isEnabled()) {
        return (
          <div className="rw-login-link">
            <span>or login with </span>{' '}
            <a href="?type=password" className="rw-link">
              email and password
            </a>
          </div>
        );
      }
    } else {
      return (
        <div className="rw-login-link">
          <span>Don&apos;t have an account?</span>{' '}
          <Link to={routes.signup()} className="rw-link">
            Sign up!
          </Link>
        </div>
      );
    }
  };

  if (loading) {
    return null;
  }

  return (
    <>
      <MetaTags title="Login" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Login</h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">{formToRender()}</div>
            </div>
          </div>
          {linkToRender()}
        </div>
      </main>
    </>
  );
};

export default LoginPage;
