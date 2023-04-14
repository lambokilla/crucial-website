import { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import '../public/fonts/style.css';


function CustomApp({ Component, pageProps }: AppProps) {


	const toggleButton = () => {
        const mobileNav = document.querySelector(".mobile-nav");
        const backdrop = document.querySelector(".backdrop");

        mobileNav?.classList.add("open");
        backdrop?.classList.add("open");
        backdrop?.classList.add("opacity");
    }

    const closeMobileNav = () => {
        const mobileNav = document.querySelector(".mobile-nav");
        const backdrop = document.querySelector(".backdrop");
        mobileNav?.classList.remove("open");
        backdrop?.classList.remove("open");
        backdrop?.classList.remove("opacity");
    }
  	return (
		<>
			<Head>
				<title>Welcome to my-site!</title>
			</Head>
			<div className="backdrop" onClick={() => closeMobileNav()}></div>
			<header className="main-header">
				<div>
					<button className="toggle-button" onClick={() => toggleButton()}>
						<div className="toggle-button__bar bar-top"></div>
						<div className="toggle-button__bar"></div>
						<div className="toggle-button__bar bar-bottom"></div>
					</button>
				</div>
				<nav className="main-nav">
					<ul className="main-nav__items">
						<li className="main-nav__item">
							<Link href="/" style={{textDecoration: 'none'}}>
								<p className='main-nav__link'>Home</p>
							</Link>
						</li>
						<li className="main-nav__item">
							<Link href="/plans" style={{textDecoration: 'none'}}>
								<p className='main-nav__link'>Plans</p>
							</Link>
						</li>
                        <li className="main-nav__item">
							<Link href="/about" style={{textDecoration: 'none'}}>
								<p className='main-nav__link'>About Us</p>
							</Link>
						</li>
                        <li className="main-nav__item">
							<Link href="/contact" style={{textDecoration: 'none'}}>
								<p className='main-nav__link'>Contact Us</p>
							</Link>
						</li>
					</ul>
				</nav>
			</header>
			<nav className="mobile-nav">
				<ul className="mobile-nav__items">
					<li className="mobile-nav__item">
						<Link href="/" style={{textDecoration: 'none'}}>
							<p className='mobile-nav__link' onClick={() => closeMobileNav()}>Home</p>
						</Link>
					</li>
					<li className="mobile-nav__item">
						<Link href="/plans" style={{textDecoration: 'none'}}>
							<p className='mobile-nav__link' onClick={() => closeMobileNav()}>Plans</p>
						</Link>
					</li>
                    <li className="mobile-nav__item">
						<Link href="/about" style={{textDecoration: 'none'}}>
							<p className='mobile-nav__link' onClick={() => closeMobileNav()}>About Us</p>
						</Link>
					</li>
                    <li className="mobile-nav__item">
						<Link href="/contact" style={{textDecoration: 'none'}}>
							<p className='mobile-nav__link' onClick={() => closeMobileNav()}>Contact Us</p>
						</Link>
					</li>
				</ul>
			</nav>

			<main className="app">
				<Component {...pageProps} />
			</main>
			<style jsx>{`
				body {

					margin: 0;
					padding: 0;
				}

				main {
					position: absolute;
					top: 0;
					bottom: 0;
					right: 0;
					width: 100vw;
					overflow: hidden;
					font-family: 'Source Sans Pro', sans-serif;
				}

                
				
				.backdrop {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
					visibility: hidden;
					transition: opacity .35s, visibility .5s;
					overflow: hidden;
					background: black;
					z-index: 5;
				}

				.opacity {
					opacity: 0.5;
				}
				
				.main-header {
					position: fixed;
					height: 3.5rem;
					width: 100vw;
					font-family: 'Source Sans Pro', sans-serif;
					font-weight: 500;
					top: 0;
					left: 0;
					background: #131F47;
					z-index: 10;
					padding: 0.5rem 1rem;
					display: flex;
					
				}
				
				.toggle-button {
					cursor: pointer;
					width: 50px;
					height: 50px;
					display: block;
					border: 2px solid #cecece;
					border-radius: 5px;
					padding: 0 5px;
					margin: 0.25rem 0;
					background: transparent;
					// background: linear-gradient(
					// 	to bottom, 
					// 	#edf2f4, #edf2f4 20%, 
					// 	#124559 20%, #124559 40%, 
					// 	#edf2f4 40%, #edf2f4 60%, 
					// 	#124559 60%, #124559 80%, 
					// 	#edf2f4 80%, #edf2f4 100%
					// );
				}

				.toggle-button__bar {
					width: 100%;
					height: 5px;
					background: #cecece;
					display: block;
					margin: 10px 0;
				}

				.bar-top {
					margin-top: 7px;
				}

				.bar-bottom {
					margin-bottom: 7px;
				}

				.toggle-button .mobile-nav {
					transition: 0.5s;
				}
				
				.toggle-button:focus {
					outline: none;
				}
				
				.main-nav {
					display: none;
				}
				
				.main-nav__items {
					margin: 0;
					padding: 0;
					list-style: none;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					flex-direction: row;
				}
				
				.main-nav__item {
					margin: 0 1rem;
				}

				.main-nav__link {
					color: #eaeaea;
					font-size: 1.125rem;
				}
				
				.main-nav__item a,
				.mobile-nav__item a {
					text-decoration: none;
					// color: #edf2f4;
					font-weight: bold;
					padding: 0.2rem 0;
				}
				
				.main-nav__item a:hover,
				.main-nav__item a:active {
					color: white;
					border-bottom: 5px solid white;
				}
				
				.main-nav__item--cta a,
				.mobile-nav__item--cta a {
					color: white;
					background: #ff1b68;
					padding: 0.5rem 1rem;
					border-radius: 8px;
				}
				
				.main-nav__item--cta a:hover,
				.main-nav__item--cta a:active,
				.mobile-nav__item--cta a:hover,
				.mobile-nav__item--cta a:active {
					color: #ff1b68;
					background: white;
					border: none;
				}
				
				@media (min-width: 40rem) {
					@media(min-height: 31rem) {
						.toggle-button {
							display: none;
						}
						
						.main-nav {
							display: flex;
						}

                        .main-header {
                            height: 2.5rem;
                        }
					}
				}

				.mobile-nav {
					visibility: hidden;
					position: fixed;
					font-family: 'Source Sans Pro', sans-serif;
					z-index: 101;
					top: 0;
					left: -350px;
					background: #124559;
					width: 300px;
					height: 100vh;
					transition: 0.5s;
				}
				
				.mobile-nav__items {
					width: 90%;
					height: 100%;
					list-style: none;
					margin: 0 auto;
					padding: 0;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}
				
				.mobile-nav__item {
					margin: 1rem 0;
					height: 3rem;
				}

				.mobile-nav__link {
					color: white;
					font-size: 1.5rem;
				}

				.open {
					visibility: visible;
					left: 0;
				}
        	`}</style>
		</>
  );
}

export default CustomApp;
