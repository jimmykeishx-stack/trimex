"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

type Mode = "login" | "register";
type Role = "FARMER" | "AGENT" | "SUPPLIER";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("register");
  const [role, setRole] = useState<Role>("FARMER");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage(null);
    const form = new FormData(event.currentTarget); const email = String(form.get("email")); const password = String(form.get("password"));
    if (mode === "login") {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message); else window.location.href = data.user?.user_metadata.role === "AGENT" ? "/agent" : "/farmer";
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: form.get("fullName"), phone: form.get("phone"), location: form.get("location"), role } } });
      setMessage(error ? error.message : "Account created. Check your email to confirm your address, then sign in.");
    }
    setBusy(false);
  }

  return <main className="auth"><a className="brand" href="/">TRIMEX <small>INC.</small></a><section><div className="authIntro"><p className="eyebrow light">Trimex Platform</p><h1>{mode === "register" ? "Join the network." : "Welcome back."}</h1><p>Build a more connected agricultural future—from the farm to the market.</p></div><form onSubmit={submit}><p className="eyebrow">{mode === "register" ? "Create an account" : "Sign in"}</p><h2>{mode === "register" ? "Start with Trimex." : "Access your portal."}</h2>{mode === "register" && <><label>Account type<div className="rolePicker">{(["FARMER", "AGENT", "SUPPLIER"] as Role[]).map((item) => <button className={role === item ? "chosen" : ""} type="button" key={item} onClick={() => setRole(item)}>{item[0] + item.slice(1).toLowerCase()}</button>)}</div></label><label>Full name<input name="fullName" required placeholder="Your name or business name" /></label><label>Phone number<input name="phone" type="tel" required placeholder="e.g. 0712 345 678" /></label><label>Location<input name="location" required placeholder="County, town or farm location" /></label></>}<label>Email address<input name="email" type="email" required placeholder="you@example.com" /></label><label>Password<input name="password" type="password" required minLength={8} placeholder="At least 8 characters" /></label>{message && <p className="authMessage">{message}</p>}<button className="button lime" disabled={busy}>{busy ? "Please wait…" : mode === "register" ? "Create account ↗" : "Sign in ↗"}</button><p className="switch">{mode === "register" ? "Already have an account?" : "New to Trimex?"} <button type="button" onClick={() => { setMode(mode === "register" ? "login" : "register"); setMessage(null); }}>{mode === "register" ? "Sign in" : "Create an account"}</button></p></form></section></main>;
}
