import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import styled, { css } from 'styled-components';
import { previousMonday, isMonday } from 'date-fns';
import { th } from 'date-fns/locale';

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

const Td = styled.td<{ isTaken: boolean }>`
  border: 1px solid grey;
  ${({ isTaken }) =>
    isTaken &&
    `
    background: blue;
  `}
`;

interface HourObj {
  hourStr: string;
  hourDaysArr: { dateTime: number; isTaken: boolean }[];
}

function App() {
  const [calMatrix, setCalMatrix] = useState<HourObj[]>([]);
  const [isTakenArr, setIsTakenArr] = useState<number[]>([]);

  useEffect(() => {
    const today = new Date();
    const monday = isMonday(today)
      ? new Date(new Date().setHours(0, 0, 0, 0))
      : new Date(previousMonday(today).setHours(0, 0, 0, 0));

    const days = new Array(7).fill('').map((day, index) => {
      const nextDay = new Date(monday);
      nextDay.setDate(monday.getDate() + index);
      return nextDay;
    });

    const hours = new Array(24).fill('').map((hour, index) => {
      let hourStr;
      if (!index) {
        hourStr = '';
      } else if (index < 10) {
        hourStr = `0${index}:00`;
      } else {
        hourStr = `${index}:00`;
      }
      const hourDaysArr = days.map((day) => {
        const dateTime = day.setHours(index);
        // const dateTime = new Date(day.setHours(index));
        let isTaken;
        if (isTakenArr.includes(dateTime)) {
          isTaken = true;
        } else {
          isTaken = false;
        }
        return { dateTime, isTaken };
      });

      return { hourStr, hourDaysArr };
    });

    console.log(days, hours);

    setCalMatrix(hours);
  }, [isTakenArr]);

  function addTask() {
    const taskDateStr =
      prompt(
        `
    Enter event time:  
    YYYY-MM-DD HH:MM:ss`,
        '2023-05-25 05:15:22'
      ) ?? '';

    if (taskDateStr) {
      // const taskDateTStamp = new Date(taskDateStr).setMinutes(0, 0, 0);
      setIsTakenArr((st) => [...st, new Date(taskDateStr).setMinutes(0, 0, 0)]);
    }

    console.log(
      taskDateStr,
      '&',
      new Date(taskDateStr).setMinutes(0, 0, 0),
      '&',
      new Date(new Date(taskDateStr).setMinutes(0, 0, 0)),
      '&',
      new Date(new Date(taskDateStr).setMinutes(0, 0, 0)).toISOString(),
      '&',
      new Date(new Date().setMinutes(0, 0, 0)).toISOString(),
      '&',
      previousMonday(new Date(taskDateStr)),
      '&',
      new Date(previousMonday(new Date(taskDateStr)).setHours(0, 0, 0))
    );
  }

  return (
    <div className='App'>
      <Header>
        Interview Calendar <button onClick={addTask}>+</button>
      </Header>
      {/* <div>дни недели, дата: {monday.toISOString()} и месяц</div> */}
      <Table>
        <thead>
          <tr>
            <th></th>
            {calMatrix[0]?.hourDaysArr.map((day) => (
              <th>{new Date(day.dateTime).getDate()}</th>
            ))}
          </tr>
        </thead>
        <Tbody>
          {calMatrix.map((hour) => (
            <tr>
              <Th>{hour.hourStr}</Th>
              {hour.hourDaysArr.map((day) => (
                // <Td isTaken={day.isTaken}>{new Date(day.dateTime).toString()}</Td>
                <Td isTaken={day.isTaken}>{day.dateTime}</Td>
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
