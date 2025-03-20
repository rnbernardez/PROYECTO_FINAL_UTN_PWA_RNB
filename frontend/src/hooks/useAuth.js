import { useState, useEffect } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ loggedIn: true });
    } else {
      setUser(null);
    }
  }, []);

  return { user };
};

export default useAuth;