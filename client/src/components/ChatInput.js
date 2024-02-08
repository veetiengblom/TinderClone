import React from "react";

import { useState } from "react";

const ChatInput = () => {
  const [textArea, setTextArea] = useState(null);

  return (
    <div className="chatInput">
      <textarea
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      ></textarea>
      <button className="secondaryBtn">Submit</button>
    </div>
  );
};

export default ChatInput;
