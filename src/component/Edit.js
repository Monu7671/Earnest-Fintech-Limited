import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { updateData } from './context/ContextProvider';

function Edit() {
  // const [getUserData, setUserData] = useState([]);
  // console.log(getUserData);

  const {update, setUpdate} = useContext(updateData);

  const navigate = useNavigate();
 
    const [inpVal, setInpVal] = useState({
        name:"",
        age:"",
        email:"",
        mobile:"",
        work:"",
        address:"",
        description:""
    })

   const setData = (e) => {
    // console.log(e.target.value);
    const{name,value} = e.target;
    setInpVal((preVal)=>{
       return{
        ...preVal,[name] : value
       }
    })
   }

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
      setInpVal(data);
     }
   };
 
   useEffect(()=>{
     getuser();
   },[]);

   const updateuser =async(e)=>{
    e.preventDefault();
    const {name,age,email,mobile,work,address,description} = inpVal;
    const response = await fetch(`https://crud-app-react-js.herokuapp.com/updateuser/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        name,age,email,mobile,work,address,description
      })
    });

    const data2 = await response.json();
    // console.log(data2);

    if(response.status === 422 || !data2){
     alert("fill the data");
    }else{
      setUpdate(data2);
      navigate("/");
    }
   }

  return (
    <div className="container">
    <NavLink to="/">Home</NavLink>
    <form className="mt-4">
      <div className="row">
      <div class="mb-3 col-lg-6 col-md-6 col-12">
        <label for="exampleInputEmail1"  class="form-label">
          Name
        </label>
        <input
          type="text"
          class="form-control"
          name="name"
          value={inpVal.name}
          onChange={setData}
          id="exampleInputEmail1"
          aria-describedby="emailHelp"

        />
      </div>
      <div class="mb-3 col-lg-6 col-md-6 col-12">
        <label for="exampleInputPassword1" class="form-label">
          Age
        </label>
        <input
          type="text"
          class="form-control"
          name="age"
          value={inpVal.age}
          onChange={setData}
          id="exampleInputPassword1"
        />
      </div>
      <div class="mb-3 col-lg-6 col-md-6 col-12">
        <label for="exampleInputPassword1" class="form-label">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={inpVal.email}
          onChange={setData}
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div class="mb-3 col-lg-6 col-md-6 col-12">
        <label for="exampleInputPassword1" class="form-label">
          Mobile
        </label>
        <input
          type="number"
          name="mobile"
          value={inpVal.mobile}
          onChange={setData}
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div class="mb-3 col-lg-6 col-md-6 col-12">
        <label for="exampleInputPassword1" class="form-label">
          Work
        </label>
        <input
          type="text"
          name="work"
          value={inpVal.work}
          onChange={setData}
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div class="mb-3 col-lg-6 col-md-6 col-12">
        <label for="exampleInputPassword1" class="form-label">
          Address
        </label>
        <input
          type="text"
          name="address"
          value={inpVal.address}
          onChange={setData}
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div class="mb-3 col-lg-12 col-md-12 col-12">
        <label for="exampleInputPassword1" class="form-label">
          Description
        </label>
        <textarea name="description"
         value={inpVal.description} 
         onChange={setData} 
         className="form-control" 
         id="description" 
         cols="30" 
         rows="5"></textarea>
      </div>
      <button type="submit" class="btn btn-primary" onClick={updateuser}>
        Submit
      </button>
      </div>
    </form>
  </div>
  )
}

export default Edit