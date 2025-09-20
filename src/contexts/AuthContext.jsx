import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: true, 
        user: action.payload,
        error: null 
      };
    case 'LOGIN_ERROR':
      return { 
        ...state, 
        loading: false, 
        error: action.payload,
        isAuthenticated: false,
        user: null 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        isAuthenticated: false, 
        user: null, 
        loading: false,
        error: null 
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true, // Start with loading true to prevent flash
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check if user is already logged in (localStorage persistence)
    const savedUser = localStorage.getItem('exportezy_user');
    if (savedUser) {
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: JSON.parse(savedUser) 
      });
    } else {
      // For demo purposes, auto-login with default user
      const defaultUser = {
        id: 1,
        name: 'Jayanita Employee',
        email: 'demo@exportezy.com',
        role: 'Logistics Manager',
        avatar: 'https://ui-avatars.com/api/?name=Jayanita+Employee&background=3b82f6&color=fff'
      };
      localStorage.setItem('exportezy_user', JSON.stringify(defaultUser));
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: defaultUser 
      });
    }
  }, []);

  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - accept any email/password
      if (credentials.email && credentials.password) {
        const user = {
          id: 1,
          name: 'Jayanita Employee',
          email: credentials.email,
          role: 'Logistics Manager',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent('Jayanita Employee')}&background=3b82f6&color=fff`
        };
        
        localStorage.setItem('exportezy_user', JSON.stringify(user));
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        return { success: true };
      } else {
        throw new Error('Please provide email and password');
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('exportezy_user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
