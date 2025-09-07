import { useQuery } from '@tanstack/react-query';
import React from 'react';

const fetchUsers = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    return res.json();
};

const fetchTodos = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
    return res.json();
};


const ParallelQueries: React.FC = () => {

    const { data: users, isLoading: usersLoading } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });

    const { data: todos, isLoading: todosLoading } = useQuery({
        queryKey: ["todos"],
        queryFn: fetchTodos,
    });

    if (usersLoading || todosLoading) return <p>Loading...</p>;


    return (
        <div>
            <h2>Parallel Queries</h2>
            {/* Parallel queries functionality will go here */}
            <div className="grid grid-cols-2 gap-4 p-4">
                <div>
                    <h3 className="font-bold">Users</h3>
                    <ul>
                        {users?.map((u: any) => (
                            <li key={u.id}>{u.name}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold">Todos</h3>
                    <ul>
                        {todos?.map((t: any) => (
                            <li key={t.id}>{t.title}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ParallelQueries;
