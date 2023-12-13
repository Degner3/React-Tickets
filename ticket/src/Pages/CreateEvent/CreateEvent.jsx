import style from "./CreateEvent.module.scss"
import { Title } from "../../Components/Title/Title";
import { InputField } from "../../Components/InputField/InputField";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext"





export const CreateEvent = () => {

  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    image: "",
    time: "",
    description: "",
  });

  const {user, saveUserData} = useContext(UserContext)

  console.log(user);
  // console.log(saveUserData);

  const handleInputChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setFormData({
      ...formData,
      [inputName]: inputValue,
    });
  };

  console.log(handleInputChange);

  const handleRegistration = (event) => {
    event.preventDefault();
    const { title, date, location, image, time, description } = formData;

    if (!title || !date || !location || !time ) {
      setErrorMsg("Du skal udfylde alle påkrævede felter.");
    } else {
      setErrorMsg("");
      const url = `http://localhost:8081/create`;
      const body = new URLSearchParams();
      body.append("title", title);
      body.append("date", date);
      body.append("location", location);
      body.append("image", image);
      body.append("time", time);
      body.append("description", description);

      let options = {
        body: body,
        headers: { Authorization: `Bearer ${user.accessToken}` },
        method: "POST",
      };

      fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        console.log("Data from oprettelse:", data);
        saveUserData(data);
      });
    }
  };

    


    return (
      <section className={style.container}>
        <div className={style.formwrapper}>
          <Title title="Opret ny" />
          <form onSubmit={handleRegistration}>
            <InputField
              type="text"
              name="title"
              placeholder="Skriv en titel"
              label="Titel:"
              value={formData.title}
              onChange={handleInputChange}
            />
            <InputField
              type="date"
              name="date"
              placeholder="Skriv en dato"
              label="Dato:"
              value={formData.date}
              onChange={handleInputChange}
            />
            <InputField
              type="text"
              name="location"
              placeholder="Skriv et sted"
              label="Sted:"
              value={formData.location}
              onChange={handleInputChange}
            />
            <InputField
              type="text"
              name="billede"
              placeholder="image"
              label="Billede - URL:"
              value={formData.image}
              onChange={handleInputChange}
            />
            <InputField
              type="time"
              name="time"
              placeholder="Skriv et tidspunkt"
              label="Tidspunkt:"
              value={formData.time}
              onChange={handleInputChange}
            />
            <label className={style.label} htmlFor="">
              <p>Beskrivelse:</p>
              <textarea
                type="text"
                name="description"
                placeholder="Skriv en beskrivelse"
                value={formData.description}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">Opret</button>
          </form>
          {errorMsg && <p>{errorMsg}</p>}
        </div>
      </section>
    );
}