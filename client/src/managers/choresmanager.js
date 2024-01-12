export const getAllChores = () => {
    return fetch("api/chore").then((response) => response.json())
}

export const getChoreById = (id) => {
    return fetch(`/api/chore/${id}`).then((response) => response.json());
};

export const newChorePost = (choreObj) => {

    return fetch("/api/chore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(choreObj)
    })
}

export const completeChore = (id, userId) => {

    return fetch(`/api/chore/${id}/complete/?userId=${userId}`, {
        method: "POST",

    })
}

export const assignChore = (id, userId) => {

    return fetch(`/api/chore/${id}/assign/?userId=${userId}`, {
        method: "POST",

    })
}

export const unassignChore = (id, userId) => {
    return fetch(`/api/chore/${id}/unassign/?userId=${userId}`, {
        method: "POST",

    })
}
