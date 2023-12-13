import style from "./Login.module.scss"
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from "react"
import { InputField } from "../../Components/InputField/InputField"
import { Title } from "../../Components/Title/Title"



export const SignUpPage = () => {

    const [error, setError] = useState("");
    const navigate = useNavigate()

    const handleSubmit = (event) => {
      event.preventDefault();

      let name = event.target.name.value;
      let email = event.target.email.value;
      let password = event.target.password.value;
      let phone = event.target.phone.value;

      if (name && email && password && phone) {
        let url = `http://localhost:8081/sign-up`;

        let body = new URLSearchParams();
        body.append("name", name);
        body.append("email", email);
        body.append("password", password);
        body.append("phone", phone);

        const options = {
          body: body,
          // headers: { "Content-Type": "application/json", },
          method: "POST"
        };

        fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          navigate.push('/login')
        })
      } else {
        setError("Udfyld venligst alle felter");
      }
    };
    



    return (
      <section className={style.container}>
        <div className={style.formwrapper}>
          <div className={style.formcontainer}>
            <Title title="Tilmeld" />
            <form onSubmit={(event) => handleSubmit(event)}>
              <InputField
                type="text"
                name="name"
                placeholder="Skriv dit fuldenavn"
                label="Fuldenavn:"
              />
              <InputField
                type="email"
                name="email"
                placeholder="Skriv din email"
                label="Email:"
              />
              <InputField
                type="password"
                name="password"
                placeholder="Skriv dit password"
                label="Password:"
              />
              <InputField
                type="tel"
                name="phone"
                placeholder="Skriv dit Mobilnummer"
                label="Mobil:"
              />
              <b>{error}</b>
              <div className={style.btncontainer}>
                <NavLink className={style.login} to="/login">
                  Log ind
                </NavLink>

                <input className={style.tilmeld} type="submit" value="Tilmeld" />
              </div>
            </form>
          </div>
        </div>
      </section>
    );

}