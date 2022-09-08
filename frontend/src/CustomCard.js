import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const CustomCard = ({ id, title, provided, description, user, initial_date, final_date, tiempo_en_completar, setColumns, setLastElement }) => {
    
      const deleteTask = function(id) {
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        };
        fetch(`http://127.0.0.1:8000/user_task/`+id+"/", requestOptions)
        .then(actualData => {
          console.log("ssiiii");
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
      } 
        
      return (
      <Card style={{ width: '450px' }}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      >
        <Card.Body>
          <Card.Title>
            <Row>
              <Col xs={9}>
              {title}
              </Col>
              <Col>
              {user}
              </Col>
            </Row>
          </Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
          <div>{"Iniciar : "+initial_date}</div>
          <div>{"Finalizar : "+final_date}</div>
          <div>{"Tiempo en completar : "+tiempo_en_completar+" segundos"}</div>
          <div  style= {{display: 'flex', justifyContent: 'flex-end'}}>
          <Button variant="danger" onClick={() => deleteTask(id)} k>
          <FontAwesomeIcon icon={faTrash} />
           </Button>
          </div>
          
        </Card.Body>
      </Card>
    );
  }
  
  export default CustomCard;