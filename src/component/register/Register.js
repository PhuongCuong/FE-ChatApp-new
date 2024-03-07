import React, { useState } from 'react';
import './Register.scss'
import { Box, Button, Container, FormHelperText, InputBase } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { registerService, test } from '../../services/userServices';
import { toast } from 'react-toastify';
import { validateEmail, validatePhoneNumber, validatePassword } from '../../validate/ValidateData';


const Register = () => {

    const defaultShowPass = {
        createPass: false,
        confirmPass: false
    }

    const defaultData = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmpassword: ''
    }

    const defaultValidate = {
        isvalfirstName: true,
        isvallastName: true,
        isvalphoneNumber: true,
        isvalemail: true,
        isvalpassword: true,
        isvalconfirmpassword: true
    }

    const [userdata, setuserdata] = useState(defaultData);

    const [showPassword, setshowPassword] = useState(defaultShowPass);

    const [userValid, setuserValid] = useState(defaultValidate);

    const navigate = useNavigate();

    const handleShowPassword = (id) => {
        let _defaultshowPass = _.cloneDeep(showPassword)
        _defaultshowPass[id] = !_defaultshowPass[id]
        setshowPassword(_defaultshowPass)
    }

    const toformLogin = () => {
        navigate("/login")
    }

    const handleOnChange = (e, id) => {
        let _userdata = _.cloneDeep(userdata);
        _userdata[id] = e.target.value;
        setuserdata(_userdata);
    }

    const handleRegister = async () => {
        let check = handleValidate();
        if (check) {
            let res = await registerService(userdata);
            if (res && res.EC === 0) {
                setuserdata(defaultData)
                toast.success(res.EM)
            } else {
                toast.error(res.EM)
            }
        }


    }

    const handleValidate = () => {
        setuserValid(defaultValidate)
        let check = true;
        if (!userdata.firstName) {
            setuserValid(prevState => ({ ...prevState, isvalfirstName: false }));
            check = false
        }
        if (!userdata.lastName) {
            setuserValid(prevState => ({ ...prevState, isvallastName: false }));
            check = false
        }
        if (!userdata.email) {
            setuserValid(prevState => ({ ...prevState, isvalemail: false }));
            check = false
        } else {
            if (validateEmail(userdata.email) !== true) {
                setuserValid(prevState => ({ ...prevState, isvalemail: false }));
                check = false
            }
        }
        if (!userdata.phoneNumber) {
            setuserValid(prevState => ({ ...prevState, isvalphoneNumber: false }));
            check = false
        } else {
            if (validatePhoneNumber(userdata.phoneNumber) !== true) {
                setuserValid(prevState => ({ ...prevState, isvalphoneNumber: false }));
                check = false
            }
        }
        if (!userdata.password) {
            setuserValid(prevState => ({ ...prevState, isvalpassword: false }));
            check = false
        } else {
            if (validatePassword(userdata.password) !== true) {
                setuserValid(prevState => ({ ...prevState, isvalpassword: false }));
                check = false
            }
        }
        if (!userdata.confirmpassword) {
            setuserValid(prevState => ({ ...prevState, isvalconfirmpassword: false }));
            check = false
        } else {
            if (userdata.password !== userdata.confirmpassword) {
                setuserValid(prevState => ({ ...prevState, isvalconfirmpassword: false }));
                check = false
            }
        }

        return check

    }


    return (
        <Box className="register-container">
            <Container>
                <Box className="register-body">

                    <Box className="register-content">
                        <Box className="register-title">
                            <h2>Signup</h2>
                        </Box>
                        <Box className="register-input">
                            <InputBase className='input-base'
                                placeholder='First name'
                                value={userdata.firstName}
                                onChange={(e) => handleOnChange(e, 'firstName')}
                            />

                            {
                                !userValid.isvalfirstName &&
                                <FormHelperText className="component-error-text">
                                    first name is not empty
                                </FormHelperText>

                            }
                            <InputBase className='input-base'
                                placeholder='Last name'
                                value={userdata.lastName}
                                onChange={(e) => handleOnChange(e, 'lastName')}
                            />
                            {
                                !userValid.isvallastName &&
                                <FormHelperText className="component-error-text">
                                    last name is not empty
                                </FormHelperText>

                            }
                            <InputBase className='input-base'
                                placeholder='Email'
                                value={userdata.email}
                                onChange={(e) => handleOnChange(e, 'email')}

                            />
                            {
                                !userValid.isvalemail &&
                                <FormHelperText className="component-error-text">
                                    email is not empty or is not valid
                                </FormHelperText>
                            }

                            <InputBase className='input-base'
                                placeholder='Phone number'
                                value={userdata.phoneNumber}
                                onChange={(e) => handleOnChange(e, 'phoneNumber')}

                            />
                            {
                                !userValid.isvalphoneNumber &&
                                <FormHelperText className="component-error-text">
                                    phone number is not empty or is not valid
                                </FormHelperText>
                            }

                            <Box className="input-and-icon">
                                <InputBase className='input-base'
                                    placeholder='Create password'
                                    type={showPassword && showPassword.createPass ? 'text' : 'password'}
                                    value={userdata.password}
                                    onChange={(e) => handleOnChange(e, 'password')}

                                />
                                {
                                    !userValid.isvalpassword &&
                                    <FormHelperText className="component-error-text">
                                        password is not empty or is not valid
                                    </FormHelperText>
                                }

                                {
                                    showPassword.createPass ?
                                        <VisibilityIcon className='icon-password'
                                            onClick={() => handleShowPassword('createPass')}
                                        />
                                        :
                                        <VisibilityOffIcon className='icon-password'
                                            onClick={() => handleShowPassword('createPass')}

                                        />
                                }
                            </Box>
                            <Box className="input-and-icon">
                                <InputBase className='input-base'
                                    placeholder='Confirm password'
                                    type={showPassword && showPassword.confirmPass ? 'text' : 'password'}
                                    value={userdata.confirmpassword}
                                    onChange={(e) => handleOnChange(e, 'confirmpassword')}

                                />
                                {
                                    !userValid.isvalconfirmpassword &&
                                    <FormHelperText className="component-error-text">
                                        confirm password is not empty or is not valid
                                    </FormHelperText>
                                }

                                {
                                    showPassword.confirmPass ?
                                        <VisibilityIcon className='icon-password'
                                            onClick={() => handleShowPassword('confirmPass')}
                                        />
                                        :
                                        <VisibilityOffIcon className='icon-password'
                                            onClick={() => handleShowPassword('confirmPass')}

                                        />
                                }
                            </Box>
                        </Box>

                        <Box className="register-btn">
                            <Button className='btn-register' variant='contained'
                                onClick={() => handleRegister()}
                            >Register</Button>
                        </Box>
                        <Box className="register-signup">
                            <span className='text-title-signup'>
                                Already have an account?
                                <span className='text-signup'
                                    onClick={() => toformLogin()}
                                > Login</span>
                            </span>
                        </Box>
                        <Box className="text-or">
                            <span className='text-or-parent'>
                                <span className='text-or-child'>Or</span>
                            </span>
                        </Box>
                        <Box className="register-network">
                            <Button className='btn-register-facebook' variant='contained'>
                                <div className='logo-facebook'></div>
                                <span className='text-facebook'>Register with FaceBook</span>
                            </Button>
                            <Button className='btn-register-google' variant='contained'>
                                <div className='logo-google'></div>
                                <span className='text-google'>Register with Google</span>
                            </Button>

                        </Box>
                    </Box>
                </Box>

            </Container>

        </Box>

    );
};

export default Register;