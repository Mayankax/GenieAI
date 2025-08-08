import "./chatPage.css";
import NewPrompt from "../../components/newPrompt/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react"; // ✅ Needed for image rendering

const ChatPage = () => {
  const { getToken } = useAuth();
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch chat");
      }

      return res.json();
    },
  });

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {isPending ? (
            "Loading..."
          ) : error ? (
            "Something went wrong!"
          ) : (
            data?.history?.map((message, i) => (
              <div
                key={i}
                className={message.role === "user" ? "message user" : "message"}
              >
                {message.img && (
                  <IKImage
                    urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                    path={message.img}
                    height="300"
                    width="400"
                    transformation={[{ height: 300, width: 400 }]}
                    loading="lazy"
                    lqip={{ active: true, quality: 20 }}
                  />
                )}
                <Markdown>{message.parts[0].text}</Markdown>
              </div>
            ))
          )}

          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
