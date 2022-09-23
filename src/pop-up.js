import './assets/css/pop-up.scss'
import copyIcon from './assets/img/copy-icon.png'
import right from './assets/img/copied.png'
import notSpam from './assets/img/not-spam.png';
import { useState } from 'react';
import { oembed } from "@loomhq/loom-embed";

export default function Pop_up(props) {
    const [videoHTML, setVideoHTML] = useState("");
    const [response, setresponse] = useState("");

    const ombed = async () => {
        var embedUrl = props.videoUrl,
            ombedVideo = await oembed(embedUrl);
        setVideoHTML(ombedVideo.html)
    }
    ombed();


    function CopyLink() {
        let getLink = document.querySelector('.tp-copy-txt-input').value;
        navigator.clipboard.writeText(getLink)

        document.querySelector('.tp-copy-link-content').classList.add("tp-copied")
        document.querySelector('.tp-copy-btn').classList.remove("show")
        document.querySelector('.tp-copied-icon').classList.add("show-copy")
        document.querySelector('.tp-link-success').classList.add('show')
    }

    function RemoveCopied() {
        document.querySelector('.tp-copy-link-content').classList.remove('tp-copied')
        document.querySelector('.tp-copy-btn').classList.add('show')
        document.querySelector('.tp-copied-icon').classList.remove('show-copy')
        document.querySelector('.tp-link-success').classList.remove('show')
        document.querySelector('.tp-emailId').classList.remove('tp-empty-email')
        document.querySelector('.tp-email-error').classList.remove('show')
        document.querySelector('.tp-email-response').classList.remove('show')
    }

    function EmailCheck() {
        var EmailId = document.querySelector('.tp-emailId').value,
            video_url = document.querySelector('.tp-copy-txt-input').value;
        var emailData = { 'email': EmailId, 'url': video_url }

        var emailValidate = /\S+@\S+\.com/.test(EmailId)
        const SendEmail = () => {
            let URL = 'https://api.posimyth.com/wp-json/loomvideo/v2/email';
            let requestMetadata = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(emailData)
            }

            fetch(URL, requestMetadata)
                .then(response => response.text())
                .then(result => { setresponse(JSON.parse(JSON.parse(result))) })
                .catch(error => console.log('error', error));
        }

        if (EmailId == "" || emailValidate == false) {
            document.querySelector('.tp-emailId').classList.add('tp-empty-email')
            document.querySelector('.tp-email-response').classList.remove('show')
            document.querySelector('.tp-email-error').classList.add('show')
        } else {
            document.querySelector('.tp-email-error').classList.remove('show')
            document.querySelector('.tp-emailId').classList.remove('tp-empty-email')
            document.querySelector('.tp-email-response').classList.add('show')
            SendEmail();
        }
    }

    return (
        <div id="tp-loom-popup" className="tp-popup-overlay">
            <div className="tp-popup">
                <div className='tp-popup-content'>
                    <a className="tp-close" href="#" onClick={() => { RemoveCopied() }}>&times;</a>
                    <div className='tp-previous-video' dangerouslySetInnerHTML={{ __html: videoHTML }}></div>
                    <div className='tp-radio-btn'>
                        <div className='tp-link'>
                            <input type="radio" name='link-email' id="tp-link-btn" className="tp-radio-inpBtn" defaultChecked onClick={(e) => {
                                document.querySelector('.tp-copy-link').classList.add("show")
                                document.querySelector('.tp-send-email').classList.remove("show")
                            }} />
                            <label className='tp-radio-lable' htmlFor="tp-link-btn">Copy the link to clipboard</label>
                        </div>
                        <div className='tp-email'>
                            <input type="radio" name='link-email' id="tp-email-btn" className="tp-radio-inpBtn" onClick={() => {
                                document.querySelector('.tp-send-email').classList.add("show")
                                document.querySelector('.tp-copy-link').classList.remove("show")
                            }} />
                            <label className='tp-radio-lable' htmlFor="tp-email-btn">Email me the link of video</label>
                        </div>
                    </div>

                    <div className='tp-copy-link show'>
                        <span className='tp-inp-header'>Copy Link</span>
                        <div className='tp-copy-link-content'>
                            <input type="text" className='tp-copy-txt-input' value={props.videoUrl} disabled />
                            <button className='tp-copy-btn show' onClick={() => { CopyLink() }}>
                                <img src={copyIcon}></img>
                            </button>
                            <div className='tp-copied-icon'>
                                <img className='tp-tick' src={right} /><span>copied</span>
                            </div>
                        </div>
                        <span className='tp-link-success'>Link successfully copied, please share this with our team</span>
                    </div>
                    <div className='tp-send-email'>
                        <span className='tp-inp-header'>Enter Your Email Address:</span>
                        <div className='tp-enter-email'>
                            <input type='email' placeholder='eg: youremail@mail.com' className='tp-emailId' />
                            <button className='tp-mail-btn' onClick={() => {
                                EmailCheck();
                            }}> Send Link</button>
                        </div>
                        <div>
                            <span className='tp-email-error'>Enter valid email</span>
                            <span className='tp-email-response' style={response.succees == 1 ? { color: "#1dd8a7" } : { color: "red" }}>{response.message}</span>
                        </div>
                        <span className='tp-privacy-policy'>
                            <div className='tp-not-spam'>
                                <img className='tp-spam-img' src={notSpam} />NO SPAM GUARANTEE
                            </div>
                            <a className='tp-privacy-policy-link' target="_blanck" rel="noopener noreferrer" href='https://store.posimyth.com/privacy-policy/'>Read Privacy Policy</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}