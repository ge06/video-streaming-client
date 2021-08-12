import { useState, useContext, React } from "react";
import "../css/AuthPage.css";
import FormItem from "../components/FormItem";
import userIcon from "../assets/raw-items/user.svg"
import google from "../assets/raw-items/google.svg"
import twitter from "../assets/raw-items/twitter.svg"
import facebook from "../assets/raw-items/facebook.svg"
import Button from "../components/Button";
import axios from 'axios'
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function AuthCard() {

    const history = useHistory()

    const [isAuth, setIsAuth] = useState(false);
    const [toggleState, setToggleState] = useState(1);
    const [loginError, setLoginError] = useState(false)
    const [registerError, setRegisterError] = useState({ 'error': '', 'message': '' })
    const [notifyOpen, setNotifyOpen] = useState(false);

    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotifyOpen(false);
    };

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const googleAuth = () => {
        if (toggleState === 1) {
            console.log("google ile giriş")
        }
        else {
            console.log("google ile kayıt")
        }
    }

    const twitterAuth = () => {
        if (toggleState === 1) {
            console.log("twitter ile giriş")
        }
        else {
            console.log("twitter ile kayıt")
        }
    }
    const facebookAuth = () => {
        if (toggleState === 1) {
            console.log("facebook ile giriş")
        }
        else {
            console.log("facebook ile kayıt")
        }
    }

    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const [registerFullname, setRegisterFullname] = useState('')
    const [registerUsername, setRegisterUsername] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [registerCheckpassword, setRegisterCheckpassword] = useState('')



    const handleLogin = (e) => {
        e.preventDefault();
        const data = { loginUsername, loginPassword }

        axios.post('http://localhost:4000/login', data, { withCredentials: true })
            .then(response => {
                user.setUsername(response.data.userName);
                setIsAuth(true)
                history.push("/");
            })
            .catch((error) => {
                setLoginError(true)
                setNotifyOpen(true);
            });

    }


    const user = useContext(UserContext)
    const handleRegister = async (e) => {

        e.preventDefault();
        if (registerPassword.length < 8) {
            setNotifyOpen(true);
            setRegisterError({ 'error': 'password', 'message': 'Şifre en az 8 karakterden oluşmalı' })
            return;
        }

        if (registerPassword !== registerCheckpassword) {
            setNotifyOpen(true);
            setRegisterError({ 'error': 'checkPassword', 'message': 'Şifreler uyuşmalı' })
            return;
        }

        const data = { registerFullname, registerUsername, registerEmail, registerPassword }
        axios.post('http://localhost:4000/register', data, { withCredentials: true })
            .then(response => {
                user.setUsername(response.data.userName);
                setIsAuth(true)
                history.push("/");
            })
            .catch((error) => {
                setLoginError(true)
                setNotifyOpen(true);
                const errorSource = error.response.data
                if (errorSource === 'email') {
                    setRegisterError({ 'error': 'email', 'message': 'E-posta adresi kullanılıyor!' })
                }
                else {
                    setRegisterError({ 'error': 'username', 'message': 'Kullanıcı adı kullanılıyor' })
                }
            });
    }




    return (
        <div className="container">

            <div className="bloc-tabs">
                <button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>
                    Giriş Yap
                </button>
                <button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>
                    Kayıt Ol
                </button>
            </div>

            <div className="content-tabs">
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                    <form className="active-content" action="">
                        <div className="form-group">
                            <FormItem className="form-item" icon={userIcon} type="text" input_field="Kullanıcı Adı" value={loginUsername} setValue={setLoginUsername} required={true} />
                            <FormItem className="form-item" icon={userIcon} type="password" input_field="Şifre" value={loginPassword} setValue={setLoginPassword} required={true} />
                        </div>
                        <Button content="Giriş Yap" onClick={(e) => handleLogin(e)} />
                    </form>
                    <a style={{ textDecoration: 'none', marginTop: '20px' }} href="/">Şifremi unuttum</a>
                    {loginError &&
                        <Snackbar open={notifyOpen} autoHideDuration={6000} onClose={handleClose}>
                            <MuiAlert onClose={handleClose} severity="error">
                                Hatalı Kullanıcı Adı veya Şifre
                            </MuiAlert>
                        </Snackbar>
                    }
                </div>

                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                    <form className="active-content" action="">
                        <div className="form-group">
                            <FormItem className="form-item" icon={userIcon} type="text" input_field="Ad-Soyad" value={registerFullname} setValue={setRegisterFullname} required={true} />
                            <FormItem className="form-item" icon={userIcon} type="text" input_field="Kullanıcı Adı" value={registerUsername} setValue={setRegisterUsername} required={true} />
                            <FormItem className="form-item" icon={userIcon} type="text" input_field="E-Posta" value={registerEmail} setValue={setRegisterEmail} required={true} />
                            <FormItem className="form-item" icon={userIcon} type="password" input_field="Şifre" value={registerPassword} setValue={setRegisterPassword} required={true} />

                            <FormItem className="form-item" icon={userIcon} type="password" input_field="Şifre Tekrar" value={registerCheckpassword} setValue={setRegisterCheckpassword} required={true} />
                            {registerError &&
                                <Snackbar open={notifyOpen} autoHideDuration={6000} onClose={handleClose}>
                                    <MuiAlert onClose={handleClose} severity="error">
                                        {registerError.message}
                                    </MuiAlert>
                                </Snackbar>
                            }
                        </div>
                        <Button content="Kayıt Ol" onClick={(e) => handleRegister(e)} />
                    </form>
                </div>
            </div>

            <div className="social-media-auth">
                <h6>ya da</h6>
                <hr style={{ margin: "10px 100px 10px 100px", borderColor: "#000034" }} />
                <div className="social-button-group">
                    <img className="social-button" src={google} alt="google" onClick={googleAuth} />
                    <img className="social-button" src={twitter} alt="twitter" onClick={twitterAuth} />
                    <img className="social-button" src={facebook} alt="facebook" onClick={facebookAuth} />
                </div>
            </div>
        </div>
    );
}

export default AuthCard;