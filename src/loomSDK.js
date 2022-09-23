import { setup, isSupported } from "@loomhq/record-sdk";
import { useEffect, useState } from "react";
import './assets/css/index.scss';
import ClickHere from './assets/img/Click_here.png';
import logo from './assets/img/logo.png'
import checkIcons from './assets/img/check-mark-circle.png';
import works from './assets/img/how_it_works.png';
import stars from './assets/img/Star.png'
import Pop_up from "./pop-up";
const BUTTON_ID = "loom-record-sdk-button";

export default function App() {
  const[videoUrl , setvideoUrl] = useState("");

  useEffect(() => {
    SetupLoom();
  }, []);

  async function SetupLoom() {
    const { supported, error } = await isSupported();

    if (!supported) {
      console.warn(`Error setting up Loom: ${error}`);
      return;
    }

    const button = document.getElementById(BUTTON_ID);
    if (!button) { return; }

    const { configureButton } = await setup({ publicAppId: 'Enter your Api link here' })
    const sdkButton = configureButton({ element: button });

    sdkButton.on("recording-complete", async function (video) {
      setvideoUrl(video.sharedUrl);
      document.querySelector('.tp-previous-btn').classList.add('btn-show'); 
    })
  }

  if (works[0] === "/") { works = works.substring(1); }
  if (logo[0] === "/") { logo = logo.substring(1) }
  
  return (
    <>
      <div className="container say-it-video">
        <h1 className="main_title">Say it,With a Video</h1>
        <h4 className="main_desc">We understand that text isn't always the best medium to communicate, so we bring you a secure video sharing<br /> medium that allows you to explain your problems without having to juggle with complex words.</h4>
        <img src={ClickHere} className="posi-images-ab" alt="worksicon" />
        <div className="tp-loom-btn">
          <button type="button" id={BUTTON_ID} className="btn-record" >Record Video</button>
        </div>

        <div className="star-rating-wrapper">
              <div className="tp-previous-btn"><a href="#tp-loom-popup">Email me the Video Link</a></div>
          <img src={stars} />
          <h5 className="rating-title">
            <a className="rl" target='_blank' rel="noreferrer" href="https://wordpress.org/support/topic/support-from-other-dimension/">Support from other dimension</a>
          </h5>
          <h6 className="rating-desc">
            <a className="rl" target='_blank' rel="noreferrer" href="https://wordpress.org/support/topic/support-from-other-dimension/">“The support of these guys is extremely good and they will do<br /> everything to find you a solution you need”</a>
          </h6>
          <a className="rating-author" target='_blank' rel="noreferrer" href="https://wordpress.org/support/topic/support-from-other-dimension/">~lunckut</a>
          <h5 className="rating-title">Brought to you by</h5>
          <a href="https://posimyth.com/" target="_blank" rel="noreferrer">
            <img src={logo} className="posimyth-logo-img" alt="logo" />
          </a>
        </div>

        <div className="tp-loomtick">
          <div className="tp-loom-main-list"><img src={checkIcons} className="loomtick-img" alt="checkIcons" />No-login required</div>
          <div className="tp-loom-main-list"><img src={checkIcons} className="loomtick-img" alt="checkIcons" />Record securely via Loom</div>
          <div className="tp-loom-main-list"><img src={checkIcons} className="loomtick-img" alt="checkIcons" />No downloads or Installation required</div>
        </div>
        <div className="tp-loomtick">
          <div className="tp-loom-main-list"><img src={checkIcons} className="loomtick-img" alt="checkIcons" />Video Stays between us</div>
          <div className="tp-loom-main-list"><img src={checkIcons} className="loomtick-img" alt="checkIcons" />Share link after Record</div>
        </div>
      </div>
      <div className="container  how-does-sec">
        <h3 className="how-main-title">How Does It Work?</h3>
        <div className="posi-bootom">
          <img src={works} alt="worksicon" />
        </div>
        <div className="bottom-link">
          <a href="https://store.posimyth.com/" target="_blank" rel="noreferrer" className="posi-timeline-text line-draw">Posimyth Store </a>
          <a href="https://store.posimyth.com/login/" target="_blank" rel="noreferrer" className="posi-timeline-text line-draw">Helpdesk</a>
        </div>
        <div className="bottom-link">
          <span className="posi-timeline-text">Our Products:</span>
          <a href="https://theplusaddons.com/" target="_blank" rel="noreferrer" className="posi-timeline-text line-draw">The Plus Addons for Elmenetor </a><span>|</span>
          <a href="https://theplusblocks.com/" target="_blank" rel="noreferrer" className="posi-timeline-text line-draw">The Plus Addons for Gutenberg </a><span>|</span>
          <a href="http://nexterwp.com/" target="_blank" rel="noreferrer" className="posi-timeline-text line-draw">NexterWP </a><span>|</span>
          <a href="https://wdesignkit.com/" target="_blank" rel="noreferrer" className="posi-timeline-text line-draw">WdesignKit</a>
        </div>
      </div>
      <Pop_up videoUrl = {videoUrl}/>
 
    </>
  );
}