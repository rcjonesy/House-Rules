export const getAllUsers = () => {
    return fetch("api/userprofile").then((response) => response.json())
}

export const getUserById = (id) => {
    return fetch(`/api/userprofile/${id}`).then((response) => response.json());
};
