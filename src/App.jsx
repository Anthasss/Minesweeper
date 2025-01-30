import MineGrid from "./components/MineGrid";
// import GameEndModal from "./components/GameEndModal";
// import MineCell from "./components/MineCell";
import { useVisualCustomization } from "./stores/UseVisualCustomization";

import Logger from "./components/Logger";

function App() {
  const { bgColor } = useVisualCustomization();
  return (
    <>
      <div className={`${bgColor} grid grid-cols-[auto,1fr,auto] grid-rows-1 h-screen`}>
        <div className="row-start-1 col-start-1">hello</div>
        <div className="row-start-1 col-start-2">
          <MineGrid />
        </div>
        <div className="row-start-1 col-start-3">world</div>
      </div>

      {/* <GameEndModal /> */}

      {/* <div className={`flex justify-center items-center h-screen ${bgColor} `}>
        <MineCell mineState={false} />
      </div> */}
      <Logger />
    </>
  );
}

export default App;
