import { useState } from "react";
import { fetchComments } from "./dashboardApi";
import { useQuery } from "@tanstack/react-query";
import UserPosts from "./UserPosts";
import UserList from "./UserList";
import BackgroundDemo from "./BackgroundDemo";


const UserDashboard = () => {

    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const { data: comments, isLoading: commentsLoading, isError: isCommentsError } = useQuery({ 
        queryKey: ["comments"],
        queryFn: fetchComments 
    });

    if (commentsLoading) return <div>Loading comments...</div>;
    if (isCommentsError) return <div>Error loading comments.</div>;

    return (
        <div className="p-4 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">User Dashboard</h2>
  
        {/* Parallel query: Users */}
        <UserList onSelectUser={setSelectedUserId} />
  
        {/* Dependent query: Posts of selected user */}
        <UserPosts userId={selectedUserId || 0} />
  
        {/* Parallel query: Comments */}
        <div className="mt-4">
          <h3 className="font-bold text-lg">Recent Comments</h3>
          {commentsLoading && <p>Loading comments...</p>}
          {isCommentsError && <p>Error loading comments.</p>}
          {comments && (
            <ul className="list-disc pl-5">
              {comments.map((c: any) => (
                <li key={c.id}>{c.body}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Background Demo */}
        <div className="col-span-2">
        <BackgroundDemo />
        </div>
      </div>    
    )
}

export default UserDashboard;