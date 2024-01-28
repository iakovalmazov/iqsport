import React from 'react';
import { ListGroup, Badge } from 'react-bootstrap'

const Rating = ({rating}) => {
  return (
    <ListGroup as="ol" numbered>
      <h2 className='m-auto'>рейтинг:</h2>
      {rating.map(item => 
        <ListGroup.Item key={item.id} className='d-flex justify-content-between'>
          <div className='ms-2 me-auto'>{item.login}</div>
          <Badge bg='success' pill>{item.result}</Badge>
        </ListGroup.Item>
      )}
    </ListGroup>
  );
};

export default Rating;