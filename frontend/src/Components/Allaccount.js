import React, { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'

const Allaccount = () => {

  const [userRouter, setUserRouter] = useState([]);
  const [selects, setSelects] = useState();

  useEffect(() => {

    axios
      .get("/user/alldata")
      .then(res => setUserRouter(res.data))
      .catch(error => console.log(error));


  });

  const deleteUser = async (id) => {

    try {

      const res = await axios.delete(`http://localhost:5000/user/delete/${id}`)

      const newListItems = userRouter.filter(topic => topic._id !== id);

      setUserRouter(newListItems);



    } catch (err) {

      console.log(err);

    }

  }

  function SearchItem() {
    console.log(role)
    axios.get(`http://localhost:5000/user/filter/${selects}`)
      .then(res => {
        console.log(res.data)
        setUserRouter(res.data)
      }).catch(err => console.error(err))
  }

  return (

    <div className="container">
      <Link to="/admin">
        <li className="nav-item nav-link">
          Home
        </li>
      </Link>

      <div class="input-group">
        <div class="form-inline my-2 my-lg-0">
          <h5 className='grpid'>Select by User Role  </h5>
          <Button className='btn btn-primary search' onClick={() => { SearchItem({ selects }) }}>Search</Button>
          <select className='form-control select-role' name="role" id="role" value={selects} onChange={e => setSelects(e.target.value)}>
            <option>None</option>
            <option>user</option>
            <option>admin</option>
            <option>Supervisor</option>
            <option>CoSupervisor</option>
            <option>PanelMember</option>
          </select>
        </div> <br /><br /><br />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th Scope="col"> #</th>
            <th Scope="col"> Name </th>
            <th Scope="col"> User name </th>
            <th Scope="col"> Email Address </th>
            <th Scope="col"> Contact Number </th>
            <th Scope="col"> Type </th>
            <th Scope="col"> Role  </th>
            <th Scope="col"> Interest </th>

            <div className="col-lg-9 mt-2 mb-2">


            </div>

          </tr>
        </thead>

        <tbody>

          {userRouter.map((admin, index) => (

            <tr key={index}>
              <th scope="row">{index + 1}</th>

              <td>{admin.name}</td>
              <td>{admin.username}</td>
              <td>{admin.email}</td>
              <td>{admin.contact}</td>
              <td>{admin.type}</td>
              <td>{admin.role}</td>
              <td>{admin.interest}</td>
              <td><button onClick={() => deleteUser(admin._id)} type="button" class="btn btn-danger">Delete</button></td>
              <td><Link to={`UpdateUser/${admin._id}`}><Button>Update</Button></Link></td> 

            </tr>

          ))}






        </tbody>


      </table>


    </div>
  );

};

export default Allaccount;
