import React, {useState} from 'react'
import {Form, Row, Col, ToggleButton, Modal, Button} from 'react-bootstrap'
import {addQuestion, editQuestion} from '../http/questionApi'

const MyModal = ({show, setShow, questions, setQuestions, toEdit, setToEdit}) => {
  const [question, setQuestion] = useState({title: '', correct: '', answers: ['', '', '', '']})

  function addNewQuestion() {
    addQuestion(question.title, question.correct, question.answers).then(data => {
      setQuestions([...questions, data])
    })
    setQuestion({title: '', correct: '', answers: ['', '', '', '']})
    setShow(false)
  }

  function editThisQuestion() {
    editQuestion(toEdit.id, toEdit.title, toEdit.correct, toEdit.answers).then(data => setQuestions(data))
    setToEdit(null)
    setShow(false)
  }

  function closeModal() {
    setShow(false)
    setQuestion({title: '', correct: '', answers: ['', '', '', '']})
    setToEdit(null)
  }

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Body>
        <Form.Label>введи вопрос:</Form.Label>
        {!toEdit ?
          <Form.Control as='textarea' rows={5} className='mb-2' placeholder='текст вопроса' value={question.title} onChange={e => setQuestion({...question, title: e.target.value})}/>
          :
          <Form.Control as='textarea' rows={5} className='mb-2' placeholder='текст вопроса' value={toEdit.title} onChange={e => setToEdit({...toEdit, title: e.target.value})}/>
        }
        <>
          <Form.Label>введи ответы:</Form.Label>
          <Row>
            {!toEdit && question.answers.map((answer, ind) => 
              <Col md={6} key={ind}>
                <Form.Control 
                  className='mb-2' type='text' placeholder={`${ind + 1} вариант`} value={answer}
                  onChange={e => setQuestion({...question, answers: question.answers.map((v, i) => i === ind ? e.target.value : v)})}
                />
              </Col>
            )}
            {toEdit && toEdit.answers.map((answer, ind) => 
              <Col md={6} key={ind}>
                <Form.Control 
                  className='mb-2' type='text' placeholder={`${ind + 1} вариант`} value={answer}
                  onChange={e => setToEdit({...toEdit, answers: toEdit.answers.map((v, i) => i === ind ? e.target.value : v)})}
                />
              </Col>
            )}
          </Row>
          {!toEdit && <Form.Label>{!question.answers.includes('') ? 'выбери верный:' : 'заполни все варианты!'}</Form.Label>}
          {toEdit && <Form.Label>{!toEdit.answers.includes('') ? 'выбери верный:' : 'заполни все варианты!'}</Form.Label>}
          <Row>
            {!toEdit && question.answers.map((answer, ind) => 
              <Col md={6} key={ind} className='d-grid gap-2'>
                <ToggleButton 
                  className='mb-2'
                  id={ind} 
                  type='radio' 
                  name='correct' 
                  value={answer}
                  disabled={question.answers.includes('')}
                  variant={question.correct === answer ? 'success' : 'outline-success'}
                  checked={question.correct === answer}
                  onChange={e => setQuestion({...question, correct: e.target.value})}
                >
                  {answer === '' ? 'ответ не введен' : answer}
                </ToggleButton>
              </Col>
            )}
            {toEdit && toEdit.answers.map((answer, ind) => 
              <Col md={6} key={ind} className='d-grid gap-2'>
                <ToggleButton 
                  className='mb-2'
                  id={ind} 
                  type='radio' 
                  name='correct' 
                  value={answer}
                  disabled={toEdit.answers.includes('')}
                  variant={toEdit.correct === String(answer) ? 'success' : 'outline-success'}
                  checked={toEdit.correct === answer}
                  onChange={e => setToEdit({...toEdit, correct: e.target.value})}
                >
                  {answer === '' ? 'ответ не введен' : answer}
                </ToggleButton>
              </Col>
            )}
          </Row>
        </>
      </Modal.Body>
      <Modal.Footer>
        {!toEdit ?
          <>
          <Button variant='danger' onClick={closeModal}>закрыть</Button>
          <Button variant='success' onClick={addNewQuestion} disabled={!question.title || !question.correct || question.answers.includes('')}>сохранить</Button>
          </>
          :
          <>
          <Button variant='danger' onClick={closeModal}>закрыть</Button>
          <Button variant='success' onClick={editThisQuestion} disabled={!toEdit.title || !toEdit.correct || toEdit.answers.includes('')}>сохранить</Button>
          </>
        }
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;