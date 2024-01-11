import { getUserById } from "../managers/userProfile"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Table } from "reactstrap"



export const UserProfileDetails = () => {

    const { id } = useParams()
    const userId = id * 1
    const [user, setUser] = useState([])

    const handleGetUser = (id) => {
        getUserById(id).then(setUser)
    }

    useEffect(() => {
        handleGetUser(userId)
    }, [])

   

  



return (
    <div>
        
        {user && (
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th className="text-center">First Name</th>
                        <th className="text-center">Last Name</th>
                        <th className="text-center">Address</th>
                        <th className="text-center">Chore Assignments</th>
                        <th className="text-center">Chore Completions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center">{user.firstName}</td>
                        <td className="text-center">{user.lastName}</td>
                        <td className="text-center">{user.address}</td>
                        <td className="text-center">
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {user.choreAssignments && user.choreAssignments.map((assignment, index) => (
                                    <li key={index} className="text-center">{assignment.chore.name}</li>
                                ))}
                            </ul>
                        </td>
                        <td className="text-center">
                            <ul  style={{ listStyle: 'none', padding: 0 }}>
                                {user.choreCompletions && user.choreCompletions.map((completion, index) => (
                                    <li key={index} className="text-center">{completion.chore.name}</li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </Table>
        )}
    </div>
);

}