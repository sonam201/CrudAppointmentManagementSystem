import { useState } from "react";

const AddAppointment = ({ onSendAppointment, LastId }) => {
  const clearData = {
    ownerName: "",
    petName: "",
    aptDate: "",
    apttime: "",
    aptNotes: "",
  };
  const [toogleForm, setToogleFrom] = useState(false);
  let [formData, setFormData] = useState(clearData);

  function formDataPublish() {
    const appointmentInfo = {
      id: LastId + 1,
      ownerName: formData.ownerName,
      petName: formData.petName,
      aptDate: formData.aptDate + "" + formData.apttime,
      aptNotes: formData.aptNotes,
    };
    onSendAppointment(appointmentInfo);
    setFormData(clearData);
    setToogleFrom(!toogleForm);
  }

  return (
    <div className="mt-6 rounded-md  ml-[250px] mr-[250px] border-2 pb-3  ">
      <button
        onClick={() => {
          setToogleFrom(!toogleForm);
        }}
        className={`flex justify-start bg-blue-400 w-full ${
          toogleForm ? "rounded-t-md" : "rounded-md"
        }`}
      >
        Add Appointment
      </button>
      {toogleForm && (
        <div className="mt-5 text-start ml-7 w-[50%]">
          <div className="flex gap-[65px]">
            <label>Owner Name</label>
            <input
              onChange={(event) => {
                setFormData({ ...formData, ownerName: event.target.value });
              }}
              value={formData.ownerName}
              className="border-2 outline-none  rounded-xl"
            />
          </div>
          <div className=" mt-3 flex gap-[90px]">
            <label>Pet Name</label>
            <input
              onChange={(event) => {
                setFormData({ ...formData, petName: event.target.value });
              }}
              value={formData.petName}
              className="border-2 outline-none rounded-xl"
            />
          </div>
          <div className="flex gap-[95px] mt-3">
            <label>Apt Date</label>
            <input
              onChange={(event) => {
                setFormData({ ...formData, aptDate: event.target.value });
              }}
              value={formData.aptDate}
              type="date"
              className="border-2 outline-none rounded-xl pr-[45px]"
            />
          </div>
          <div className="flex gap-[95px] mt-3">
            <label>Apt Time</label>
            <input
              onChange={(event) => {
                setFormData({ ...formData, apttime: event.target.value });
              }}
              value={formData.apttime}
              type="time"
              className="border-2 outline-none rounded-xl pr-[75px]"
            />
          </div>
          <div className="flex gap-5 mt-3">
            <label>Appointment Notes</label>
            <input
              onChange={(event) => {
                setFormData({ ...formData, aptNotes: event.target.value });
              }}
              value={formData.aptNotes}
              className="border-2 outline-none rounded-xl"
            />
          </div>
          <div className="text-end mt-10">
            <button
              onClick={formDataPublish}
              className="border-2 outline-none  px-2 text-end bg-blue-300 rounded-xl hover:bg-orange-600"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default AddAppointment;
