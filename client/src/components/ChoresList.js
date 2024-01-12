import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getAllChores } from "../managers/choresmanager";
import { completeChore } from "../managers/choresmanager";

export const ChoresList = ({ loggedInUser }) => {
  const navigate = useNavigate();
  const [chores, setChores] = useState([]);

  const handleGetChores = () => {
    getAllChores().then(setChores);
  };

  const handleAddChore = () => {
    navigate("/createChore")
  }

  const handleToChoreDetails = (id) => {
    
    navigate(`${id}`)
  }

  const handleCompleteChore = (id) => {
    completeChore(id, loggedInUser.id).then(() => getAllChores())
  }

  useEffect(() => {
    handleGetChores();
  }, []);

  return (
    <>
      <div>
        <Button onClick={handleAddChore} style={{ marginLeft: '10px' }}>Add Chore</Button>
      </div>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Chore</th>
            <th>Difficulty</th>
            <th>Frequency</th>
            <th>Remove Chore</th>
            <th>Complete Chore</th>
          </tr>
        </thead>
        <tbody>
          {chores.map((chore, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td  onClick={() => handleToChoreDetails(chore.id)}>{chore.name}</td>
              <td>{chore.difficulty}</td>
              <td>{chore.choreFrequencyDays}</td>
              <td>
                <Button
                  color="danger"
                  disabled={loggedInUser.roles.length === 0}
                  style={{
                    cursor: loggedInUser.roles.length === 0 ? 'not-allowed' : 'pointer',
                    color: loggedInUser.roles.length === 0 ? 'gray' : '',
                  }}
                >
                  Delete
                </Button>
              </td>
              <td>
                <Button onClick={() => handleCompleteChore(chore.id)}>Complete Chore</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    </>
  );
};
