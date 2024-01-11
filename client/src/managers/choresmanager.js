export const getAllChores = () => {
    return fetch("api/chore").then((response) => response.json())
}

export const getChoreById = (id) => {
    return fetch(`/api/chore/${id}`).then((response) => response.json());
};
