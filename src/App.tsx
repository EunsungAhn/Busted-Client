import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [Name, setName] = useState("");
  useEffect(() => {
    axios.get("/api/user").then((res) => {
      console.log(res.data);
      setName(() => res.data.url);
    });
  }, []);
  return (
    <div>
      <h1>Busted!!</h1>
      <p>
        {Name}
        &nbsp;
        <strong>from server</strong>
      </p>
      <img
        style={{ width: "300px" }}
        src="https://busted.s3.ap-northeast-2.amazonaws.com/images/test.png"
        alt="testImage"
      />
    </div>
  );
}

export default App;
