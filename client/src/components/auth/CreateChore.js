import { Form, FormGroup, Label, Input, Button, FormText } from "reactstrap"
import { useState } from "react";
import { newChorePost } from "../../managers/choresmanager";
import { useNavigate } from "react-router-dom";


export const CreateChore = () => {

    const navigate = useNavigate()

 

    const [newchore, setNewChore] = useState({})

    const choreInput = (event) => {
        setNewChore({...newchore, name: event.target.value})
    }

    const difficultyInput = (event) => {
        setNewChore({...newchore, difficulty: event.target.value *1})
    }

    const frequencyInput = (event) => {
        setNewChore({...newchore, setfrequencydays: event.target.value *1})
    }

   const handleSubmitChore = (event) => {
    console.log(newchore)
    event.preventDefault()
    newChorePost(newchore).then(() => navigate("/chores"))
   }

    return (
        <Form className="mx-auto w-50">
            <FormGroup>
                <Label for="choreName">Chore Name</Label>
                <Input
                    type="text"
                    id="choreName"
                    placeholder="Enter Chore"
                    style={{ width: '150px' }}
                    className="form-control-sm"
                    onChange={choreInput}
                />
            </FormGroup>

            <FormGroup>
                <Label for="difficulty">Difficulty</Label>
                <Input
                    type="text"
                    id="difficulty"
                    placeholder="Difficulty"
                    style={{ width: '150px' }}
                    className="form-control-sm"
                    onChange={difficultyInput}
                />
            </FormGroup>

            <FormGroup>
                <Label for="frequency">Frequency</Label>
                <Input
                    type="text"
                    id="frequency"
                    placeholder="Frequency"
                    style={{ width: '150px' }}
                    className="form-control-sm"
                    onChange={frequencyInput}
                />
            </FormGroup>

            <Button color="primary" onClick={handleSubmitChore}>Submit</Button>
        </Form>
    );

}







