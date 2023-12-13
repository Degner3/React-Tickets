import style from "./Login.module.scss"
import { NavLink } from 'react-router-dom'
import { Title } from "../../Components/Title/Title"
import { InputField } from "../../Components/InputField/InputField"
import { useContext, useState } from "react"
import { UserContext } from "../../Context/UserContext"
import { SecendTitle } from "../../Components/SecendTitle/SecendTitle"




export const LoginPage = () => {

    const [errorMsg, setErrorMsg] = useState("");
    const {setIsLoggedIn, user, setUser, isLoggedIn, saveUserData} = useContext(UserContext)

    console.log(user);

    const handleLogout = () => {
      localStorage.clear("user");
      setIsLoggedIn(false);
      setUser()
    };


    const handleLogin = (event) => {
      event.preventDefault();
      let email = event.target.email.value;
      let password = event.target.password.value;
  
      if (!password) {
        setErrorMsg("Du skal udfylde password");
      }
      if (!email) {
        setErrorMsg("Du skal udfylde email");
      }
      if (!email && !password) {
        setErrorMsg("Du skal udfylde begge felter");
      }
      if (email && password) {
        setErrorMsg("");
        let url = `http://localhost:8081/sign-in`;
        let body = new URLSearchParams();
        body.append("email", email);
        body.append("password", password);

        let options = { 
          body: body, 
          method: "POST" 
        };

        fetch(url, options)
          .then((res) => res.json())
          .then((data) => saveUserData(data));
      }
    };


   

    return (
      <section className={style.container}>
        <div className={style.formwrapper}>
          {!isLoggedIn ? (
            <div className={style.formcontainer}>
              <Title title="Log ind" />
              <form
                onSubmit={(event) => {
                  handleLogin(event);
                }}
              >
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
                <b>{errorMsg}</b>
                <div className={style.btncontainer}>
                  <NavLink className={style.tilmeld} to="/signup">
                    Tilmeld
                  </NavLink>

                  <input
                    className={style.login}
                    type="submit"
                    value="Log ind"
                  />
                </div>
              </form>
            </div>
          ) : (
            <div className={style.profilecontainer}>
              <Title title="Velkommen " user={user.name} />
              <article>
                <SecendTitle secendtitle="Dine informationer" />
                <p>Navn: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Tlf: {user.phone}</p>
              </article>
              <div className={style.btncontainer}>
                <NavLink className={style.events} to="/bookings">
                  Dine events
                </NavLink>

                <button className={style.logout} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    );

}