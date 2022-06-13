import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../context-api/AuthContext";
import Button from "../singup/button/Button";
import Form from "../singup/form/Form";
import TextInput from "../singup/text-input/TextInput";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const { login } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      history.push("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to login!");
    }
  }

  return (
    <Form style={{ height: "330px" }} onSubmit={handleSubmit}>
      <TextInput type="text" placeholder="Enter email" icon="alternate_email" required value={email} onChange={(e) => setEmail(e.target.value)} />

      <TextInput type="password" placeholder="Enter password" icon="lock" required value={password} onChange={(e) => setPassword(e.target.value)} />

      <Button type="submit" disabled={loading}>
        <span>Submit Now</span>
      </Button>

      {error && <p className="error">{error}</p>}

      <div className="info">
        Don't have an account? <Link to="/singup">Singup</Link> instead.
      </div>
    </Form>
  );
}