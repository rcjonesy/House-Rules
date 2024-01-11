import { getChoreById } from "../managers/choresmanager"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"


export const ChoreDetails = () => {

    const { id } = useParams()
    const userId = id

    const [chore, setChore] = useState()

    const handleGetChore = (id) => {
        getChoreById(id).then(setChore)
    }

    useEffect(() => {
        handleGetChore(userId)
    }, [])

   
    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                <h3>{chore?.name}</h3>
            </div>
            <div>
                <h5>Most Recent Completion</h5>
                {chore?.choreCompletions.length > 0 ? (
                    <p>
                        Completed by: {chore?.choreCompletions[0]?.userProfile?.firstName}{' '}
                        {chore?.choreCompletions[0]?.userProfile?.lastName}{' '}
                        on {chore?.choreCompletions[0]?.completedOn}
                    </p>
                ) : (
                    <p>Chore not completed</p>
                )}
            </div>
            <div>
                <h5>Assignees</h5>
                <ul>
                    {chore?.choreAssignments.map((assignment, index) => (
                        <li key={index}>
                            {assignment?.userProfile?.firstName} {assignment?.userProfile?.lastName}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
    
}