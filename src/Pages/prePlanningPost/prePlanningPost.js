import * as React from "react";
import "./prePlanningPost.css";
import Navbar from "../navbar/navbar";
import { useDispatch } from "react-redux";
import Toast from "../../Components/Toast/toast";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function PrePlanningPost() {
  const [location, setLocation] = React.useState("");
  const [subLocation, setSubLocation] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [user, setUser] = React.useState({});

  const navigate = useNavigate();
  React.useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    } else if (localStorage.getItem("token") != "null") {
      const decoded = jwt_decode(localStorage.getItem("token"));
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        if (decoded) {
          console.log("DECODED");
          console.log(decoded);
          setUser(decoded);
        }
      }
    } else {
      navigate("/login");
    }
  }, []);

  const dispatch = useDispatch();

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (location === "") {
      console.log(location);
      Toast("", "", "", "Please enter location !");
    } else if (subLocation === "") {
      Toast("", "", "", "Please enter subLocation !");
    } else if (description === "") {
      Toast("", "", "", "Please enter description !");
    } else {
      // dispatch(getCityChallenge(city));
    }
  };

  return (
    <div className="creatBuddy-body">
      <Navbar></Navbar>
      <div style={{ marginTop: "4%" }} className="him">
        <div style={{ width: "60%" }} className="container glass-createBuddy">
          <div className="row"></div>
          <form onSubmit={SubmitHandler}>
            <div class="form-group">
              <label for="formGroupExampleInput2">
                <b>Location</b>
              </label>
              <input
                type="text"
                class="form-control"
                id="formGroupExampleInput2"
                placeholder="Location"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput2">
                <b>Sub-Location</b>
              </label>
              <input
                type="text"
                class="form-control"
                id="formGroupExampleInput2"
                placeholder="Sub-Location"
                onChange={(e) => setSubLocation(e.target.value)}
              />
            </div>

            <div class="form-group">
              <label for="exampleFormControlTextarea1">
                {" "}
                <b>Discription </b>
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="4"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              class="btn btn-primary btn-sm btn-lg btn-block"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
