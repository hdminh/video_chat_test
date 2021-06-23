import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import logo from '../../../assets/images/img.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import Validator from '../../../utils/validator';
import LoginFB from '../../../components/Sign/LoginFB/loginFB';
import LoginGG from '../../../components/Sign/LoginGG/loginGG';
import 'react-bootstrap';
import './login.css';
import '../../../assets/css/main.css';
import LoadingSVG from '../../../assets/images/Rolling-1s-35px.svg';


class Login extends Component {
	constructor(props) {
		super(props);

		let loggedIn = true
		// if (token == null) {
		//     loggedIn = false
		// }

		this.state = {
			username: '',
			password: '',
			loading: false,
			loggedIn,
			errors: {}
		}

		const rules = [
			{
				field: 'username',
				method: 'isEmpty',
				validWhen: false,
				message: 'The email field is required.',
			},
			{
				field: 'username',
				method: 'isEmail',
				validWhen: true,
				message: 'The email must be a valid email address.',
			},
			{
				field: 'password',
				method: 'isEmpty',
				validWhen: false,
				message: 'The password field is required.',
			},
		];
		this.validator = new Validator(rules);

		this.onChange = this.onChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) => {
		let isFormValid = true;
		let check = this.validator.validate(this.state);
		this.setState({
			errors: check
		});
		// console.log(Object.values(check).length);

		if (Object.values(check).length === 0) {
			isFormValid = false;
		}
		return isFormValid;
	};

	submitForm() {
		if (!this.handleSubmit()) {
			this.setState({
				loading: true
			})
			const data = {
				username: this.state.username,
				password: this.state.password
			}
			const login = async () => {
				await Axios.post('https://togetherapis.herokuapp.com/api/v1/auth/login', data)
					.then((response) => {
						if (response.status === 200) {
							let result = response.data;
							localStorage.setItem("token", result.data.token);
							localStorage.setItem("userid", result.data.userid);
							this.setState({
								loggedIn: true
							})
						} else if (response.status >= 401) {
							this.setState({
								loading: false,
								loggedIn: false
							})
						}
					})
					.catch((error) => {
						this.setState({
							loading: false,
							loggedIn: false
						})
					});
			}
			login();
		} else {

		}
	}

	render() {
		if (localStorage.getItem("token")) {
			return <Redirect to="/" />
		}
		const { errors } = this.state;
		return (
			<div className="limiter">
				<div className="container-login100">
					<div className="wrap-login100">
						<div className="login100-pic js-tilt" data-tilt>
							<img src={logo} alt="Logo" />
						</div>
						<div className="login100-form validate-form">
							<span className="login100-form-title">
								Member Login
							</span>
							{this.state.loggedIn === false
								? <div className="validation" style={{ color: 'red' }}>Username or password is incorrect</div>
								: null
							}
							{errors.username && <div className="validation" style={{ display: 'block' }}>{errors.username}</div>}
							<div className="wrap-input100 validate-input">
								<input className="input100" type="text" name="username" value={this.state.username} onChange={this.onChange} placeholder="Email" />
								<span className="focus-input100"></span>
								<span className="symbol-input100">
									<FontAwesomeIcon icon="envelope" />
								</span>
							</div>

							{errors.password && <div className="validation" style={{ display: 'block' }}>{errors.password}</div>}
							<div className="wrap-input100 validate-input">
								<input className="input100" type="password" name="password" value={this.state.password} onChange={this.onChange} placeholder="Password" />
								<span className="focus-input100"></span>
								<span className="symbol-input100">
									<FontAwesomeIcon icon="lock" />
								</span>
							</div>

							<div className="container-login100-form-btn">
								<button className="login100-form-btn" onClick={this.submitForm}>
									{this.state.loading === false ? <div>LOGIN</div> : <img src={LoadingSVG} alt />}
									{/* Login */}
								</button>
							</div>

							<div className="text-center" style={{ paddingTop: 12 }}>
								<span className="txt1">
									Forgot
								</span>
								<a className="txt2" href="#">
									Username / Password?
								</a>
							</div>

							<div className="text-center">
								<Link className="txt2" to="/register">
									Create your Account
								<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
								</Link>
							</div>
							<div className="container-login100-form-btn">
								{/* <button type="button" className="login50-facebook" >
								Login facebook
							</button> */}
								<LoginFB />
								<LoginGG />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Login;
