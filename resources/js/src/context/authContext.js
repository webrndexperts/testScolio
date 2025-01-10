import React,{useState,createContext,useContext} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [authed,setAuthed]=useState(false);
    const [userData,serUserData]=useState()
    
    const authLogin =(data)=>{
        setAuthed(data.success)
        serUserData(data)
    };

    const authLogout =()=>{
        setAuthed(false)
        serUserData(null)
    };

   return (
     <AuthContext.Provider value={{authed,setAuthed,authLogin,authLogout,userData,serUserData}}>
        {children}
     </AuthContext.Provider>
   );
};

export const useAuth = () => {
    return useContext(AuthContext);
  };