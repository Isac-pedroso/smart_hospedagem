// src/components/RequireAuth.tsx
import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface ValidAutenticacaoProps {
  children: ReactNode ;
}

const ValidAutenticacao: React.FC<ValidAutenticacaoProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // ou um spinner

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ValidAutenticacao;
