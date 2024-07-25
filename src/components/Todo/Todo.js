import { useEffect, useMemo, useState } from "react";

const Todo = () => {
  const [count, setCount] = useState(0);
  const example = 2;
  useEffect(() => {
    console.log("its running");
  }, [example]);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "60%",
          display: "flex",
          marginTop: 100,
          alignItems: "flex-start",
        }}
      >
        <input
          style={{ width: "100%", padding: 10 }}
          placeholder="Add Notes"
          value={count}
        ></input>
        <button
          onClick={() => setCount((prev) => prev + 1)}
          style={{ backgroundColor: "green", border: "none", padding: 10 }}
        >
          Add
        </button>
      </div>
    </div>
  );
};
export default Todo;
