import { useQuery } from '@tanstack/react-query';
import React from 'react';

const fetchUser = async (id: number) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    return res.json();
};

const fetchPosts = async (id: number) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`);
    return res.json();
};


const UserWithPosts: React.FC<{ userId: number }> = ({ userId }) => {

    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ["user", userId],
        queryFn: () => fetchUser(userId),
    });


    const { data: posts, isLoading: postsLoading } = useQuery({
        queryKey: ["posts", userId],
        queryFn: () => fetchPosts(userId),
        enabled: !!userId,
    });

    if (userLoading) return <p>Loading user...</p>;
    if (!user) return <p>No user found</p>;

    return (
        <div>
            <h2>User with Posts</h2>
            {/* User and their posts display will go here */}

            <div className="p-4">

                <h2 className="font-bold text-lg">{user.name}</h2>
                <p>{user.email}</p>

                {postsLoading ? (
                    <p>Loading posts...</p>
                ) : (
                    <ul className="mt-2 list-disc list-inside">
                        {posts?.map((post: any) => (
                            <li key={post.id}>{post.title}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default UserWithPosts;
