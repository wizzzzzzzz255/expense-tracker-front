import { useState } from "react";
import api from "../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.access_token);
      window.location.href = "/"; // Redirect to dashboard
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-textMain px-6">
      <div className="bg-surface p-8 rounded-2xl shadow-2xl border border-border w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome Back</h1>
          <p className="text-textMuted">Sign in to your expense tracker</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-textMuted">Email</label>
            <input 
              className="w-full p-4 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
              type="email"
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="you@example.com" 
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
            />
          </div>

          <button 
            className="w-full mt-6 bg-primary hover:bg-primaryHover text-white font-medium py-4 px-6 rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98]"
            onClick={handleLogin}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
