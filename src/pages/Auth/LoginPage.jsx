import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MdLock, MdMail, MdLogin, MdLockOpen } from "react-icons/md";
import FormInput from "../../components/Common/FormInput";
import authBackground from "../../assets/auth-background-image.jpg";
import logoBackground from "../../assets/login-bg.jpg";

import whiteLogo from "../../assets/white-logo.png";

import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailError = useMemo(() => {
    if (!touched.email) return "";
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Enter a valid email address";
  }, [email, touched.email]);

  const passwordError = useMemo(() => {
    if (!touched.password) return "";
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  }, [password, touched.password]);

  const isFormValid =
    email && password && password.length >= 6 && !emailError && !passwordError;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setTouched({ email: true, password: true });

    setIsSubmitting(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div
      className="login-shell"
      style={{ backgroundImage: `url(${authBackground})` }}
    >
      <div className="login-gradient" />

      <div className="login-container">
        <div className="login-card">
          <div className="login-brand">
            <div
              className="login-logo-pill"
              style={{
                backgroundImage: `url(${logoBackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                display: "block",
              }}
            >
              <img
                src={whiteLogo}
                alt="Convier Solutions"
                className="login-logo-image"
              />
            </div>

            <div className="login-title-row">
              <span className="login-title-icon">
                <MdLockOpen size={30} />
              </span>
              <div>
                <h1 className="login-title">Welcome back</h1>
                <p className="login-subtitle">
                  Sign in to manage orders, roles and production in one unified
                  workspace.
                </p>
              </div>
            </div>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <FormInput
              label="Email address"
              icon={MdMail}
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              error={emailError}
              required
            />

            <div className="login-field">
              <div className="login-label-row">
                <span className="login-label">Password</span>

                <button type="button" className="login-link-ghost">
                  Forgot password?
                </button>
              </div>

              <FormInput
                icon={MdLock}
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                error={passwordError}
                required
              />
            </div>

            <div className="login-options">
              <label className="login-remember">
                <span className="login-checkbox">
                  <input type="checkbox" />

                  <span className="login-checkbox-indicator" />
                </span>

                <span>Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              className="login-submit"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? (
                <span className="login-spinner" aria-hidden="true" />
              ) : (
                <MdLogin size={18} />
              )}

              <span>{isSubmitting ? "Signing in..." : "Sign in"}</span>
            </button>

            <p className="login-footer-text">
              By continuing you agree to our{" "}
              <button type="button" className="login-link-inline">
                Terms
              </button>{" "}
              and{" "}
              <button type="button" className="login-link-inline">
                Privacy
              </button>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
