export function Index() {

    return (
        <div className="index">
            <div className="container">
                <section className="one page">
                    <h1 className="first-page-text">A new solution to your website needs</h1>
                </section>
                <section className="two page">
                    <div className="plans">
                        <section className="plan-slide" id="plan-one">
                            <div className="plan">
                                <div>
                                    <h2>Basic</h2>
                                    <h3>Inexpensive and Custom Plan</h3>
                                    <ul className="plan__features">
                                        <li className="plan__feature">Custom built website designed by a professional</li>
                                        <li className="plan__feature">Custom URL for easy access</li>
                                        <li className="plan__feature">Included design meeting with a professional</li>
                                        <li className="plan__feature">Included small monthly edits</li>
                                    </ul>
                                    <p>Initial price starting at $50</p>
                                    <p>Starting at $25 per month</p>
                                </div>
                                <div className="plan__bottom">
                                    <button className="but-choose-plan">Choose Plan</button>
                                    <div className="plan__navigation">
                                        <ul>
                                            <li className="current"><a href="#plan-one">Basic Plan</a></li>
                                            <li><a href="#plan-two">Plus Plan</a></li>
                                            <li><a href="#plan-three">Premium Plan</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="plan-slide plan__plus" id="plan-two">
                            <div className="plan">
                                <div>
                                    <h2>Plus</h2>
                                    <h3>Custom Plan Suited for Businesses</h3>
                                    <div className="plan__info">
                                        <div>
                                            <p className="plan__addition">Everything included in Basic, plus:</p>
                                            <ul className="plan__features">
                                                <li className="plan__feature">Backend components, including custom built databases</li>
                                                <li className="plan__feature">Te noster officiis posidonium</li>
                                                <li className="plan__feature">Nec at ridens bonorum, no</li>
                                                <li className="plan__feature">Ne eos porro assum</li>
                                                <li className="plan__feature">Cibo ubique at has</li>
                                            </ul>
                                        </div>
                                        <div className="plan__pricing">
                                            <p>Initial price varies based on site</p>
                                            <p>Starting at $50 per month</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="plan__bottom">
                                    <button className="but-choose-plan">Choose Plan</button>
                                    <div className="plan__navigation">
                                        <ul>
                                            <li><a href="#plan-one">Basic Plan</a></li>
                                            <li className="current"><a href="#plan-two">Plus Plan</a></li>
                                            <li><a href="#plan-three">Premium Plan</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="plan-slide plan__premium" id="plan-three">
                            <div className="plan">
                                <div>
                                    <h2>Premium</h2>
                                    <h3>adfafdafd asdfadf adfafd</h3>
                                    <ul className="plan__features">
                                        <li className="plan__feature">Nec at mucius</li>
                                        <li className="plan__feature">Te noster officiis posidonium</li>
                                        <li className="plan__feature">Nec at ridens bonorum, no</li>
                                        <li className="plan__feature">Ne eos porro assum</li>
                                        <li className="plan__feature">Cibo ubique at has</li>
                                    </ul>
                                    <p>Starting at $200 per month</p>
                                </div>
                                <div className="plan__bottom">
                                    <button className="but-choose-plan">Choose Plan</button>
                                    <div className="plan__navigation">
                                        <ul>
                                            <li><a href="#plan-one">Basic Plan</a></li>
                                            <li><a href="#plan-two">Plus Plan</a></li>
                                            <li className="current"><a href="#plan-three">Premium Plan</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                </section>
            </div>
            <style jsx>{`

        body::-webkit-scrollbar {
            display:none;
        }

        .page {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            scroll-snap-align: start;
        }

        .container {
            scroll-snap-type: y mandatory;
            overflow-y: scroll;
            height: 100vh;
            -webkit-overflow-scrolling: touch;
            overflow: overlay;
        }

        .container::-webkit-scrollbar-track-piece:start {
            background: transparent;
            margin-top: 4.5rem;
        }

        .container::-webkit-scrollbar {
            display: block;
            width: 10px;
            background: transparent;
        }
          
        .container::-webkit-scrollbar-thumb {
            background-color: #bababa;
            border-radius: 15px;
        } 


        .index {
            font-family: 'Source Sans Pro', sans-serif;
            font-weight: lighter;
            height: 100vh;
        }

        .one {
            padding: 0;
            margin: 0;
            display:flex;
            flex-direction:column;
            background-color: #8c8989;
        }

        .first-page-text {
            text-align: center;
            font-weight: 300;
        }

        .two {
            padding: 0;
            margin: 0;
            display:flex;
            flex-direction:column;
            // height:calc(100vh - 4rem);
        }

        .plans {
            scroll-snap-type: x mandatory;
            overflow-x: scroll;
            -webkit-overflow-scrolling: touch;
            margin-top: 0rem;
            display: flex;
            flex-direction: row;
            flex-wrap: no-wrap;
            width: calc(100vw - 1.25rem);
          
        }

        .plans::-webkit-scrollbar {
            display: none;
        }

        .plan-slide {
            scroll-snap-align: start;
            height: calc(100vh - 4rem);
            width: 100vw;
            flex: 0 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .plan__info {
            display: flex;
            flex-direction: column;
            align-items: start;
        }

        .plan__features {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .plan__feature {
            margin: 0.5rem 0;
        }

        .plan__bottom {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .but-choose-plan {
            font-size: 15px;
            padding: 5px 8px;
            margin-bottom: 5px;
            background-color: #a00606;
            border-radius: 5px;
            border: none;
            color:  #e5e5e5;
        }

        .but-choose-plan:hover {
            cursor: pointer;
        }

        .but-choose-plan:active {
            transform: scale(.95);
        }

        .plan__navigation ul {
            position: relative;
            display: inline-block;
            margin: 5px 0;
            padding: 0;
            list-style: none;
            cursor: default;
        }

        .plan__navigation li {
            position: relative;
            display: block;
            float: left;
            margin: 0 10px;
            width: 16px;
            height: 16px;
            cursor: pointer;
        }

        .plan__navigation li a {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            outline: none;
            border-radius: 50%;
            background-color: rgba(142, 142, 142);
            text-indent: -999em;
            cursor: pointer;
            position: absolute;
        }

        .plan__navigation li a:active {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            outline: none;
            border-radius: 50%;
            background-color: black;
            text-indent: -999em;
            cursor: pointer;
            position: absolute;
        }

        .current {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            outline: none;
            border-radius: 50%;
            transform: scale(1.3);
            background-color: rgba(0,0,0,0.3);
            text-indent: -999em;
            cursor: pointer;
            position: absolute;
        }

        h2 {
            margin: .5rem;
            padding: 0;
        }

        h3 {
            margin: .5rem;
            padding: 0;
        }

        p {
            margin: .5rem .5rem;
            text-align: center;
        }

        .choose-plan {
            margin-bottom: .5rem;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        }

        .plan {
            width: 25rem;
            min-height: 25rem;
            height: 25rem;
            // text-align: center;
            margin: .5rem;
            display: flex;
            flex-direction: column;
            // align-items: center;
            justify-content: space-between;
            z-index: 10;
        }

        

        @media (min-width: 27rem) {
            .plan {
                border: 2px solid black;
                border-radius: .5rem;
            }
        }

        @media (min-width: 44rem) {
            .plan {
                width: auto;
                height: auto;
                min-width: 10rem;
            }

            .plan-slide {
                width: auto;
            }

            .plans {
                width: auto;
                scroll-snap-type: x none;
                overflow-x: hidden;
            }

            .plan__navigation {
                display: none;
            }

            .but-choose-plan {
                margin-bottom: 10px;
            }
        }

        @media (min-width: 40rem) {
            @media(min-height: 31rem) {
                .container::-webkit-scrollbar-track-piece:start {
                    background: transparent;
                    margin-top: 3.5rem;
                }

                .container::-webkit-scrollbar-thumb {
                    border: .25px solid #7f7f7f;
                } 
            }
        }

        @media (min-width: 65rem) {
            .plan {
                width: 20rem;
            }
        }
      `}</style>
        </div>
    );
}

export default Index;
