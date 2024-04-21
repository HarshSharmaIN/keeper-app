import { ThemeProvider } from "@emotion/react";
import { Button, TextField, createTheme } from "@mui/material";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import style from "./pages.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
    palette: {
      yellow: {
        main: '#f5ba13',
        light: '#ffff45',
        dark: '#c38900',
        contrastText: '#fff',
      },
    },
});

function Signup() {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;
        
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_SERVER_API}/signup`,
                { email, password },
                { withCredentials: true }
            );

            if (data.success === true) {
                toast.success("Signed Up!", {
                    position: "bottom-right",
                });          
                navigate('/login');
            } else {
                toast.error("Error signing you up!", {
                    position: "bottom-right",
                });
            }
        } catch (error) {
            console.error("Signup error:", error);
            toast.error("Something went wrong!", {
                position: "bottom-right",
            });
        }
    }

    function login() {
        navigate('/login');
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={style.login}>
                <form onSubmit={handleSubmit} className={style.form}>
                    <h1>Sign Up</h1>
                    <TextField color="yellow" type="email" inputRef={emailInputRef} label="Email" variant="outlined" required/>
                    <TextField color="yellow" type="password" inputRef={passwordInputRef} label="Password" variant="outlined" required/>
                    <Button color="yellow" variant="outlined" type="submit" startIcon={<LoginIcon />} className={style.loginBtn}>Sign Up</Button>
                    <Button color="yellow" variant="contained" className={style.signupBtn} onClick={login}>Login</Button>
                </form>
            </div>
            <ToastContainer />
        </ThemeProvider>
    )
}

export default Signup;
