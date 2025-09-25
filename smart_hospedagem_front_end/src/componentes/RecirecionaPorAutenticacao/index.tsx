// src/components/RedirectIfAuthenticated.tsx
import {type ReactNode} from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface RecirecionaPorAutenticacaoProps {
  children: ReactNode;
}

const RecirecionaPorAutenticacao: React.FC<RecirecionaPorAutenticacaoProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RecirecionaPorAutenticacao;
