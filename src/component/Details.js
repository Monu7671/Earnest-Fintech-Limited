import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WorkIcon from "@mui/icons-material/Work";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink, useNavigate, useParams } from "react-router-dom";

function Details() {
  const [getUserData, setUserData] = useState([]);
  // console.log(getUserData);

  const navigate = useNavigate();

  const{id} = useParams();

  const getuser = async () => {
    const res = await fetch(`https://crud-app-react-js.herokuapp.com/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    // console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setUserData(data);
    }
  };

  useEffect(()=>{
    getuser();
  },[]);

  const deleteuser = async(id) =>{
    const res2 = await fetch(`https://crud-app-react-js.herokuapp.com/deleteuser/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const deletedata = await res2.json();
    // console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error ");
    }else{
      // console.log("user deleted");
      navigate("/")
    }
  }


  return (
    <div className="container mt-3">
      <h1>Welcome To Users</h1>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            style={{ width: 90 }}
            alt="profile"
          />
          <div className="add_btn">
            <NavLink to={`/edit/${getUserData._id}`}>
            <button className="btn btn-primary m-1">
              <CreateIcon />
            </button>
            </NavLink>
            <button className="btn btn-danger" onClick={()=>deleteuser(getUserData._id)}>
              <DeleteOutlineIcon />
            </button>
          </div>
          <div className="left_view ">
            <h3 className="mt-3">
              Name: <span>{getUserData.name}</span>
            </h3>
            <h3 className="mt-3">
              Age: <span>{getUserData.age}</span>
            </h3>
            <p>
              <MailOutlineIcon />
              Email: <span>{getUserData.email}</span>
            </p>
            <p>
              <WorkIcon />
              Occupation: <span>{getUserData.work}</span>
            </p>
            <p>
              <PhoneIphoneIcon />
              Mobile: <span>{getUserData.mobile}</span>
            </p>
            <p>
              <LocationOnIcon />
              Address: <span>{getUserData.address}</span>
            </p>
            <p>
              Description:{" "}
              <span>
              {getUserData.description}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Details;
