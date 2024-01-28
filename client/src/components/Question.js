import React, {useState, useEffect} from 'react'
import {Card, ListGroup} from 'react-bootstrap'
import { getQuestion } from '../http/questionApi'

const Question = ({checkAnswer, mistakesCanMake, questionNumber}) => {
  const [question, setQuestion] = useState(JSON.parse(localStorage.getItem('question')) || {})

  useEffect(() => {
    getQuestion().then(data => setQuestion(data))
  }, [mistakesCanMake, questionNumber])

  return (
    <Card className='mt-4'>
      <Card.Header>
        <Card.Title>{question.title}</Card.Title>
      </Card.Header>
      <Card.Body>
      <ListGroup>
        {question.answers && question.answers.map(answer => 
          <ListGroup.Item action key={answer} onClick={() => checkAnswer(answer, question.correct)}>{answer}</ListGroup.Item>
        )}
      </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Question;