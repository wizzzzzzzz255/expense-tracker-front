import { useState, useEffect } from "react";
import api from "../utils/api";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/";
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const res = await api.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.access_token);
        window.location.href = "/";
      } else {
        await api.post("/auth/register", { email, password, currency });
        // Automatically login after successful registration
        const res = await api.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.access_token);
        window.location.href = "/";
      }
    } catch (err: any) {
      console.error("Auth failed", err);

      // Handle array of Pydantic validation errors (e.g., password complexity)
      if (err.response?.status === 422 && Array.isArray(err.response?.data?.detail)) {
        const errorMsg = err.response.data.detail[0]?.msg || "Validation error";
        setError(errorMsg);
      }
      // Handle standard string errors (like "Email already registered")
      else if (err.response?.data?.detail) {
        setError(String(err.response.data.detail));
      }
      else {
        setError(err.message || "An error occurred during authentication.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-textMain px-6">
      <div className="bg-surface p-8 rounded-2xl shadow-2xl border border-border w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-textMuted">
            {isLogin ? "Sign in to your expense tracker" : "Start tracking your expenses today"}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-textMuted">Email</label>
            <input
              className="w-full p-4 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-textMuted">Password</label>
            <input
              className="w-full p-4 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {!isLogin && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-textMuted">Preferred Currency</label>
              <select
                className="w-full p-4 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none appearance-none"
                value={currency}
                onChange={e => setCurrency(e.target.value)}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
                <option value="INR">INR (₹)</option>
                <option value="CAD">CAD ($)</option>
                <option value="BDT">BDT (৳)</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 bg-primary hover:bg-primaryHover text-white font-medium py-4 px-6 rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? "Please wait..." : (isLogin ? "Sign In" : "Sign Up")}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-textMuted">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            className="text-primary hover:text-primaryHover font-medium transition-colors outline-none"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
