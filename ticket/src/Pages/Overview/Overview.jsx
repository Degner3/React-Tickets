import style from "./Overview.module.scss"
import { useContext, useEffect, useState } from "react";
import { Footer } from "../../Components/Footer/Footer";
import { Title } from "../../Components/Title/Title";
import { useFetch } from "../../Helpers/useFetch";
import { UserContext } from "../../Context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { SecendTitle } from "../../Components/SecendTitle/SecendTitle";





export const Overview = () => {

  const [eventData, setEventData] = useState([]);

  const {user} = useContext(UserContext)

  console.log(user);
  const navigate = useNavigate();

  const fecthAllEventData = () => {
    let url = "http://localhost:8081/getAll"
    let options = {
      headers: {Authorization: `Bearer ${user.accessToken}`},
    };

    fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      setEventData(data);
      console.log("Data", data);
    })
    .catch((error) => console.error("Error data", error));
  }

  useEffect(() => {
    if (user) {
      fecthAllEventData();
    } else {
      navigate("/login");
    }
  }, [user, navigate])


  return (
    <section className={style.container}>
      <Title title="Din Oversigt" />
      {user ? <SecendTitle secendtitle=""/> : <SecendTitle secendtitle="Du skal være logget ind for se din oversigt"/>}
      <div className={style.cardwrapper}>
        {eventData?.map((item, index) => {
          return (
            <div className={style.card} key={index}>
              <img src={item.image} alt={item.name} />
              <article>
                <SecendTitle user={item.title} />
                <p>{item.location} d. {item.date}</p>
                <NavLink>Læs mere</NavLink>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
};