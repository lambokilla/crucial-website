import { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import '../public/fonts/style.css';
import '../styles/globals.css';


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
				<title>Crucial Web Solutions</title>
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
							<Link href="/#" style={{ textDecoration: 'none' }}>
								<p className='main-nav__link'>Home</p>
							</Link>
						</li>
						<li className="main-nav__item">
							<Link href="/about#" style={{ textDecoration: 'none' }}>
								<p className='main-nav__link'>About Us</p>
							</Link>
						</li>
						<li className="main-nav__item">
							<Link href="/services#" style={{ textDecoration: 'none' }}>
								<p className='main-nav__link'>Services</p>
							</Link>
						</li>
						{/* <li className="main-nav__item">
							<Link href="/portfolio" style={{ textDecoration: 'none' }}>
								<p className='main-nav__link'>Portfolio</p>
							</Link>
						</li> */}
						<li className="main-nav__item">
							<Link href="/contact#" style={{ textDecoration: 'none' }}>
								<p className='main-nav__link'>Contact Us</p>
							</Link>
						</li>
					</ul>
				</nav>
				<div className="logo">
					<Image
						src="https://crucialwebsitestack-imagebucket6194e37c-105gw6s2x4ta3.s3.us-east-1.amazonaws.com/logoC.svg"
						alt="logo"
						height={40}
						width={40}
					/>
				</div>
			</header>
			<nav className="mobile-nav">
				<ul className="mobile-nav__items">
					<li className="mobile-nav__item">
						<Link href="/#" style={{ textDecoration: 'none' }}>
							<p className='mobile-nav__link' onClick={() => closeMobileNav()}>Home</p>
						</Link>
					</li>
					<li className="mobile-nav__item">
						<Link href="/about#" style={{ textDecoration: 'none' }}>
							<p className='mobile-nav__link' onClick={() => closeMobileNav()}>About Us</p>
						</Link>
					</li>
					<li className="mobile-nav__item">
						<Link href="/services#" style={{ textDecoration: 'none' }}>
							<p className='mobile-nav__link' onClick={() => closeMobileNav()}>Services</p>
						</Link>
					</li>
					{/* <li className="mobile-nav__item">
						<Link href="/portfolio" style={{ textDecoration: 'none' }}>
							<p className='mobile-nav__link' onClick={() => closeMobileNav()}>Portfolio</p>
						</Link>
					</li> */}
				</ul>
				<div className="flex-end">
					<button className="contact-btn" onClick={() => closeMobileNav()}>
						<Link href="/contact#" style={{ textDecoration: 'none' }}>
							<p className="contact-btn-text">Contact Us</p>
						</Link>
					</button>
				</div>
			</nav>

			<main className="app">
				<Component {...pageProps} />
			</main>
			<style jsx>{`
				
        	`}</style>
		</>
	);
}

export default CustomApp;
