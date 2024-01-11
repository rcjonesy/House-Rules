import { getAllUsers } from "../managers/userProfile";
import { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Navigate, useNavigate } from "react-router-dom";

export const UserProfileList = () => {

    const navigate = useNavigate()
    const [users, setUsers] = useState([]);

    const handleGetUsers = () => {
        getAllUsers().then(setUsers);
    };

    useEffect(() => {
        handleGetUsers();
    }, []);


    return (
        <Table hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={index} onClick={() => navigate(`/userprofiles/${user.id}`)}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};
