import { createContext, useContext, useEffect, useState } from "react";
import AxiosConfiguracao from "../api/axiosConfig";
import AuthService from "../services/AuthService";

interface AuthUser {
  id?: number;
  nome: string;
  email: string;
  role: string;
}

const api = new AxiosConfiguracao("http://localhost:8080");
const authService = new AuthService(api);

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<AuthUser>;
  deslogar: () => void;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(authService.getToken());
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(!!token);

  useEffect(() => {
    const init = async () => {
      const token = authService.getToken();
      if (!token) return setLoading(false);
      api.setBearer(token);
      try {
        const { data } = await api.client.get<AuthUser>("/auth/usuarioAutenticado");
        setUser(data);
      } catch (error) {
        authService.logout();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [token]);

  const login = async (email: string, senha: string) => {
    const token = await authService.login(email, senha);
    console.log("Authcontext")
    console.log(token);
    setToken(token);

    api.setBearer(token);

    const { data } = await api.client.get<AuthUser>("/auth/usuarioAutenticado");
    setUser(data);

    return data;
  };

  const deslogar = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  const hasRole = (role: string) => user?.role === role;

  return (
    <AuthContext.Provider value={{ user, loading, login, deslogar, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
