import React from 'react'
import WhatsUp1 from '../images/whatsapp1.svg'
// style={{width: 72px; height: 72px; background-color: rgb(37, 211, 102)}}
const WhatsUpChat = () => {
    
    return (
        <div className="WAbtn-cls floating-wpp" style={{ left: "auto", right: "15px" }}>
            <div className="floating-wpp-button" style={{ width: "72px", height: "72px", backgroundColor: "rgb(37, 211, 102)" }}>
                <img src={WhatsUp1} alt='whatsapp1'></img>
            </div>
            <div className="floating-wpp-popup active" style={{ right: "0px" }}>
                <div className="floating-wpp-head" style={{ backgroundColor: "rgb(18, 140, 126)" }}>
                    <span>Chat with us on WhatsApp!</span>
                    <strong className="close">x</strong>
                </div>
                <div className="floating-wpp-message">Hello, how can we help you?</div>
                <div className="floating-wpp-input-message">
                    <textarea></textarea>
                    {/* <div className="floating-wpp-btn-send">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style={{ isolation: "isolate" }} viewBox="0 0 20 18" width="20" height="18">
                            <defs>
                                <clipPath id="_clipPath_fgX00hLzP9PnAfCkGQoSPsYB7aEGkj1G">
                                    <rect width="20" height="18"></rect>
                                </clipPath>
                            </defs>
                            <g clip-path="url(#_clipPath_fgX00hLzP9PnAfCkGQoSPsYB7aEGkj1G)">
                                <path d=" M 0 0 L 0 7.813 L 16 9 L 0 10.188 L 0 18 L 20 9 L 0 0 Z " fill="rgb(46,46,46)"></path>
                            </g>
                        </svg>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default WhatsUpChat
