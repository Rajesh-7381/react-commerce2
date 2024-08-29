import React, { useState } from 'react'
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import Pratice1 from './Pratice1';

const Main = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
    <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>
    Toggle
  </Button>
  <Collapse isOpen={isOpen} >
    <Card>
      <CardBody>
        <Pratice1 />
      </CardBody>
    </Card>
  </Collapse>
    </div>
  )
}

export default Main
