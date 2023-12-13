import { createContext, useEffect, useState } from "react"


export const UserContext = createContext()

export const UserContextProvider = (props) => {

  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setIsLoggedIn(true)
    }
  }, []);


  const saveUserData = (_data) => {
    localStorage.setItem("user", JSON.stringify(_data));
    setIsLoggedIn(true);
    setUser(_data)
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        saveUserData,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )

}