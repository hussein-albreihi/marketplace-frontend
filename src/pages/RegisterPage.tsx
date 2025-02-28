import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleRegister = () => {
    if (!username || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    localStorage.setItem("registeredUser", JSON.stringify({ username, password }));
    login(username);
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <Input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <Button onClick={handleRegister} variant="primary">Register</Button>
      <p className="text-center mt-4">
        Already have an account? <a href="/login" className="text-blue-600">Login</a>
      </p>
    </div>
  );
};

export default RegisterPage;