export const getAllUsers = () => {
    return fetch("api/userprofile")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch user profiles. Status: ${response.status}`);
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error fetching user profiles:', error);
            throw error; // Rethrow the error to propagate it further if needed
        });
};


export const getUserById = (id) => {
    return fetch(`/api/userprofile/${id}`).then((response) => response.json());
};

export const getUsers = () => {
    return fetch("/api/userprofile").then((response) => response.json())
}
