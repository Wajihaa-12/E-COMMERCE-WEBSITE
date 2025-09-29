import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const  Login= () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext)


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + "/api/user/register", { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)

    }

  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
  <div className="inline-flex items-center gap-2 mb-2 mt-10">
    <p className="prata-regular text-3xl">{currentState}</p>
    <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
  </div>

  {/* Name input sirf Sign Up ke liye */}
  {currentState === 'Login' ? '' : (
    <input 
      onChange={(e)=>setName(e.target.value)} 
      value={name} 
      type="text" 
      className="w-full px-3 py-2 border border-gray-800" 
      placeholder="Name" 
      required 
    />
  )}

  <input 
    onChange={(e)=>setEmail(e.target.value)} 
    value={email} 
    type="email" 
    className="w-full px-3 py-2 border border-gray-800" 
    placeholder="Email" 
    required 
  />

  <input  
    onChange={(e)=>setPassword(e.target.value)} 
    value={password} 
    type="password" 
    className="w-full px-3 py-2 border border-gray-800" 
    placeholder="Password" 
    required 
  />

  {/* Forgot Password */}
  {currentState === 'Login' && (
    <div className="w-full text-right text-sm -mt-2">
      <p className="cursor-pointer hover:underline">Forgot Your Password?</p>
    </div>
  )}

  {/* Button */}
   <button className="bg-black text-white font-light px-8 py-2 mt-2 
             rounded-md shadow-md transition-all duration-300
             hover:bg-gray-800 hover:scale-105 hover:shadow-lg"
>
    {currentState === 'Login' ? 'Login' : 'Sign Up'}
  </button>

  {/* Switch between Login & Sign Up */}
  <div className="w-full text-center text-sm mt-2">
    {currentState === 'Login' ? (
      <p>
        Don’t have an account?{" "}
        <span 
          onClick={()=>setCurrentState('Sign Up')} 
          className="cursor-pointer text-blue-600 hover:underline"
        >
          Create Your Account
        </span>
      </p>
    ) : (
      <p>
        Already have an account?{" "}
        <span 
          onClick={()=>setCurrentState('Login')} 
          className="cursor-pointer text-blue-600 hover:underline"
        >
          Login Here
        </span>
      </p>
    )}
  </div>
</form>
  );
}
export default Login;
