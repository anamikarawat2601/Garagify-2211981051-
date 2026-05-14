import Navbar from "../components/Navbar";
import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); // clear previous messages
    setLoading(true);

    // Validation
    if (!username.trim()) {
      setMessage("Username is required");
      setLoading(false);
      return;
    }
    if (!password.trim()) {
      setMessage("Password is required");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/login", { username, password });

      // Store the token in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);

      setMessage("Login successful 🎉");

      // Redirect to home after 1 second
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.logo}>Garagify</h1>
          <p style={styles.subtitle}>Welcome back!</p>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <div style={styles.inputIcon}>
              <Mail size={20} color="#4f46e5" />
            </div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.inputIcon}>
              <Lock size={20} color="#4f46e5" />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && <p style={{...styles.message, backgroundColor: message.includes('successful') ? '#10b981' : '#ef4444'}}>{message}</p>}

        <div style={styles.footer}>
          <p style={styles.footerText}>Don't have an account? 
            <button 
              type="button"
              onClick={() => navigate("/sign")}
              style={styles.link}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// Dark theme styling
const styles = {
  pageContainer: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  container: {
    maxWidth: "420px",
    width: "100%",
    backgroundColor: "#1f2937",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    border: "1px solid #374151",
  },
  header: {
    marginBottom: "30px",
    textAlign: "center",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "700",
    background: "linear-gradient(to right, #4f46e5, #3b82f6)",
    WebkitBackgroundClip: "text",
    color: "transparent",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  inputGroup: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "12px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "12px 12px 12px 42px",
    fontSize: "14px",
    border: "1px solid #374151",
    borderRadius: "8px",
    backgroundColor: "#111827",
    color: "#f3f4f6",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    marginTop: "10px",
  },
  message: {
    marginTop: "16px",
    fontWeight: "600",
    padding: "12px",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "14px",
    color: "white",
  },
  footer: {
    marginTop: "24px",
    textAlign: "center",
  },
  footerText: {
    color: "#9ca3af",
    fontSize: "14px",
    margin: "0",
  },
  link: {
    background: "none",
    border: "none",
    color: "#4f46e5",
    cursor: "pointer",
    fontWeight: "600",
    marginLeft: "5px",
    transition: "color 0.3s ease",
    fontSize: "14px",
  },
};

export default Login;
