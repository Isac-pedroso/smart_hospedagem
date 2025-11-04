// src/components/RedirectIfAuthenticated.tsx
import {type ReactNode} from "react";
import { Navigate } from "react-router-dom";
import { store } from "../../store/store";
import { useSelector } from "react-redux";

interface RecirecionaPorAutenticacaoProps {
  children: ReactNode;
}

const RecirecionaPorAutenticacao: React.FC<RecirecionaPorAutenticacaoProps> = ({ children }) => {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RecirecionaPorAutenticacao;
