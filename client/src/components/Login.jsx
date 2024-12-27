import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Sign In");

  const { setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "Sign In") {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
          toast.success("Signed in successfully!")
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
          toast.success("Signed up successfully!")
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={formSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm text-center mt-2">
          {state == "Sign In" ? "Welcome back!" : "Create account to continue"}
        </p>

        {state !== "Sign In" && (
          <div className="flex border px-6 py-2 items-center gap-2 rounded-full mt-5">
            <img src={assets.profile_icon} alt="logo" width={20} />
            <input
              className="outline-none text-sm"
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="flex border px-6 py-2 items-center gap-2 rounded-full mt-5">
          <img src={assets.email_icon} alt="logo" />
          <input
            className="outline-none text-sm"
            type="email"
            placeholder="Email id"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex border px-6 py-2 items-center gap-2 rounded-full mt-5">
          <img src={assets.lock_icon} alt="logo" />
          <input
            className="outline-none text-sm"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {state === "Sign In" && (
          <p className="text-sm text-blue-600 my-4 ml-2 cursor-pointer">
            Forgot Password?
          </p>
        )}

        <button
          className={`w-full bg-blue-600 text-white py-2 rounded-full ${
            state === "Sign Up" ? "my-4" : ""
          }`}
        >
          {state === "Sign In" ? "Sign In" : "Sign Up"}
        </button>

        {state === "Sign In" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign In")}
            >
              Sign in
            </span>
          </p>
        )}

        <img
          src={assets.cross_icon}
          alt="close"
          className="absolute top-5 right-5 cursor-pointer hover:bg-gray-100 p-2 rounded-full"
          onClick={() => setShowLogin(false)}
        />
      </motion.form>
    </div>
  );
};
export default Login;
