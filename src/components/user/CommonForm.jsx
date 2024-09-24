import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../templates/InputComponet';
import { toast } from 'react-toastify';
import Placeholder from '../templates/Placeholder';

const CommonForm = ({ onSubmit, fields, title, loading, initialData }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    if (initialData) {
      reset(initialData); // Set initial values when data is fetched
    }
  }, [initialData, reset]);

  return (
    <>
      <p className="text-lg font-bold text-secondary mb-4">{title}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-3">
        {loading && <div className="h-56 w-full"><Placeholder /></div>}
        {!loading && (
          <div className="flex flex-col gap-4">
            {fields.map((field, index) => (
              <div key={index} className="flex gap-2 justify-between">
                <Input
                  label={field.label}
                  name={field.name}
                  register={register}
                  required={field.required}
                  error={errors[field.name]}
                />
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-end">
          <button type="submit" disabled={loading} className={`px-4 py-2 bg-secondary text-white rounded ${loading && "cursor-not-allowed bg-red-400"}`}>
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};

export default CommonForm;
