import React from "react";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import BreadCrumb from "../AdminDashboard/adminComponent/sidebar/BreadCrumb";

const userId = import.meta.env.VITE_EMAILJS_USER_ID;
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

const ContactPage = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    // Send the email using EmailJS
    emailjs.send(serviceId, templateId, {
      from_name: data.from_name,
      from_email: data.from_email,
      reply_to: data.reply_to,
      message: data.message,
    }, userId)
    .then((response) => {
      console.log("Email successfully sent!", response.status, response.text);
      toast.success("Email sent successfully!"); // Show success toast
      reset(); // Clear the form after successful submission
    })
    .catch((err) => {
      console.error("Failed to send email. Error:", err);
      toast.error("Failed to send email. Please try again!"); // Show error toast
    });
  };

  return (
    <div className="px-32 mt-10 mb-20">
      <div>
        <BreadCrumb />
      </div>
      <div className="flex gap-8 my-12">
        <div className="border-gray-200 rounded shadow-md px-8 py-12 w-[350px] dark:bg-gray-800">
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
          className="flex flex-col justify-center flex-grow gap-3 py-12 px-5 shadow-md rounded dark:bg-gray-800 dark:text-gray-700"
          onSubmit={handleSubmit(onSubmit)} // Call onSubmit on form submission
        >
          <div className="flex gap-3">
            <input
              {...register("from_name", { required: true })}
              className="focus:outline-none py-1 px-3 w-full bg-gray-100 rounded"
              type="text"
              placeholder="Your Name*"
            />
            <input
              {...register("from_email", { required: true })}
              className="focus:outline-none py-1 px-3 w-full bg-gray-100 rounded"
              type="email"
              placeholder="Your Email*"
            />
            <input
              {...register("reply_to", { required: true })}
              className="focus:outline-none py-1 px-3 w-full bg-gray-100 rounded"
              type="text"
              placeholder="Your Phone*"
            />
          </div>
          <div>
            <textarea
              {...register("message", { required: true })}
              className="focus:outline-none py-2 px-3 w-full h-40 bg-gray-100 rounded resize-none mt-3"
              placeholder="Your Message"
            />
          </div>
          <div className="flex justify-end">
            <button className="bg-secondary px-4 py-2 rounded text-white hover:bg-red-500">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;

