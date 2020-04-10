import React from 'react';

export default function Header() {
    return (
        <header>
            <h1>COVID-19</h1>
            <p>Coronavirus infection COVID-19 is an infectious disease caused by a new coronavirus that has not previously been detected in humans.</p>
            <div className="scroll-mouse" onClick={() => {
                document.getElementById("bottom").scrollIntoView({block: "center", behavior: "smooth"});
                document.getElementById("scroll-btn").style.display = 'none';
                document.body.addEventListener("scroll", function(){
                    if (Math.floor(document.body.scrollHeight - document.body.scrollTop) === document.body.clientHeight){
                        document.body.style.overflow = "hidden";
                    }
                })
            }}>
                <div className="scroll-to" id ="scroll-btn">
                    <div className="chevron"></div>
                    <div className="chevron"></div>
                    <div className="chevron"></div>
                    <div className="text">Scroll down</div>
                </div>
            </div>
        </header>
    )
}
