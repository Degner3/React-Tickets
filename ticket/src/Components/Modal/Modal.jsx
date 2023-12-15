import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import style from "./Modal.module.scss"
import { IoCloseCircleOutline } from "react-icons/io5";







export const Modal = ({children, }) => {

    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState([]);

    const {user} = useContext(UserContext); 
    

    console.log(user);
    console.log("Data", data);

    const fetchData = () => {
        let url = "http://localhost:8081/getAll";
        let options = {
            headers: { Authorization: `Bearer ${user.accessToken}` },
        };

        fetch(url, options)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => console.error("Error fetching data", error));
    };


    useEffect(() => {
        if (showModal) {
            fetchData();
        }
    }, [showModal]);


    
    const openModal = () => {
        setShowModal(true)
    };

    
    const  closeModal = () => {
        setShowModal(false)
    }

    if (!showModal) {
        return (
            <button className={style.toggle} onClick={openModal}>Læs mere</button>
        )
    }



    return (
      <div className={style.modalcontainer}>
        <section className={style.modal}>
            {children}
            <button className={style.toggle} onClick={closeModal}><IoCloseCircleOutline className={style.close} />Close</button>
        </section>
      </div>
    );
  


};