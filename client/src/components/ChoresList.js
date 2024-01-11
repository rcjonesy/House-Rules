import { getAllChores } from "../managers/choresmanager"
import { useState, useEffect } from "react"
import { Table, Button } from "reactstrap"
import { useNavigate } from "react-router-dom"


export const ChoresList = ({ loggedInUser }) => {

    const navigate = useNavigate()
    const [chores, setChores] = useState([])

    const handleGetChores = () => {
        getAllChores().then(setChores)
    }

    useEffect(() => {
        handleGetChores()
    }, [])

    return (
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Chore</th>
              <th>Difficulty</th>
              <th>Frequency</th>
              <th>Remove Chore</th>
            </tr>
          </thead>
          <tbody>
            {chores.map((chore, index) => (
              <tr key={index} onClick={() => navigate(`/chores/${chore.id}`)}>
                <th scope="row">{index + 1}</th>
                <td>{chore.name}</td>
                <td>{chore.difficulty}</td>
                <td>{chore.choreFrequencyDays}</td>
                <td>
                    <Button>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
}