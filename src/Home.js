// fetch data
import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  
  const [perahu, setPerahu] = useState([]);
  const [nameValue, setNameValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [capacityValue, setCapacityValue] = useState("");
  const [colorValue, setColorValue] = useState("");
  
  useEffect(()=>{
    axios.get("https://oprec-betis-be.up.railway.app/perahu", {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZGI1Zjg4NC00OThlLTQ0YzMtOWE5Yy0wNTYyNDE1NjhhMjkiLCJpZCI6ImNkYjVmODg0LTQ5OGUtNDRjMy05YTljLTA1NjI0MTU2OGEyOSIsInVzZXJuYW1lIjoibmFjaG9zdGhlY29yZ2kiLCJpYXQiOjE3MDMzNDc4NjAsImV4cCI6MTcwNTkzOTg2MH0.jo9ufW7XP_pRoXgmiUeTvKb_h8nluDo_wZJ8PyCLMSY"
      },
    }).then((response)=>{
      setPerahu(response.data.daftarPerahu);
    });

  }, []);
  const onSubmit = () => {
    const newObject = {
      name: nameValue,
      description: descriptionValue,
      capacity: Number(capacityValue),
      color: colorValue,
    };

    axios.post("https://oprec-betis-be.up.railway.app/perahu", newObject, {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZGI1Zjg4NC00OThlLTQ0YzMtOWE5Yy0wNTYyNDE1NjhhMjkiLCJpZCI6ImNkYjVmODg0LTQ5OGUtNDRjMy05YTljLTA1NjI0MTU2OGEyOSIsInVzZXJuYW1lIjoibmFjaG9zdGhlY29yZ2kiLCJpYXQiOjE3MDMzNDc4NjAsImV4cCI6MTcwNTkzOTg2MH0.jo9ufW7XP_pRoXgmiUeTvKb_h8nluDo_wZJ8PyCLMSY"
      },
    }).then((response)=>{
      setPerahu([...perahu, response.data.perahu]);
    });
  };
  
  const onDelete = (id) => {
    axios.delete(`https://oprec-betis-be.up.railway.app/perahu/${id}`, {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZGI1Zjg4NC00OThlLTQ0YzMtOWE5Yy0wNTYyNDE1NjhhMjkiLCJpZCI6ImNkYjVmODg0LTQ5OGUtNDRjMy05YTljLTA1NjI0MTU2OGEyOSIsInVzZXJuYW1lIjoibmFjaG9zdGhlY29yZ2kiLCJpYXQiOjE3MDMzNDc4NjAsImV4cCI6MTcwNTkzOTg2MH0.jo9ufW7XP_pRoXgmiUeTvKb_h8nluDo_wZJ8PyCLMSY"
      },
    }).then(()=>{
      const updatedPerahu = perahu.filter(element => element.id !== id);
      setPerahu(updatedPerahu);
    })
  };


  return (
    <div className="input">
      <h1>PERAHU NYONYA BETI</h1>
      <label>Nama Perahu:</label>
      <input
        type="text"
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
      />
      <br />
      <label>Deskripsi:</label>
      <input
        type="text"
        value={descriptionValue}
        onChange={(e) => setDescriptionValue(e.target.value)}
      />

      <br />
      <label>Kapasitas:</label>
      <input
        type="text"
        value={capacityValue}
        onChange={(e) => setCapacityValue(e.target.value)}
      />

      <br />
      <label>Warna:</label>
      <input
        type="text"
        value={colorValue}
        onChange={(e) => setColorValue(e.target.value)}
      />
      <button
        onClick = {()=>{
          onSubmit()
        }}
      >
        Tambahkan Perahu
      </button>
        <table>
          <tr>
            <th>Nama Perahu</th>
            <th>Deskripsi</th>
            <th>Kapasitas</th>
            <th>Warna</th>
            <th>Aksi</th>
          </tr>
          {perahu.map((element)=>{
            return (
              <tr>
                <td style={{maxWidth: "20rem"}}>{element.name}</td>
                <td>{element.description}</td>
                <td>{element.capacity}</td>
                <td>{element.color}</td>
                <td style={{maxWidth:"7rem"}}>
                  <div style={{display: "flex", justifyContent: "center"}}>
                  <div style={{display:"flex"}}>
                  <button className='edit-button'>
                    <a href={`/edit/${element.id}`}>Edit</a>
                  </button>
                  <button className='delete-button' 
                   onClick = {()=>{
                    onDelete(element.id)
                  }}
                  >
                    Delete
                  </button>
                    </div>
                    </div>
                
                 
                </td>
              </tr>
            );
          })}
        </table>
    </div>
  );
}


export default Home;
