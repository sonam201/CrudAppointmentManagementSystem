import React, { useEffect, useCallback, useState } from "react";
import "./App.css";
import "./input.css";
import AddAppointment from "./components/AddAppointment";
import Search from "./components/Search";
import AppointmentInfo from "./components/AppointmentInfo";

function App() {
  const [appointmentList, setAppointmentList] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [sortBy, setSortBy] = useState("petName");
  const [orderBy, setOrderBy] = useState("asc");

  const fetchData = useCallback(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        setAppointmentList(data);
        setFilteredAppointments(data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const sortedAppointments = [...appointmentList].sort((a, b) => {
      const order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    });

    const filteredAppointments = sortedAppointments.filter((item) => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      );
    });

    setFilteredAppointments(filteredAppointments);
  }, [query, appointmentList, sortBy, orderBy]);

  const onDeleteAppointment = (appointmentId) => {
    setAppointmentList((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment.id !== appointmentId)
    );
    setFilteredAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment.id !== appointmentId)
    );
  };

  return (
    <div className="text-center">
      <h1 className="text-[30px] mt-5">Your Appointments</h1>
      <AddAppointment
        onSendAppointment={(myAppointment) =>
          setAppointmentList([...appointmentList, myAppointment])
        }
        LastId={appointmentList.reduce(
          (max, item) => (Number(item.id) > max ? Number(item.id) : max),
          0
        )}
      />
      <Search
        query={query}
        onQueryChange={setQuery}
        orderBy={orderBy}
        onOrderByChange={setOrderBy}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />
      <ul className="divided-y divide-gray-200 border-2 ml-[20px] mr-[20px] mt-5 mb-5">
        {filteredAppointments.map((appointment) => (
          <AppointmentInfo
            key={appointment.id}
            appointment={appointment}
            onDeleteAppointment={onDeleteAppointment}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
