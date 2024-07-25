const InputBox = ({ label, options, currency, setCurrency , setValue,value}) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 10,
      }}
    >
      <div style={{ width: "90%" }}>
        <label
          style={{ width: "100%", display: "flex", alignItems: "flex-start" }}
        >
          {label}
        </label>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <select
            style={{
              padding: 10,
              borderRadius: 10,
            }}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {options?.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <input
            disabled={label === "To"}
            style={{
              flex: 1,
              marginLeft: 20,
              padding: 10,
              border: "none",
              backgroundColor: "rgba(0,0,0,0.1)",
              borderRadius: 10,
              fontSize: 20,
            }}
            value={value}
            onChange={(e)=> setValue(e.target.value)}
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
};
export default InputBox;
