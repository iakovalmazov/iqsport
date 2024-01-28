import React, {useState, useEffect} from 'react'
import {Container, Button, Accordion, ListGroup} from 'react-bootstrap'
import MyModal from '../components/MyModal'
import {getAllQuestions, removeQuestion} from '../http/questionApi'

const Admin = () => {
  const [questions, setQuestions] = useState([])
  const [show, setShow] = useState(false)
  const [toEdit, setToEdit] = useState(null)

  useEffect(() => {
    getAllQuestions().then(data => setQuestions(data))
  }, [questions])

  function removeThisQuestion(id) {
    removeQuestion(id).then(data => setQuestions(data))
  }

  function editQuestion(id) {
    setShow(true)
    const questionToEdit = questions.find(q => q.id === id)
    setToEdit(questionToEdit)
  }

  return (
    <Container className='d-flex flex-column'>
      <Button variant='success' onClick={() => setShow(true)}>добавить новый вопрос</Button>
      <MyModal questions={questions} setQuestions={setQuestions} show={show} setShow={setShow} toEdit={toEdit} setToEdit={setToEdit}/>
      <Accordion className='mt-3'>
      {questions.map((question, index) => 
        <Accordion.Item key={question.id} eventKey={questions.indexOf(question)}>
          <Accordion.Header>{index + 1 + '. ' + question.title}</Accordion.Header>
          <Accordion.Body className='d-flex justify-content-between'>
            <ListGroup horizontal>
              {question.answers.map(answer => 
                <ListGroup.Item key={answer} variant={question.correct === String(answer) ? 'success' : ''}>{answer}</ListGroup.Item>
              )}
            </ListGroup>
            <div>
              <Button className='me-2' variant='success' onClick={() => editQuestion(question.id)}>редактировать</Button>
              <Button className='me-2' variant='danger' onClick={() => removeThisQuestion(question.id)}>удалить</Button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      )}
      </Accordion>
    </Container>
  );
};

export default Admin;