import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import styled, { css } from 'styled-components';
import { previousMonday, isMonday } from 'date-fns';

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
  const monday = isMonday(today)
    ? new Date(new Date().setHours(0, 0, 0))
    : new Date(previousMonday(today).setHours(0, 0, 0));

  const hours = new Array(24).fill('').map((hour, index) => {
    if (!index) {
      return;
    } else if (index < 10) {
      return `0${index}:00`;
    } else return `${index}:00`;
  });

  const days = new Array(7).fill('day');

  function addTask() {
    const taskDate =
      prompt(
        `
    Enter event time: 
    YYYY-MM-DD HH:MM:ss`,
        '2023-05-15 05:15:22'
      ) ?? '';

    console.log(
      taskDate,
      '&',
      new Date(taskDate).setMinutes(0, 0, 0),
      '&',
      new Date(new Date(taskDate).setMinutes(0, 0, 0)),
      '&',
      new Date(new Date(taskDate).setMinutes(0, 0, 0)).toISOString(),
      '&',
      new Date(new Date().setMinutes(0, 0, 0)).toISOString(),
      '&',
      previousMonday(new Date(taskDate)),
      '&',
      new Date(previousMonday(new Date(taskDate)).setHours(0, 0, 0))
    );
  }

  return (
    <div className='App'>
      <Header>
        Interview Calendar <button onClick={addTask}>+</button>
      </Header>
      <div>дни недели, дата: {monday.toISOString()} и месяц</div>
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
