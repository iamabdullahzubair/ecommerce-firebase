import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import BreadCrumb from "../components/templates/BreadCrumb";

const userId = import.meta.env.VITE_EMAILJS_USER_ID;
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

const ContactPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    emailjs.send(serviceId, templateId, {
      from_name: data.from_name,
      from_email: data.from_email,
      reply_to: data.reply_to,
      message: data.message,
    }, userId)
    .then((response) => {
      console.log("Email successfully sent!", response.status, response.text);
      toast.success("Email sent successfully!");
      reset();
      setLoading(false);
    })
    .catch((err) => {
      console.error("Failed to send email. Error:", err);
      toast.error("Failed to send email. Please try again!");
      setLoading(false);
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="lg:px-32 md:px-12 px-10 mt-10 mb-20">
      <div>
        <BreadCrumb />
      </div>
      <div className="flex gap-8 my-12 md:flex-row flex-col justify-center items-center">
        <div className="border-gray-200 rounded shadow-md lg:px-8 md:px-4 px-8 py-12 lg:w-[350px] md:w-1/3 w-full dark:bg-gray-800 text-wrap">
          <div className="flex flex-col gap-2 border-b-2 border-gray-200 mb-8 pb-8">
            <span className="flex items-center gap-3">
              <p className="p-1 bg-secondary rounded-full text-white">
                <CallIcon />
              </p>
              <p className="text-base font-semibold">Call To Us</p>
            </span>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone : +91 8674834127</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-3">
              <p className="p-1 bg-secondary rounded-full text-white">
                <EmailIcon />
              </p>
              <p className="text-base font-semibold">Write To Us</p>
            </span>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>Email : mohdabdullah2jan@gmail.com</p>
            <p>Email : iamabdullahzubair@gmail.com</p>
          </div>
        </div>

        <form
          className="flex flex-col justify-center flex-grow gap-3 py-12 px-5 md:px-5 lg:px-8 shadow-md rounded dark:bg-gray-800 dark:text-gray-700 md:w-2/3 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-3 lg:flex-row flex-col">
            <div className="w-full">
              <input
                {...register("from_name", { required: "Name is required" })}
                className={`focus:outline-none py-1 px-3 w-full bg-gray-100 rounded ${errors.from_name ? 'border-red-600' : 'border-gray-300'} border`}
                type="text"
                placeholder="Your Name*"
              />
              {errors.from_name && <p className="text-xs text-red-600">{errors.from_name.message}</p>}
            </div>

            <div className="w-full">
              <input
                {...register("from_email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className={`focus:outline-none py-1 px-3 w-full bg-gray-100 rounded ${errors.from_email ? 'border-red-600' : 'border-gray-300'} border`}
                type="email"
                placeholder="Your Email*"
              />
              {errors.from_email && <p className="text-xs text-red-600">{errors.from_email.message}</p>}
            </div>

            <div className="w-full">
              <input
                {...register("reply_to", { 
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid phone number, must be 10 digits",
                  },
                })}
                className={`focus:outline-none py-1 px-3 w-full bg-gray-100 rounded ${errors.reply_to ? 'border-red-600' : 'border-gray-300'} border`}
                type="text"
                placeholder="Your Phone*"
              />
              {errors.reply_to && <p className="text-xs text-red-600">{errors.reply_to.message}</p>}
            </div>
          </div>

          <div>
            <textarea
              {...register("message", { required: "Message is required" })}
              className={`focus:outline-none py-2 px-3 w-full h-20 lg:h-40 bg-gray-100 rounded resize-none mt-3 ${errors.message ? 'border-red-600' : 'border-gray-300'} border`}
              placeholder="Your Message*"
            />
            {errors.message && <p className="text-xs text-red-600">{errors.message.message}</p>}
          </div>

          <div className="flex justify-end">
            <button
              disabled={loading}
              className={`px-4 py-2 rounded ${loading ? "bg-gray-300 hover:cursor-not-allowed text-black" : "bg-secondary hover:bg-red-500 text-gray-200"}`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
