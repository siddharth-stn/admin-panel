import { NavLink } from "react-router";
import loginImage from "../assets/loginImage.avif";

/**
 * Login — landing page at "/" with email/password form and a side image.
 * Split into two halves: left has the login form, right shows a decorative image.
 */
const Login = () => {
  return (
    <div className="wrapper bg-[#E6E7EB] grid h-screen place-items-center">
      <div className="login-outer bg-white p-6 rounded-2xl flex gap-2 w-200 h-150">
        {/* Left half — login form */}
        <div className="login-left grid place-items-center w-1/2">
          <div className="left-inner w-75">
            <div>
              <h3 className="text-[#002D74] text-[25px] font-bold">Login</h3>
            </div>
            <form className="text-[21px]">
              {/* Email input */}
              <div className="flex flex-col mb-5 mt-5">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter Email Address"
                  className="outline-0 border border-[black] bg-gray-200 rounded mt-1 p-2"
                />
              </div>
              {/* Password input */}
              <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  className="outline-0 border border-[black] bg-gray-200 rounded mt-1 p-2"
                />
              </div>
              <NavLink to="/dashboard">
                <button className="bg-[#2B7FFF] rounded text-white mt-5 w-full px-5 py-2 cursor-pointer">
                  Login
                </button>
              </NavLink>
            </form>
          </div>
        </div>
        {/* Right half — decorative image */}
        <div className="login-right rounded-2xl w-1/2 overflow-hidden">
          <img src={loginImage} alt="some login" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Login;
