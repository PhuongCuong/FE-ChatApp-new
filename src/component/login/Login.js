import React, { useState } from 'react';
import './Login.scss'
import { Box, Button, Container, FormHelperText, InputBase } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../validate/ValidateData';
import { loginService } from '../../services/userServices';
import { toast } from 'react-toastify';

const Login = () => {

    const [showPassword, setshowPassword] = useState(false);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const defaultValid = {
        isvalidemail: true,
        isvalidpassword: true
    }

    const [userValid, setuserValid] = useState(defaultValid)

    const navigate = useNavigate();

    const handleShowPassword = () => {
        setshowPassword(!showPassword)
    }

    const toformRegister = () => {
        navigate('/register')
    }

    const handleValid = () => {
        setuserValid(defaultValid);
        let isValid = true;
        if (!email) {
            setuserValid(prevState => ({ ...prevState, isvalidemail: false }));
            isValid = false
        } else {
            if (validateEmail(email) !== true) {
                setuserValid(prevState => ({ ...prevState, isvalidemail: false }));
                isValid = false
            }
        }
        if (!password) {
            setuserValid(prevState => ({ ...prevState, isvalidpassword: false }));
            isValid = false
        } else {
            if (validatePassword(password) !== true) {
                setuserValid(prevState => ({ ...prevState, isvalidpassword: false }));
                isValid = false
            }
        }

        return isValid
    }

    const handleLogin = async () => {
        let check = handleValid();
        if (check) {
            let res = await loginService({
                email: email,
                password: password
            })
            if (res && res.EC === 0) {
                navigate("/")
            } else {
                toast.error(res.EM)
            }
        }
    }

    return (
        <Box className="login-container">
            <Container>
                <Box className="login-body">
                    <Box className="login-content">
                        <Box className="login-title">
                            <h2>Login</h2>
                        </Box>
                        <Box className="login-input">
                            <InputBase className='input-base'
                                placeholder='Email'
                                onChange={(e) => setemail(e.target.value)}
                                value={email}
                            />
                            {
                                !userValid.isvalidemail &&
                                <FormHelperText className="component-error-text">
                                    email is not empty or is not valid
                                </FormHelperText>
                            }
                            <Box className="input-and-icon">
                                <InputBase className='input-base-password'
                                    placeholder='Password'
                                    type={showPassword ? "text" : 'password'}
                                    onChange={(e) => setpassword(e.target.value)}
                                    value={password}
                                />
                                {
                                    !userValid.isvalidpassword &&
                                    <FormHelperText className="component-error-text">
                                        password is not empty or is not valid
                                    </FormHelperText>

                                }
                                {
                                    showPassword ?
                                        <VisibilityIcon className='icon-password'
                                            onClick={() => handleShowPassword()}
                                        />
                                        :
                                        <VisibilityOffIcon className='icon-password'
                                            onClick={() => handleShowPassword()}

                                        />
                                }
                            </Box>


                        </Box>
                        <Box className="login-forgot-password">
                            <span className='text-forgot-password'>Forgot password?</span>
                        </Box>
                        <Box className="login-btn">
                            <Button className='btn-login' variant='contained'
                                onClick={() => handleLogin()}
                            >Login</Button>
                        </Box>
                        <Box className="login-signup">
                            <span className='text-title-signup'>
                                Don't have an account?
                                <span className='text-signup'
                                    onClick={() => toformRegister()}
                                > Signup</span>
                            </span>
                        </Box>
                        <Box className="text-or">
                            <span className='text-or-parent'>
                                <span className='text-or-child'>Or</span>
                            </span>
                        </Box>
                        <Box className="login-network">
                            <Button className='btn-login-facebook' variant='contained'>
                                <div className='logo-facebook'></div>
                                <span className='text-facebook'>Login with FaceBook</span>
                            </Button>
                            <Button className='btn-login-google' variant='contained'>
                                <div className='logo-google'></div>
                                <span className='text-google'>Login with Google</span>
                            </Button>

                        </Box>
                    </Box>
                </Box>

            </Container >

        </Box >

    );
};

export default Login;