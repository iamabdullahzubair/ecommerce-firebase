import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import Input from "../../../components/templates/InputComponet";
import CustomCheckbox from "../../../components/templates/CustomCheckBox";
import CustomSelectForm from "../../../components/templates/CustomSelectForm";
import { toast } from "react-toastify";
import { Timestamp } from "firebase/firestore";
import { useOrders } from "../../contexts/OrderContext";
import LoadingOverlay from "../../../components/order/LoadingOverlay";

const EditTrack = ({id:orderId, initialData, onClose, setTrackingData }) => {
  const [trackData, setTrackData] = useState(initialData || []);
const [loading, setLoading] = useState(false)


  const {ordersList,updateOrdersList} = useOrders()
  // Handle form submission for each track
  const handleUpdateTrack = (data, index) => {
    const updatedTrackData = trackData.map((track, i) => (i === index ? { ...track, ...data } : track));
    setTrackData(updatedTrackData);
  };

  // Add a new track
  const handleAddTrack = () => {
    if(trackData.length != 0){
      const currentTrack = trackData[trackData.length-1]
      if(!currentTrack.status || !currentTrack.desc || !currentTrack.confirmedBy){
        toast.warn("Please fill the current track")
        return
      }
    }

    const newTrack = {
      status: "",
      desc: "",
      confirmedBy: "",
      completed: false,
      timestamp : Timestamp.now()
    };
    setTrackData([...trackData, newTrack]);
  };

  // Remove a track by index
  const handleRemoveTrack = (index) => {
    const updatedTrackData = trackData.filter((_, i) => i !== index);
    setTrackData(updatedTrackData);
  };

  // Validation function for done button
  const validateTracks = () => {
    if(trackData.length == 0){
      return false
    }
    for (const track of trackData) {
      if (!track.status || !track.desc || !track.confirmedBy) {
        return false; // Return false if any required field is missing
      }
    }
    return true; // All required fields are filled
  };

  // Handle done button click
  const handleDoneButtonClick = async() => {
    if (validateTracks()) {
      setLoading(true)
      console.log(trackData); // Log the complete track data
      setTrackingData(trackData)
      let currentOrder = ordersList.find(order => order.id == orderId)
      currentOrder = {...currentOrder, tracking: trackData, status: trackData[trackData.length-1]?.status}
      const {success} = await updateOrdersList(orderId,currentOrder)
      if(success){
        setLoading(false)
        onClose()
      }
    } else {
      // Show validation error, you can use a toast or alert
      alert("Please fill all required fields before proceeding.");
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <p className="text-base font-semibold">Update Tracking</p>
        <div className="flex gap-5">
          <button onClick={handleAddTrack}>
            <ControlPointIcon fontSize="small" />
          </button>
          <button onClick={handleDoneButtonClick}>
            <DownloadDoneIcon fontSize="small" />
          </button>
          <button className="px-2 py-1 rounded bg-secondary text-xs text-white" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {trackData.map((track, index) => (
          <TrackInputComponent
            key={index}
            index={index}
            submitData={handleUpdateTrack}
            initialData={track}
            removeField={() => handleRemoveTrack(index)}
            loading={loading}
          />
        ))}
      </div>
      <LoadingOverlay isLoading={loading} text={"Updating your track, Please wait!!"} />
    </div>
  );
};

export default EditTrack;

function TrackInputComponent({ submitData, initialData, index, removeField, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm({
    defaultValues: initialData, // Setting default values properly
  });

  // Submit handler for track input form
  const submitTrack = (data) => {
    submitData(data, index);
    toast.success("updated!!")
  };

  // Reset form values whenever initialData changes
  useEffect(() => {
    reset(initialData); // Reset form data with initial values
  }, [initialData, reset]);

  // Dropdown options for track status
  const options = ["Order Placed", "Processing", "Shipped", "Delivered"];

  return (
    <div className="dark:bg-gray-900 bg-gray-50 rounded-lg px-5 py-3 shadow-sm">
      <form id={`track-form-${index}`} onSubmit={handleSubmit(submitTrack)} className="flex flex-col w-full gap-2">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <CustomSelectForm
              label={"Status"}
              name={"status"} // No unique name
              register={register}
              error={errors.status}
              options={options}
              defaultValue={initialData.status}
              setValue={setValue}
              required
            />
          </div>
          <div className="flex-1">
            <Input
              name={"desc"} // No unique name
              label={"Description"}
              register={register}
              error={errors.desc}
              required
              textStyle="text-gray-800"
            />
          </div>
          <div className="flex-1">
            <Input
              name={"confirmedBy"} // No unique name
              label={"Confirmed By"}
              register={register}
              error={errors.confirmedBy}
              required
              textStyle="text-gray-800"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <CustomCheckbox
            name={`completed`} // No unique name
            id={`completed-${index}`} // No unique name
            label={"Completed"}
            register={register}
            error={errors.completed}
            watch={watch}
            defaultChecked={initialData.completed} // Ensure it reflects initial state
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={removeField}
              className="bg-red-500 text-sm font-semibold px-2 py-1 rounded text-white"
              disabled={loading}
            >
              Remove
            </button>
            <button
              type="submit"
              className="bg-secondary text-sm font-semibold px-2 py-1 rounded text-white"
              disabled={loading}
            >
              {initialData && initialData.status ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
