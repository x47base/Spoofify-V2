import Image from 'next/image'
import {
  BsClock,
  BsFillBookmarkFill,
  BsFillBookmarksFill,
  BsFillHouseFill,
  BsFillHandThumbsUpFill,
  BsPlayFill,
  BsFillGearFill,
  BsFillVolumeUpFill
} from "react-icons/bs";
import "./App.css";
import Form from "../components/Form";
import Modal from "../components/Modal";
import Track from '../components/Track';
import TrackHeader from '../components/TrackHeader';
import SideBarIcon from '../components/SideBarIcon';
import Main from '../pages/Main';
import sounds from './settings/sounds';

const SideBar = () => {
  return (
    <div className="sidebar z-20 fixed top-0 left-0 w-1/12 h-screen bg-neutral-900 flex flex-col">
      <a href="/" className="nav__brand font-bold text-green-500 mt-3 mb-6">
        Spoofify
      </a>
      <div className="flex flex-col gap-4 justify-between">
        <div className="upper-container flex flex-col justify-between gap-4 sidebar-main">
          <a href="/" className="sidebar__link">
            <SideBarIcon
              icon={<BsFillHouseFill size="28" />}
              classes="hover:text-green-500 active-tab"
            />
          </a>

          <a href="#" className="sidebar__link">
            <SideBarIcon
              icon={<BsFillBookmarksFill size="28" />}
              classes="hover:text-green-500"
            />
          </a>
        </div>
        <div className="lower-container sidebar-other fixed bottom-0 left-0 w-32 mb-6">
          <a href="#" className="sidebar__link">
            <SideBarIcon
              icon={<BsFillGearFill size="28" />}
              classes="hover:text-green-500"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

const Player = () => {
  return (
    <div className="player z-20 fixed bottom-0 right-0 p-3 h-16 w-11/12 bg-neutral-800 justify-center items-center">
      <div id="player-container" className="grid grid-cols-[auto,1fr,1fr,auto] text-left justify-center items-center gap-4">
        <div className="flex flex-row gap-2 justify-center items-center">
          <img id="songImagePlaying" className="no-image"/>
          <span
            id="songCurrentlyPlaying"
            className="text-textLight text-base font-medium w-[420px]"
          >
            Untitled
          </span>
        </div>
        <div className="flex flex-row gap-2 justify-center items-center">
          <button id="player-play-btn">
            <SideBarIcon
              icon={<BsPlayFill size="20" />}
              classes="text-white hover:text-green-500"
            />
          </button>
          <span
            id="songCurrentTime"
            className="text-textLight text-base font-medium"
          >
            0:00
          </span>
          <input
            id="songCurrentTimeSlider"
            type="range"
            min="0"
            max="100"
            defaultValue="100"
            className="cursor-pointer"
          />
          <span id="songLength" className="text-textLight text-base font-medium">
            0:00
          </span>
        </div>
        <div></div>
        <div className="flex flex-row gap-2 justify-center items-center">
          <button id="curentLiked">
            <SideBarIcon icon={<BsFillHandThumbsUpFill size="18"/>} classes="text-white hover:text-green-500" />
          </button>
          <button id="currentSaved">
            <SideBarIcon icon={<BsFillBookmarkFill size="18" />} classes="text-white hover:text-green-500" />
          </button>
          <input
            id="songCurrentVolume"
            type="range"
            min="0"
            max="100"
            step="10"
            defaultValue="100"
            className=" cursor-pointer"
          />
          <button id="currentVolume">
            <SideBarIcon icon={<BsFillVolumeUpFill size="18" />} classes="" />
          </button>
        </div>
      </div>
    </div>
  );
};


/*
function Footer() {
  return (
    <footer className="flex bg-green-500 p-2 justify-center">
      <span className="text-textLight">&copy; Spoofify 2023</span>
    </footer>
  );
}
*/

/* Example Register Form

      <Form title="Create Account" submit_text="Register"
        inputs = {[
          { action: "/", method: "POST", type: "email", name: "p-email", placeholder: "example@gmail.com", minLength: "" },
          { action: "/", method: "POST", type: "password", name: "p-password", placeholder: "Password", minLength: "8" },
        ]}/>
*/

function App() {
  return (
    <div>
      <Modal
        title="Welcome"
        description="Welcome to Spoofify! The #1 Music Platform."
      />

      <div className="App">
        <SideBar />
        <Player />
        <Main/>
      </div>
    </div>
  );
}

export default App;
