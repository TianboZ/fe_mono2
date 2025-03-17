import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const CLIENT_KEY = "6LcD4PYqAAAAAKwGW58zPGVXDmBDy0f8Nvo3AIRq";
const SERVER_KEY = "6LcD4PYqAAAAAJDNHawTM0oQGhrnzM2ItJgijjHR";

const Captcah = ({ sitekey, cb }) => {
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  const captchaRef = useRef<HTMLDivElement | null>(null);

  const onRecaptchaLoad = () => {
    console.log("captcha script loaded");
    setIsRecaptchaLoaded(true);
    if (window.grecaptcha?.render) {
      window.grecaptcha.render(captchaRef.current, {
        sitekey,
        callback: cb,
      });
    }
  };

  useEffect(() => {
    window.onRecaptchaLoad = onRecaptchaLoad;
    if (!window.grecaptcha) {
      const script = document.createElement("script");
      script.src =
        "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.onload = () => {
        setIsRecaptchaLoaded(true);
      };
    } else if (window.grecaptcha && window.grecaptcha.render) {
      setIsRecaptchaLoaded(true);
    }

    return () => {
      window.onRecaptchaLoad = null;
    };
  }, []);

  return <div ref={captchaRef}></div>;
};

const App = () => {
  const [token, setToken] = useState("");
  const [isValid, setIsValid] = useState(false);

  const cb = (token) => {
    console.log("token", token);
    setToken(token);
  };

  const handleSubmit = () => {
    axios.post("http://127.0.0.1:3001/api/verify", { token }).then((res) => {
      console.log(res);
      if (res.data.isValid) {
        setIsValid(true);
      }
    });
  };

  return (
    <div>
      <button disabled={!token} onClick={handleSubmit}>
        submit
      </button>
      <div>{token}</div>
      <Captcah sitekey={CLIENT_KEY} cb={cb} />
      <div>{JSON.stringify(isValid)}</div>
    </div>
  );
};

export default App;

/*

References:
https://www.youtube.com/watch?v=_JnaVeXIYEc

https://developers.google.com/recaptcha/docs/display
https://developers.google.com/recaptcha/docs/verify


*/
