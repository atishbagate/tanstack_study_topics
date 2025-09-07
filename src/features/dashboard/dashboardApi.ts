const BASE_URL = "https://jsonplaceholder.typicode.com";


const fetchUsers = async () => {
    const res = await fetch(`${BASE_URL}/users`);
        if(!res.ok) {
        throw new Error("Failed to fetch users");
    }
    return res.json();
}

const fetchComments = async () => {
    const res = await fetch(`${BASE_URL}/comments?_limit=5`);
    if(!res.ok) {
        throw new Error("Failed to fetch comments");
    }
    return res.json();
};

const fetchUserById = async (userId: number) => {
    const res = await fetch(`${BASE_URL}/posts?userId=${userId}`);
    if(!res.ok) {
        throw new Error("Failed to fetch user posts");
    }
    return res.json();
};

export { fetchUsers, fetchComments, fetchUserById };