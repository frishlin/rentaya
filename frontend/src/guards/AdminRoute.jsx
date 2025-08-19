import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function getUser() {
  const raw = localStorage.getItem("usuario");
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function isAdmin(user) {
  if (!user) return false;
  const r = user.rol;
  if (Array.isArray(r)) return r.includes("ADMIN") || r.includes("ROLE_ADMIN");
  if (typeof r === "string") return ["ADMIN", "ROLE_ADMIN"].includes(r.toUpperCase());
  return false;
}

export default function AdminRoute() {
  const user = getUser();
  return isAdmin(user) ? <Outlet /> : <Navigate to="/login" replace />;
}