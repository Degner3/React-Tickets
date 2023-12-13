import style from "./Bookings.module.scss"
import { Title } from "../../Components/Title/Title"
import { UserContext } from "../../Context/UserContext"
import { useState, useContext, useEffect, } from "react"
import { NavLink, useNavigate } from "react-router-dom"





export const Bookings = () => {

    const [eventData, setEventData] = useState([]);

    const {user} = useContext(UserContext)

    console.log(user);
    const navigate = useNavigate();

    const fetchAllEventData = () => {
        let url = "http://localhost:8081/getAll";
        let options = {
            headers: { Authorization: `Bearer ${user.accessToken}` },
        };

        fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
            setEventData(data);
            console.log("Data", data);
        })
        .catch((error) => console.error("Error data", error));
    };
    


    useEffect(() => {
        if (user) {
            fetchAllEventData();
        } else {
            navigate("/login");
        }
    }, [user, navigate]);


    const handleDelete = (_id) => {
        let url = `http://localhost:8081/delete/${_id}`;
        let options = {
            headers: { Authorization: `Bearer ${user.accessToken}` },
            method: "DELETE",
        };

        fetch(url, options)
        .then((res) => res.json())
        .then((data) => 
            data.message ? fetchAllEventData() : alert("Der skete en fejl")
        )
        .catch((error) => console.error("Error deleting data", error));
    };

    // const handleAllDelete = () => {
    //     let url ``;
    //     let options = {}
    // }

   
    


    return (
      <section className={style.container}>
        <div className={style.bookings}>
          <Title title="Mine Bookings" />
          {Array.isArray(eventData) &&
            eventData.map((item, index) => (
              <article key={index}>
                <p>{item.title}</p>
                <p>Sted: {item.location}</p>
                <p>
                  Tid: {item.time} - {item.date}
                </p>
                <div>
                  <button
                    className={style.remove}
                    onClick={() => handleDelete(item.id)}
                  >
                    Fjern
                  </button>
                  <button className={style.edit}>Rediger</button>
                </div>
              </article>
            ))}

            <button>Fjern alle</button>
            <NavLink to="/create">Opret ny</NavLink>
        </div>
      </section>
    );
}