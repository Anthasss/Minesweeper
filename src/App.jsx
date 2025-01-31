import MineGrid from "./components/MineGrid";
import GameEndModal from "./components/GameEndModal";
import SettingsModal from "./components/SettingsModal";
import TutorialModal from "./components/TutorialModal";
import { useVisualCustomization } from "./stores/UseVisualCustomization";

import Logger from "./components/Logger";

function App() {
  const { bgColor } = useVisualCustomization();
  return (
    <>
      <div className={`${bgColor} grid grid-cols-[auto,1fr,auto] grid-rows-1 h-screen`}>
        <div className="row-start-1 col-start-1 flex justify-start items-start pt-4 pl-2">
          <TutorialModal />
        </div>
        <div className="row-start-1 col-start-2">
          <div className="flex flex-col justify-center items-center h-screen">
            <MineGrid />
          </div>
        </div>
        <div className="row-start-1 col-start-3 flex justify-end items-start pt-4 pr-2">
          <SettingsModal />
        </div>
      </div>

      <GameEndModal />
      <Logger />
    </>
  );
}

export default App;
