import React from "react";
import SendIcon from "@mui/icons-material/Send";
import CopyrightIcon from '@mui/icons-material/Copyright';
import { Link } from "react-router-dom";
const Footer = () => {
  const Account = ["My Account", "Login/Register", "Cart", "Whishlist", "Shop"];
  const QuickLink = ["Privacy Policy", "Terms of Use", "FAQ", "Contact"];
  return (
    <>
      <div className="mt-8 py-5 lg:py-12 px-10 lg:px-20 bg-black  w-full flex sm:flex-row flex-wrap flex-col lg:justify-between justify-center items-start text-slate-300 gap-3">
        <div>
          <p className="text-2xl font-semibold mb-3">Exclusive</p>
          <div className="">
            <p className="mb-1">Subscribe</p>
            <p className="mb-2 text-sm">Get 10% off your first order</p>
            <div className="flex bg-transparent border border-slate-500 rounded-sm py-1 px-2">
              <input
                className="text-slate-400 bg-transparent focus:outline-none"
                type="text"
                placeholder="Enter you email"
              />
              <SendIcon className="text-slate-500 cursor-pointer" />
            </div>
          </div>
        </div>

        <div>
          <p className="text-lg font-semibold mb-3">Support</p>
          <div>
            <p className="mb-1 text-sm">
              12 Friends Colony, Badarqa,
              <br /> Azamgarh 276001
            </p>
            <p className="mb-1 text-sm">iamabdullahzubair@gmail.com</p>
            <p className="mb-1 text-sm">+91 8674834127</p>
          </div>
        </div>

        <div>
          <p className="text-lg font-semibold mb-3">Account</p>
          <div>
            {Account.map((acc) => (
              <Link key={acc} to={acc.replace(" ", "").toLowerCase()}>
                <p className="mb-1 text-sm">{acc}</p>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-lg font-semibold mb-3">Quick Links</p>
          <div>
            {QuickLink.map((qck) => (
              <Link key={qck} to={qck.replace(" ", "").toLowerCase()}>
                <p className="mb-1 text-sm">{qck}</p>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-lg font-semibold mb-3">Download App</p>
          <div>
            <p className="text-xs">Save $3 with App New User Only</p>
            {/* app */}
            <div></div>
            {/* social */}
            <div></div>
          </div>
        </div>
      </div>
      <div className="flex bg-black text-slate-500 border-t border-gray-700 px-8 lg:px-20 py-4 items-center justify-center gap-1">
        <CopyrightIcon />
        <p>Copyright Mohd Abdullah 2024. All right reserved</p>
      </div>
    </>
  );
};

export default Footer;
