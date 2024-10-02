import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import DoneIcon from '@mui/icons-material/Done';
import Input from "../templates/InputComponet";


const AddressForm= forwardRef(({userAddress}, ref) => {
    const { register, handleSubmit, formState: { errors }, getValues, trigger, watch, reset } = useForm();
    useImperativeHandle(ref, () => ({
        getFormData : () => {
            return getValues();
        },
        trigger
    }))

    useEffect(() => {
      reset(userAddress);
    }, [userAddress])

    return (
        <div className="lg:w-1/3">
          <p className="text-xl font-semibold mb-5">Billing Details</p>
          <form>
            <div className="flex flex-col gap-4 w-full">
              <Input 
                label="First Name" 
                name="firstName"  // Added name prop
                register={register} 
                required 
                error={errors.firstName}  // Access error with name
              />
              <Input 
                label="Last Name" 
                name="lastName"  // Added name prop
                register={register} 
                required 
                error={errors.lastName}  // Access error with name
              />
              <Input 
                label="Phone Number" 
                name="phoneNumber"  
                register={register}  
                error={errors.phoneNumber}  
                required
              />
              <Input 
                label="Email" 
                name="email"  
                register={register}  
                error={errors.email}  
                required
              />
              <Input 
                label="Street Address" 
                name="streetAddress"  // Added name prop
                register={register} 
                required 
                error={errors.streetAddress}  // Access error with name
              />
              <Input 
                label="Apartment, Floor, etc." 
                name="apartmentDetails"  // Added name prop
                register={register}  
                error={errors.apartmentDetails}  // Access error with name
              />
              <Input 
                label="Town/City" 
                name="town"  
                register={register}  
                error={errors.town} 
                required
              />
              <Input 
                label="Pin Code" 
                name="pincode"  
                register={register}  
                error={errors.pincode} 
                required
              />
              
             
               <CustomCheckbox 
                label="Save this information for faster check-out next time" 
                name="saveAddress" 
                register={register}  
                error={errors.saveAddress}
                watch={watch}
              />
              {/* <button type="submit" className="mt-4 p-2 bg-secondary text-white rounded">Submit</button> */}
            </div>
          </form>
        </div>
      );
})

const AddressFormmm = ({userAddress, setUserAddress}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    setUserAddress(data)
  };

  return (
    <div className="w-1/3">
      <p className="text-xl font-semibold mb-5">Billing Details</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 w-full">
          <Input 
            label="First Name" 
            name="firstName"  // Added name prop
            register={register} 
            required 
            error={errors.firstName}  // Access error with name
          />
          <Input 
            label="Last Name" 
            name="lastName"  // Added name prop
            register={register} 
            required 
            error={errors.lastName}  // Access error with name
          />
          <Input 
            label="Street Address" 
            name="streetAddress"  // Added name prop
            register={register} 
            required 
            error={errors.streetAddress}  // Access error with name
          />
          <Input 
            label="Apartment, Floor, etc." 
            name="apartmentDetails"  // Added name prop
            register={register}  
            error={errors.apartmentDetails}  // Access error with name
          />
          <Input 
            label="Town/City" 
            name="town"  
            register={register}  
            error={errors.town} 
            required
          />
          <Input 
            label="Phone Number" 
            name="phoneNumber"  
            register={register}  
            error={errors.phoneNumber}  
            required
          />
          <Input 
            label="Email" 
            name="email"  
            register={register}  
            error={errors.email}  
            required
          />
         
           <CustomCheckbox 
            label="Save this information for faster check-out next time" 
            name="saveAddress" 
            register={register}  
            error={errors.saveAddress}
          />
          <button type="submit" className="mt-4 p-2 bg-secondary text-white rounded">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;



  function CustomCheckbox({ label, name, register, required, error, watch }) {
    const isChecked = watch(name)
    return (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={name}
          {...register(name, { required })}
          className="hidden"  // Hide the default checkbox
         
        />
        <label htmlFor={name} className="flex items-center cursor-pointer">
          {/* Custom styled checkbox */}
          <span className={`w-5 h-5 border-2 border-gray-400 rounded-sm flex-shrink-0 flex items-center justify-center
            ${error ? 'border-red-500' : 'border-gray-400'} 
            ${isChecked && "bg-secondary border-secondary text-white" }
          `}>{isChecked && <DoneIcon fontSize="small"/>}</span>
          <span className="ml-2 md:text-base text-sm text-gray-400">{label}{required && "*"}</span>
        </label>
        {error && <span className="text-red-500 text-sm">This field is required</span>}
      </div>
    );
  }