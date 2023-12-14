import style from "./CreateEvent.module.scss"
import { Title } from "../../Components/Title/Title";
import { InputField } from "../../Components/InputField/InputField";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext"
import { useNavigate } from "react-router-dom";





export const CreateEvent = () => {

  const [errorMsg, setErrorMsg] = useState("");
  const [createData, setCreateData] = useState({
    title: "",
    date: "",
    location: "",
    image: "",
    time: "",
    description: "",
  });

  console.log(createData);

  const {user} = useContext(UserContext);

  console.log(user);
  const navigate = useNavigate();

  const handleInputChange = (event) => {

    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setCreateData({
      ...createData,
      [fieldName]: fieldValue,
    });

  };


  // useEffect(() => {
  //   if (user) {
  //     handleRegistration();
  //   } else {
  //     navigate("/create");
  //   }
  // }, [user, navigate])


  const handleRegistration = (event) => {
    console.log(createData);

    event.preventDefault();
    const { title, location, time, description, date, image } = createData;

    if (!title || !location || !time || !date) {
      setErrorMsg("Du skal udfylde alle påkrævede felter.");
    } else {
      setErrorMsg("");
      const url = `http://localhost:8081/create`;
      const body = new URLSearchParams();
      body.append("title", title);
      body.append("date", date);
      body.append("location", location);
      body.append("time", time);
      body.append("image", image);
      body.append("description", description);

      let options = {
        body: body,
        headers: { Authorization: `Bearer ${user.accessToken}` },
        method: "POST",
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
          console.log("Data", data);
        });
    }
  };




 
   
    return (
      <section className={style.container}>
        <div className={style.formwrapper}>
          <Title title="Opret ny" />
          <form onSubmit={(event) => handleRegistration(event)}>
            <InputField
              type="text"
              name="title"
              placeholder="Skriv en titel"
              label="Titel:"
              value={createData.title}
              onChange={handleInputChange}
            />
            <InputField
              type="date"
              name="date"
              placeholder="Skriv en dato"
              label="Dato:"
              value={createData.date}
              onChange={handleInputChange}
            />
            <InputField
              type="text"
              name="location"
              placeholder="Skriv et sted"
              label="Sted:"
              value={createData.location}
              onChange={handleInputChange}
            />
            <InputField
              type="text"
              name="image"
              placeholder="image"
              label="Billede - URL:"
              value={createData.image}
              onChange={handleInputChange}
            />
            <InputField
              type="time"
              name="time"
              placeholder="Skriv et tidspunkt"
              label="Tidspunkt:"
              value={createData.time}
              onChange={handleInputChange}
            />
            <InputField
              type="text"
              name="description"
              placeholder="Skriv et description"
              label="description:"
              value={createData.description}
              onChange={handleInputChange}
            />
            <label className={style.label} htmlFor="">
              <p>Beskrivelse:</p>
              <textarea
                type="text"
                name="description"
                placeholder="Skriv en beskrivelse"
                value={createData.description}
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