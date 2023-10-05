import styles from '@/styles/Contact.module.css';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import dynamic from 'next/dynamic';
import { httpClient } from '@iyio/common';
import Link from 'next/link';

const Footer = dynamic(() => import('./components/Footer'), { ssr: false });

export function Contact() {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [description, setDescription] = useState("");
    const [phoneError, setPhoneError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [error, setError] = useState("");
    const [status, setStatus] = useState("");
    const [captchaConfirm, setCaptchaConfirm] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const modal = useRef(null);

    const submit = useCallback(async(e: FormEvent) => {
        e.preventDefault();
        let errors = false;

        setNameError(false);
        setPhoneError(false);
        setEmailError(false);
        setDescriptionError(false);

        // if (!captchaConfirm) {
        //     setError("Confirm Captcha to continue");
        //     errors = true;
        // }

        if (!name) {
            setNameError(true);
            errors = true;
        }
        if (!description) {
            setDescriptionError(true);
            errors = true;
        }
        if (!email) {
            setEmailError(true);
            errors = true;
        } else {
            const emailDomain = email.substring(email.indexOf('@'));
            if (emailDomain.indexOf(".") === -1) {
                setEmailError(true);
                errors = true;
            }
        }

        if (errors) { 
            return;
        }

        const params: Upload = {
            method: "send",
            name: name,
            companyName: companyName,
            email: email,
            phone: phone,
            description: description
        }

        console.log(modal);

        const response: Result = await httpClient().postAsync("https://wwhae2muntrb6wseyxdahiu3mm0nnlcl.lambda-url.us-east-1.on.aws/", params);

        if (response.error) {
            setError(response.message);
            setStatus("Error");
        } else {
            const backdrop = document.querySelector(".backdrop");
            modal.current.classList.add(styles.modal);
		    backdrop?.classList.add("open");
            backdrop?.classList.add("opacity");
            modal.current.showModal();
        }


    }, [captchaConfirm, companyName, description, email, name, phone]);

    const closeModal = () => {
        const backdrop = document.querySelector(".backdrop");
        backdrop?.classList.remove("open");
		backdrop?.classList.remove("opacity");
    }

    const onCaptchaConfirm = () => {
        setCaptchaConfirm(!captchaConfirm);
    }

    useEffect(() => {
        if (description) {
            setDescriptionError(false);
        }
        if (name) {
            setNameError(false);
        }
    }, [description, name]);

    const handlePhoneBlur = (event) => {
        if (event.target.validity.patternMismatch) {
            setPhoneError(true); 
        } else {
            setPhoneError(false);
        }
    };

    const handleEmailBlur = (event) => {
        if (event.target.validity.patternMismatch) {
            setEmailError(true); 
        } else {
            setEmailError(false);
        }
    };

    function style(err) {
        if (err) {
            return {
                outline: "2px solid red",
                outlineOffset: "2px"
            };
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.backdrop}></div>
            <dialog ref={modal} id="modal">
                <p className={styles.pText}>Sent! We will get back to you shortly.</p>
                <Link href="/" style={{ textDecoration: 'none', outline: "none" }} onClick={() => closeModal()}>
                    <p className={styles.btnHome}>Home</p>
                </Link>
            </dialog>
            <form onSubmit={submit}>
                <section className={styles.page}>
                    <h1 className={styles.h1Text}>Lets Connect</h1>
                    {error && <h2 className={styles.error}>{error}</h2>}
                    {status && <h2>{status}</h2>}
                    <div className={styles.labelAsterisk}>
                        <label htmlFor="name">Name&nbsp;</label>
                        <p className={styles.asterisk}>*</p>
                    </div>
                    {nameError &&
                        <p style={{margin: "0", padding: "0", paddingBottom: "10px"}} className={styles.error}>Name is required</p>
                    }
                    <input
                        className={styles.input}
                        type='text'
                        name='name'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        style={style(nameError)}
                    />
                    <label className={styles.label} htmlFor='company name'>Company Name</label>
                    <input
                        className={styles.input}
                        type='text'
                        name='company name'
                        onChange={(e) => setCompanyName(e.target.value)}
                        value={companyName}
                    />
                    <div className={styles.labelAsterisk}>
                        <label htmlFor='email'>Email&nbsp;</label>
                        <p className={styles.asterisk}>*</p>
                    </div>
                    {emailError &&
                        <p style={{margin: "0", padding: "0", paddingBottom: "10px"}} className={styles.error}>Email is invalid</p>
                    }
                    <input
                        className={styles.input}
                        type='email'
                        inputMode='email'
                        name='email'
                        onBlur={handleEmailBlur} 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        pattern="[A-Za-z\W+]*@{1}[A-Za-z\W+]*"
                        style={style(emailError)}
                    />
                    <div className={styles.label}>
                        <label htmlFor='phone'>Phone Number</label>
                    </div>
                    {phoneError &&
                        <p style={{margin: "0", padding: "0", paddingBottom: "10px"}} className={styles.error}>Phone number invalid</p>
                    }
                    <input
                        className={styles.input}
                        type="tel"
                        inputMode='decimal'
                        name='phone'
                        onBlur={handlePhoneBlur} 
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        pattern="[+]{0,1}[0-9]{3,5}-{0,1}[0-9]{3}-{0,1}[0-9]{4}"
                        style={style(phoneError)}
                    />
                    <div className={styles.label}>
                        <label htmlFor='description'>What can we help you with?&nbsp;</label>
                        <p className={styles.asterisk}>*</p>
                    </div>
                    {descriptionError &&
                        <p style={{margin: "0", padding: "0", paddingBottom: "10px"}} className={styles.error}>Describe how we can help you</p>
                    }
                    <textarea
                        className={styles.textarea}
                        name='description'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        style={style(descriptionError)}
                    />
                    <ReCAPTCHA
                        sitekey="6Lfr5QcoAAAAAFKvmZ803k_5TCVVotvxW2VyVnun"
                        onChange={onCaptchaConfirm}
                        className={styles.captcha}
                    />
                    <div className={styles.flexEnd}>
                        <button className={styles.btn} type='submit'>Submit</button>
                    </div>
                </section>
            </form>
            <Footer />
        </div>
    )
}

export default Contact;

interface Upload {
    method: string;
    name: string;
    companyName?: string;
    email: string;
    phone?: string;
    description: string;
}

interface Result {
    error: boolean;
    message?: string;
}