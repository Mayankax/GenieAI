import { useNavigate } from 'react-router-dom'
import './dashboardPage.css'
import {useMutation,useQueryClient} from '@tanstack/react-query'
import { useAuth } from "@clerk/clerk-react";

const DashboardPage = () =>{

    const navigate=useNavigate();
    const queryClient = useQueryClient()
    const { getToken } = useAuth(); // ⬅️ Add this

    const mutation = useMutation({
    mutationFn: async (text) => {
        const token = await getToken(); // ⬅️ Fetch token from Clerk
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // ⬅️ Send token to backend
            },
            body: JSON.stringify({ text }),
            });

            if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to create chat");
            }

            const data = await res.json();
            return data; // make sure backend returns `{ id: "..." }`
        },
        onSuccess: (id) => {
            queryClient.invalidateQueries({ queryKey: ['userChats'] });
            navigate(`/dashboard/chats/${id}`);
        },
        onError: (error) => {
            console.error("Chat creation failed:", error.message);
            // Optional: Show a toast or error message to the user
        },
    });


    const handleSubmit=async(e)=>{
        e.preventDefault();
        const text =e.target.text.value;
        if(!text) return;

        mutation.mutate(text);
    }
    return(
        <div className="dashboardPage">
            <div className="texts">
                <div className="logo">
                    <img src="/logo.png" alt="" />
                    <h1>Genie AI</h1>
                </div>
                <div className="options">
                    <div className="option">
                        <img src="/chat.png" alt="" />
                        <span>Create a New Chat</span>
                    </div>
                    <div className="option">
                        <img src="/women.png" alt="" />
                        <span>Analyze Images</span>
                    </div>
                    <div className="option">
                        <img src="/code.png" alt="" />
                        <span>Help me With my Code</span>
                    </div>
                </div>
            </div>
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <input type="text" name='text' placeholder='Ask me anything...'/>
                    <button>
                        <img src="/arrow.png" alt="" />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default DashboardPage;
