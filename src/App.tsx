import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import styled, { css } from 'styled-components';

const Header = styled.header`
  outline: 1px solid coral;
`;

const Table = styled.table`
  border: 1px solid grey;
  border-collapse: collapse;
`;

const Tbody = styled.tbody`
  border: 1px solid grey;
`;

const Th = styled.th`
  position: relative;
  top: -10px;
`;

const Td = styled.td`
  border: 1px solid grey;
`;

function App() {
  // const [isActive, setIsActive] = useState('isActive');
  const today = new Date();
  const monday = new Date(
    today.setDate(today.getDate() - today.getDay() + 1)
  ).toUTCString();

  const hours = new Array(24).fill('hour').map((hour, index) => {
    if (!index) {
      return;
    } else if (index < 10) {
      return `0${index}:00`;
    } else return `${index}:00`;
  });
  const days = new Array(7).fill('day');
  return (
    <div className='App'>
      <Header>Interview Calendar</Header>
      <div>дни недели, дата: {monday} и месяц</div>
      <Table>
        <Tbody>
          {hours.map((hour) => (
            <tr>
              <Th>{hour}</Th>
              {days.map((day) => (
                <Td>day</Td>
              ))}
            </tr>
          ))}
        </Tbody>
      </Table>

      <footer>Today (Delete)</footer>
    </div>
  );
}

export default App;
