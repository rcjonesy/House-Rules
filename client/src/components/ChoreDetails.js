import { getChoreById } from "../managers/choresmanager"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getUsers } from "../managers/userProfile"
import { assignChore } from "../managers/choresmanager"
import { unassignChore } from "../managers/choresmanager"


export const ChoreDetails = () => {

    const { id } = useParams()
    const userId = id

    const [chore, setChore] = useState()
    const [users, setUsers] = useState([])


    const handleGetChore = (id) => {
        getChoreById(id).then(setChore)
    }

    const handleGetUsers = () => {
        getUsers()
            .then((users) => {
                console.log('Users:', users);
                setUsers(users);
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        handleGetChore(userId)
        handleGetUsers()
    }, [userId])

    const handleCheckBoxes = (choreId, thisUserId) => {
        const isChecked = chore?.choreAssignments?.some((assignment) => assignment.userProfileId === thisUserId);
        
        if (isChecked) {
            
            unassignChore(choreId, thisUserId).then(() => handleGetChore(userId));
        } else {
            assignChore(choreId, thisUserId).then(() => handleGetChore(userId));
        }
    }

  


    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                <h3>{chore?.name}</h3>
                
            </div>
            <div>
                <h5>Most Recent Completion</h5>
                {chore?.choreCompletions?.length > 0 ? (
                    <p>
                        Completed by: {chore?.choreCompletions[0]?.userProfile?.firstName}{' '}
                        {chore?.choreCompletions[0]?.userProfile?.lastName}{' '}
                        {chore?.choreCompletions[0]?.completedOn}
                    </p>
                ) : (
                    <p>Chore not completed</p>
                )}
            </div>
            <div>
            <h5>User Assigned</h5>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <input
                                type="checkbox"
                                id={`${user.id}`}
                                //checking to see if user.id is included in the array of chore.choreAssignments to determine whether to mark the checkbox as checked
                                //since choreassignemts is a list
                                checked={chore?.choreAssignments?.some((assignment) => assignment.userProfileId === user.id)}
                                onChange={() => handleCheckBoxes(chore.id, user.id)}
                            />
                            <label htmlFor={`${user.id}`}>
                                {user.firstName} {user.lastName}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

}