interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

const fetchPosts = async (): Promise<Post[]> => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_sort=id&_order=desc");
    
    if (!res.ok) {
        throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    
    // Ensure we return an array
    if (!Array.isArray(data)) {
        console.error("API returned non-array data:", data);
        throw new Error("API returned invalid data format");
    }
    
    return data;
}

export { fetchPosts };