import { createContext, useContext, useEffect, useMemo, useState } from 'react';


type User = {
  username: string;
  email: string;
};

type RegisterData = {
  username: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

type StoredUser = User & {
  password: string;
};

type AuthContextType = {
  user: User | null;
  register: (data: RegisterData) => { success: boolean; message: string };
  login: (data: LoginData) => { success: boolean; message: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CURRENT_USER_KEY = 'currentUser';
const USERS_KEY = 'users';

function getStoredUsers(): StoredUser[] {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [];
}

function setStoredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUser(): User | null {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const register = ({ username, email, password }: RegisterData) => {
    const users = getStoredUsers();
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      return { success: false, message: 'User with this email already exists.' };
    }

    const newUser: StoredUser = { username, email, password };
    const updatedUsers = [...users, newUser];

    setStoredUsers(updatedUsers);

    const currentUser: User = { username, email };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    setUser(currentUser);

    return { success: true, message: 'Registration successful.' };
  };

  const login = ({ email, password }: LoginData) => {
    const users = getStoredUsers();
    const existingUser = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!existingUser) {
      return { success: false, message: 'Invalid email or password.' };
    }

    const currentUser: User = {
      username: existingUser.username,
      email: existingUser.email,
    };

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    setUser(currentUser);

    return { success: true, message: 'Login successful.' };
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      register,
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}