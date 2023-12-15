import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState, useCallback } from "react";
import { UserContext } from "../../Context/UserContext";
import style from "./CreateEvent.module.scss"
import { InputField } from "../../Components/InputField/InputField";
import { Title } from "../../Components/Title/Title";

export const EditPage = () => {

  const { id } = useParams();
  const [eventData, setEventData] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    time: "",
    description: "",
    date: "",
    image: "",
  });

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchEventData = useCallback(() => {
    if (user && user.accessToken) {
      let url = `http://localhost:8081/getOne/${id}`;
      let options = {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      };
      fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
          setEventData(data); // Store the fetched data in state
          setFormData(data); // Populate the form data with the fetched data
          /* console.log("get one event:", data); */
        })
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      navigate("/login");
    }
  }, [id, user, navigate]);

  const updateEvent = useCallback(
    (event) => {
      event.preventDefault();
      if (user && user.accessToken) {
        let url = `http://localhost:8081/update/${id}`;
        let options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify(formData),
        };
        fetch(url, options)
          .then((res) => res.json())
          .then((updatedData) => {
            console.log("Event updated:", updatedData);
            navigate("/bookings");
          })
          .catch((error) => console.error("Error updating event:", error));
      } else {
        navigate("/login");
      }
    },
    [formData, id, navigate, user]
  );

  const handleInputChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    });
  };

  useEffect(() => {
    if (user) {
      fetchEventData();
    } else {
      navigate("/login");
    }
  }, [user, fetchEventData, navigate]);

  return (
    <section className={style.container}>
    <div className={style.formwrapper}>
      <Title title="Opret ny" />
      <form onSubmit={updateEvent}>
        <InputField
          type="text"
          name="title"
          placeholder="Skriv en titel"
          label="Titel:"
          onChange={handleInputChange}
        />
        <InputField
          type="date"
          name="date"
          placeholder="Skriv en dato"
          label="Dato:"
          onChange={handleInputChange}
        />
        <InputField
          type="text"
          name="location"
          placeholder="Skriv et sted"
          label="Sted:"
          onChange={handleInputChange}
        />
        <InputField
          type="text"
          name="image"
          placeholder="image"
          label="Billede - URL:"
          onChange={handleInputChange}
        />
        <InputField
          type="time"
          name="time"
          placeholder="Skriv et tidspunkt"
          label="Tidspunkt:"
          onChange={handleInputChange}
        />
        {/* <InputField
          type="text"
          name="description"
          placeholder="Skriv et description"
          label="description:"
          onChange={handleInputChange}
        /> */}
        <label className={style.label} htmlFor="">
          <p>Beskrivelse:</p>
          <textarea
            type="text"
            name="description"
            placeholder="Skriv en beskrivelse"
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Opret</button>
      </form>
    </div>
  </section>
  );
};