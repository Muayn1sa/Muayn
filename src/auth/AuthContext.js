import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });


  const login = async (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const user = users.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      
      if (user) {
        const userToStore = { ...user, lastLogin: new Date().toISOString() };
        setCurrentUser(userToStore);
        localStorage.setItem('currentUser', JSON.stringify(userToStore));
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.some(u => 
        u.email.toLowerCase() === userData.email.toLowerCase() || u.phone === userData.phone
      );

      if (userExists) {
        return false;
      }

      const newUser = { ...userData, createdAt: new Date().toISOString() };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      setCurrentUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      return true;
    } catch (error) {
      return false;
    }
  };

  const updateUser = async (userData) => {
    try {
      setCurrentUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return true;
    } catch (error) {
      return false;
    }
  };



  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateSubscription = async (subscriptionData) => {
    try {
      const updatedUser = {
        ...currentUser,
        subscription: subscriptionData.type,
        subscriptionStartDate: subscriptionData.startDate,
        subscriptionEndDate: subscriptionData.endDate,
        subscriptionStatus: subscriptionData.status
      };

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map(user => 
        user.email === currentUser.email ? updatedUser : user
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      return false;
    }
  };

  const isGoldMember = (user) => {
    return user?.subscription === 'شريك مُعين';
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      setCurrentUser,
      login,
      register,
      updateUser,
      logout,
      updateSubscription,
      isGoldMember
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);