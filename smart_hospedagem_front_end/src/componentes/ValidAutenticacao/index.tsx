// src/components/RequireAuth.tsx
import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { store } from "../../store/store";
import { useSelector } from "react-redux";

interface ValidAutenticacaoProps {
  children: ReactNode ;
}

const ValidAutenticacao: React.FC<ValidAutenticacaoProps> = ({ children }) => {
  
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ValidAutenticacao;
