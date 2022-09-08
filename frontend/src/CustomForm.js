import React, {useState, useEffect}  from "react";
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker';
import { Button, Form } from 'react-bootstrap';
import { Controller } from "react-hook-form";

const CustomForm = ({users, setColumns, setLastElement}) => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [initial_date, setInitial_date] = useState(new Date());
    const [final_date, setFinal_date] = useState(new Date());
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        // If there is data, the form is valid
        setIsValid(selectedUsers.length > 0 ? true : false);
      }, [selectedUsers]);



    const onLoginFormSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
      //let value = Array.from(e.target.selectedOptions, option => option.value);
      console.log("formData",formDataObj);
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: formDataObj.title, description: formDataObj.description,
          initial_date: formDataObj.initial_date, final_date: formDataObj.final_date,
      author: selectedUsers})
      };
      console.log(requestOptions);
      fetch(`http://127.0.0.1:8000/tasks`, requestOptions).then(response => response.json())
      .then(actualData => {
        fetch(`http://127.0.0.1:8000/status`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          return response.json();
        })
        .then((actualData) => {
          setColumns(actualData);
          setLastElement(actualData.slice(-1)[0].order);
        })
      });

      //setTimeout(() => { handleClose(); }, 500); 
  };
    return (
        <Form onSubmit={onLoginFormSubmit} >

        
        <Form.Group className="mb-3">
        <Form.Label>Titulo</Form.Label>
        <Form.Control type="text" name="title" placeholder="Titulo" required/>
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label>Descripción</Form.Label>
        <Form.Control name="description" placeholder="Descripción" required/>
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label>Fecha de inicio</Form.Label>
        <DateTimePicker name="initial_date" onChange={setInitial_date} value={initial_date} required/>
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label>Fecha de finalización</Form.Label>
        <DateTimePicker name= "final_date" onChange={setFinal_date} value={final_date} required/>
        </Form.Group>

        

        <Form.Group className="mb-3">
          <Form.Label>Responsables</Form.Label>
          
          <Select name="users" isMulti options={users} onChange={(e) => setSelectedUsers(e)} />
          {!isValid && <p>You must choose a value</p>}
          
        </Form.Group>
        <Button disabled={!isValid} variant="primary" type="submit" >
        Send
      </Button>
        </Form>

    );
};

export default CustomForm;