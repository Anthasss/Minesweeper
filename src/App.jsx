import MineGrid from "./components/MineGrid";
import { useColors } from "./stores/UseColors";
import GameEndModal from "./components/GameEndModal";

function App() {
  const { bgColor } = useColors();
  return (
    <>
      <div className={`${bgColor} grid grid-cols-[auto,1fr,auto] grid-rows-1 h-screen`}>
        <div className="row-start-1 col-start-1">hello</div>
        <div className="row-start-1 col-start-2">
          <MineGrid />
        </div>
        <div className="row-start-1 col-start-3">world</div>
      </div>
      <GameEndModal />
    </>
  );
}

export default App;
