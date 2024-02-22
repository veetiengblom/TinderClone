// Functional component Chat to display messages
const Chat = ({ descendingOrderMessages }) => {
  // Render the chat display with messages
  return (
    <div className="chatDisplay">
      {/* Map through messages in descending order */}
      {descendingOrderMessages.map((message, _index) => (
        <>
          {/* Check if the message is not a category */}
          {message.id !== "category" && (           
            <div key={_index} className="chatMessageContainer" id={message.id}>
              <img
                className="profileImg"
                src={message.img}
                alt={message.name + "profile"}
              />
              <p className="message">{message.message}</p>
              <p className="timestamp">{message.createdAt}</p>
            </div>
          )}

          {/* Check if the message is a category */}
          {message.id === "category" && (
            <div key={_index} className="chatMessageContainer" id={message.id}>
              <p className="message">
                {"Matched Activity: " + message.message}
              </p>
            </div>
          )}
        </>
      ))}
    </div>
  );
};

// Export the Chat component as the default export
export default Chat;
