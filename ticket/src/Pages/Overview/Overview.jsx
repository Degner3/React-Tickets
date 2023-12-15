import style from "./Overview.module.scss"
import { useContext, useEffect, useState } from "react";
import { Title } from "../../Components/Title/Title";
import { UserContext } from "../../Context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { SecendTitle } from "../../Components/SecendTitle/SecendTitle";
import { Modal } from "../../Components/Modal/Modal";


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
                <SecendTitle secendtitle={item.title} />
                <p>
                  {item.location} D. {item.date}
                </p>
                {/* <NavLink className={style.readmore}>Læs mere</NavLink> */}
                <Modal>
                  <figure>
                    <img src={item.image} alt="" />
                    <article>
                      <h2>Title: {item.title}</h2>
                      <p>Sted: {item.location}</p>
                      <p>Dato: {item.date} : Tid</p>
                      <p>Tid</p>
                      <p>Beskrivelse: {item.description}</p>
                    </article>
                  </figure>
                </Modal>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
};
