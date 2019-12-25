import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Header, List } from 'semantic-ui-react'

const App = ({children}) => {
  return (
    <Container style={{ margin: 20}}>
      <Header as="h3">Button Example</Header>
      <List bulleted>
        <List.Item 
          as="a"
          content="baidu"
          href="www.baidu.com"
          target="_blank"
        />
        <List.Item 
          as="a"
          content="google"
          href="www.google.com"
          target="_blank"
        />
      </List>
      {children}
    </Container>
  );
}

export default App;
