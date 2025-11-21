"use client";

import './login.css'

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Image from 'next/image'


export default function LoginPage() {
  
  const router = useRouter();
  const params = useSearchParams();
  const error = params.get("error");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // If NextAuth reports an error (eg, providor/authorize failure), go to /unauthorized
  useEffect(() => {
    if(error) router.replace("/unauthorized");
  }, [error, router]);

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async () => {
    // Use NextAuth Credentials provider (server-side hits Keycloack token endpoint)
    setLoading(true);
    setLoginError(null);
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    setLoading(false);

    if (result?.ok && result.url) {
      // router.push(result.url);
      router.push("/dashboard")
    }
    else {
      router.push("/unauthorized")
    }
  }

  // const handleLogin = () => router.push("/dashboard"); // redirect after login

  return (

    <div>

      <div className="d-flex align-items-center justify-content-center mb-4">
        <Image className="me-4" src="/images/jpph_logo.png" alt="Example Logo" width={100} height={100}></Image>
        <h2 className="text-secondary p-0, m-0"><strong>JPPH Registration</strong></h2>
      </div>

      <div className="p-4 border rounded bg-white">
        <h3 className="text-center mb-3">Login</h3>
        <input className="form-control mb-3" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading && username.trim() && password.trim()) {
              handleLogin();
            }
          }}
        />
        
        <div className="position-relative mb-3 d-flex align-items-center justify-content-end">
          <input className="form-control pe-5" type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading && username.trim() && password.trim()) {
                handleLogin();
              }
            }}
          />
          <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute pe-3 eye-password-icon`} onClick={() => setShowPassword(!showPassword)}></i>
        </div>
        
        
        <button className="btn btn-primary w-100" onClick={handleLogin} disabled={ loading || !username.trim() || !password.trim()}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {loginError && <div className="text-danger mb-2">{loginError}</div>}
      </div>

    </div>

  );
}
