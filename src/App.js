import BgOverlay from "./components/BgOverlay/BgOverlay";
import RootNavigator from "./components/RootNavigator";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <BgOverlay />
      <RootNavigator />
    </div>
  );
}

export default App;
