import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

function Edit() {
    const {id} = useParams()
    const [perahu, setPerahu] = useState(null);
    const [isOnEdit, setIsOnEdit] = useState(false)
    const [nameValue, setNameValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [capacityValue, setCapacityValue] = useState("");
    const [colorValue, setColorValue] = useState("");

    const getPerahu = ()=>{
        axios.get(`https://oprec-betis-be.up.railway.app/perahu/${id}`, {
            headers: {
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZGI1Zjg4NC00OThlLTQ0YzMtOWE5Yy0wNTYyNDE1NjhhMjkiLCJpZCI6ImNkYjVmODg0LTQ5OGUtNDRjMy05YTljLTA1NjI0MTU2OGEyOSIsInVzZXJuYW1lIjoibmFjaG9zdGhlY29yZ2kiLCJpYXQiOjE3MDMzNDc4NjAsImV4cCI6MTcwNTkzOTg2MH0.jo9ufW7XP_pRoXgmiUeTvKb_h8nluDo_wZJ8PyCLMSY"
            },
          }).then((response)=>{
            setPerahu(response.data.perahu);
          });
    }

    useEffect(()=>{
       getPerahu()
    }, []);

    const onSubmit = () => {
        const newObject = {
          name: nameValue,
          description: descriptionValue,
          capacity: Number(capacityValue),
          color: colorValue,
        };
    
        axios.patch(`https://oprec-betis-be.up.railway.app/perahu/${id}`, newObject, {
          headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZGI1Zjg4NC00OThlLTQ0YzMtOWE5Yy0wNTYyNDE1NjhhMjkiLCJpZCI6ImNkYjVmODg0LTQ5OGUtNDRjMy05YTljLTA1NjI0MTU2OGEyOSIsInVzZXJuYW1lIjoibmFjaG9zdGhlY29yZ2kiLCJpYXQiOjE3MDMzNDc4NjAsImV4cCI6MTcwNTkzOTg2MH0.jo9ufW7XP_pRoXgmiUeTvKb_h8nluDo_wZJ8PyCLMSY"
          },
        }).then((response)=>{
            getPerahu()
        });
      };

    useEffect(()=>{
        if(!isOnEdit && perahu != null){
            onSubmit()
        }

    }, [isOnEdit])

    return (
        <div>
            <h1>Edit Perahu</h1>
            <label>Nama Perahu</label>
            {!isOnEdit ? <p>{perahu?.name}</p> : <input onChange={(e) => setNameValue(e.target.value)}/>}
            <br />
            <label>Deskripsi</label>
            {!isOnEdit ? <p>{perahu?.description}</p> : <input  onChange={(e) => setDescriptionValue(e.target.value)} />}
          
            <br />
            <label>Kapasitas</label>
            {!isOnEdit ? <p>{perahu?.capacity}</p> : <input onChange={(e) => setCapacityValue(e.target.value)}/>}
          
            <br />
            <label>Warna</label>
            {!isOnEdit ? <p>{perahu?.color}</p> : <input  onChange={(e) => setColorValue(e.target.value)}/>}
           
           <button onClick={()=>{
            setIsOnEdit(!isOnEdit)
           }}>

           {!isOnEdit ? 'Edit': "Save"}
           </button>

        
        </div>
    );
  }
  
  
  export default Edit;