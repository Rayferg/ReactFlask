import React,{useContext, useEffect} from 'react'
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

const Private = () => {
  const { store, actions } = useContext(Context);
let navigate=useNavigate()
  useEffect(()=>{
    console.log(store)
    actions.getPrivate(  localStorage.getItem("token")    )
    if(!store.isLogin){navigate("/")}
  },[])
  return (
    <div>private</div>
    
  )
}

export default Private