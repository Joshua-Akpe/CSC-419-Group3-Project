import logo from "../../assets/Group1.png";
import MobileSteps from "./MobileSteps";
import { FaArrowRight } from "react-icons/fa";


function RegisterForm() {
  return (
    <div className="lg:w-full bg-white flex flex-col items-start justify-start p-0 md:p-8">

     <div className="w-full max-w-3xl">

        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <img
            src={logo}
            alt="Site logo"
            className="h-14"
          />
        </div>

        {/* Form */}
        <form className="space-y-5">

          {/* First & Last Name Row */}
          <div className="flex gap-4">
            
            {/* First Name */}
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First name :
              </label>
              <input
                type="text"
                placeholder="John"
                className="w-full rounded-lg border-2 border-[#02063E] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#02063E]"
              />
            </div>

            {/* Last Name */}
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last name :
              </label>
              <input
                type="text"
                placeholder="Doe"
                className="w-full rounded-lg border-2 border-[#02063E] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#02063E]"
              />
            </div>
          </div>


          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Email :
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border-2 border-[#02063E] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#02063E]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password :
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border-2 border-[#02063E] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#02063E]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password :
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border-2 border-[#02063E] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#02063E]"
            />
          </div>

          {/* Submit Button */}
          <button
  type="submit"
  className="w-full bg-[#02063E] text-white py-3 rounded-lg text-sm font-medium inline-flex items-center justify-center gap-2"
>
  <span>Continue</span>
  <FaArrowRight className="text-white" />
</button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account?{" "}
          <a href="#" className="text-[#02063E] font-medium hover:underline">
            Sign in
          </a>
        </p>

        
      {/* Mobile Step Tracker */}
      <MobileSteps activeStep={1} />

      </div>
    </div>
  );
}

export default RegisterForm;
