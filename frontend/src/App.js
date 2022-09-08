import React, {useState, useEffect}  from "react";
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CustomCard from './CustomCard';
import CustomForm from './CustomForm';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button} from 'react-bootstrap';


export default function App() {

    const [columns, setColumns] = useState({});
    const [lastElement, setLastElement] = useState(0);
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState([]);
    
    const handleClose = (e) => {
        setShow(false);
    }
    
    const handleShow = () => setShow(true);

    

    

    useEffect(() => {
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
    }, []);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/users`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                `This is an HTTP error: The status is ${response.status}`
              );
            }
            return response.json();
          })
          .then((actualData) => {
            //console.log(actualData);
            setUsers(actualData);
          })
      }, []);

    const OnDragEnd= (result, columns, setColumns) => {
        const {source, destination} = result;
        const sourceColumn =columns[source.droppableId];
        const sourceItems = [...sourceColumn.user_tasks];
        const [removed] = sourceItems.splice(source.index, 1);
        const destColumn =columns[destination.droppableId];
        let finalize_at;
        if(destination.droppableId== lastElement){
            finalize_at=new Date(Date.now()).toISOString();
        }else{
            finalize_at= null;
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: removed.id, status: destColumn.id, finished_at:  finalize_at  })
        };
        fetch(`http://127.0.0.1:8000/user_task/`+removed.id+"/", requestOptions)
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
        

        if(!result.destination) return; 
  
        if(source.droppableId !== destination.droppableId){
            const sourceColumn =columns[source.droppableId];
            const destColumn =columns[destination.droppableId];
            const sourceItems = [...sourceColumn.user_tasks];
            const destItems = [...destColumn.user_tasks];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    user_tasks: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    user_tasks: destItems
                }
            })
        }else{
            const column = columns[source.droppableId];
            const copiedItems= [...Object.values(column.user_tasks)]
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index,0,removed);
            setColumns({
                ...columns, 
                [source.droppableId]: {
                    ...column,
                    user_tasks: copiedItems
                }
            });
        }
        
        
      
    };

    
        
    return (
        <div>
        <div style= {{display: 'flex', justifyContent: 'center', height: '100%'}}>
            <DragDropContext onDragEnd={result=> OnDragEnd(result,columns,setColumns)}>
                {Object.entries(columns).map(([id, column])=>{
                    return(
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} key={id}>
                            <h2>{column.name}</h2>
                        <div style={{margin: 8}}> 
                        <Droppable droppableId={id} >
                            {(provided, snapshot)=> {
                                return (
                                    <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style= {{
                                        background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                                        padding: 4,
                                        width: 460,
                                        minHeight: 500
                                    }}
                                    >
                                 
                                    {column.user_tasks.map((user_task, index) =>{
                                          //console.log('user_task', user_task);
                                        return(
                                            <Draggable key={user_task.id.toString()} draggableId={user_task.id.toString()} index={index}>
                                                {(provided, snapshot)=>{
                                                  
                                                    return (
                                                        <CustomCard
                                                        provided= {provided}
                                                        id= {user_task.id}
                                                        title = {user_task.task.title }
                                                        user= {user_task.user.name}
                                                        description = {user_task.task.description}
                                                        initial_date ={moment(user_task.task.initial_date).format('MMMM Do YYYY, h:mm:ss a')}
                                                        final_date={moment(user_task.task.final_date).format('MMMM Do YYYY, h:mm:ss a')}
                                                        tiempo_en_completar = {moment(user_task.finished_at).diff(moment(user_task.created_at), 'seconds')}
                                                        setColumns= {setColumns}
                                                        setLastElement= {setLastElement}>
                                                        </CustomCard>
                                                       
                                                    );
                                                }}
                                            </Draggable>
                                        );
                                    })}
                                      
                                      {provided.placeholder}
                                    </div>
                                );
                            }}
                        </Droppable>
                        </div>
                        </div>
                    );
                })}
            </DragDropContext>
            
        </div> 
        <div style= {{display: 'flex', justifyContent: 'center', height: '100%'}}>
        <Button variant="primary" onClick={handleShow}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    
        </div>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        <CustomForm users={users} setColumns={setColumns} setLastElement={setLastElement} />
        </Modal.Body>
      </Modal>
       
        </div>
);
       
         
}
   