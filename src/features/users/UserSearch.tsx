import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

// API call to fetch user by username
const fetchUserByUsername = async (username: string) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`);
  return response.json();
}

const UserSearch: React.FC = () => {
  const [username, setUsername] = useState("");
  const {data, refetch, isFetching, error} = useQuery({
    queryKey: ["users", username],
    queryFn: () => fetchUserByUsername(username),
    enabled: false,
  })
  // note : enabled is false because we want to fetch the data only when the user clicks the search button
  // if we set it to true, the data will be fetched when the component mounts
  // if we set it to true, the data will be fetched when the component mounts
  // user user name - Bret , Antonette 
  
  return (
    <div className="p-4">

      {isFetching && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      {data && <div>{data.length} users found</div>}

      <input
        className="border-2 border-gray-300 rounded-md p-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button className="bg-blue-500 text-white rounded-md p-2" onClick={() => refetch()}>Search</button>

      {data && data.length > 0 && (
        <div className="mt-4">
          <p><b>Name:</b> {data[0].name}</p>
          <p><b>Email:</b> {data[0].email}</p>
        </div>
      )}

        <p className='text-sm text-gray-500'> note : enabled is false because we want to fetch the data only when the user clicks the search button
         if we set it to true, the data will be fetched when the component mounts
         if we set it to true, the data will be fetched when the component mounts
         user user name - Bret , Antonette  </p>
    </div>
  );
};

export default UserSearch;
