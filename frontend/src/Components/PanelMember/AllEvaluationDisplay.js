import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';

export default function AllEvaluationDisplay(){

    const [evaluList, setevaluList] = useState([]);

    
    useEffect(() => {
        const getEvaluationList = async() => {
            try {
                const res = await axios.get('http://localhost:5000/evaluation/getAllevaluation')
                setevaluList(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getEvaluationList()
    },[]);


    function removeItem(id){
        console.log(id)
        axios.delete(`http://localhost:5000/evaluation/delete/${id}`)
        .then(res=>{
          console.log(res.data)
          const deleteMarks = evaluList.filter(mark=>mark._id !==id)
          setevaluList(deleteMarks)
        }).catch(err=>console.error(err))
    }


    return(
        <div>
            <div className='groupTable'>
            <div className="container ">
                
                <table className="table ">
                    <thead>
                        <tr  key={"1"}>
                            <th> Group ID</th>
                            <th> Subject </th>
                            <th> Assignment</th>

                            <div className="col-lg-9 mt-2 mb-2">
                            </div>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        evaluList.map((list, id) => (
                            <tr key={id}>
                                <td>{list.group_id}</td>
                                <td>{list.details.subject}</td>
                                <td>{list.details.assignment}</td>

                                <td>
                                    <Link to={`/viewmarks/${list._id}`}><Button className='btn1'>View Details</Button></Link>
                                        
                                    <Button onClick={()=>{removeItem(list._id)}}>Delete</Button>
                                </td>
                            
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
}