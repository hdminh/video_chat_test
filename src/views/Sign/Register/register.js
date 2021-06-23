import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Validator from '../../../utils/validator';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/img.png';
import Axios from 'axios';
import Swal from 'sweetalert2';


export default class register extends Component {
	constructor(props) {
		super(props);

		let loggedIn = true;

		this.state = {
			first_name: '',
			last_name: '',
			username: '',
			password: '',
			confirm_password: '',
			loggedIn,
			message: '',
			redirect: null,
			errors: {}
		}

		const rules = [
			{
				field: 'first_name',
				method: 'isEmpty',
				validWhen: false,
				message: 'First name field is required.',
			},
			{
				field: 'last_name',
				method: 'isEmpty',
				validWhen: false,
				message: 'Last name field is required.',
			},
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
			{
				field: 'confirm_password',
				method: 'isEmpty',
				validWhen: false,
				message: 'The confirm password field is required.',
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

		if (Object.values(check).length == 0) {
			isFormValid = false;
		}
		return isFormValid;
	};

	submitForm() {
		if (!this.handleSubmit()) {
			const data = {
				firstname: this.state.first_name,
				lastname: this.state.last_name,
				username: this.state.username,
				password: this.state.password,
				confirmpassword: this.state.confirm_password,
			}
			// Check password = confirmpassword
			if (data.password === data.confirmpassword) {
				const signup = async () => {
					await Axios.post('https://togetherapis.herokuapp.com/api/v1/auth/register', data)
						.then((response) => {
							console.log(response)
							// Status = 201 -> register successful
							if (response.status === 201) {
								Swal.fire({
									position: 'center',
									icon: 'success',
									title: 'Register successfully',
									showConfirmButton: true,
									timer: 1500
								})
								this.setState({
									redirect: '/login'
								});
							}
						})
						.catch((error) => {
							let result = error.response;
							if (result.status === 409) {
								// Username exist
								this.setState({
									message: 'Username exist'
								});
							} else if (result.status === 400) {
								this.setState({
									message: 'Password must be character and number!'
								});
							}
						});
				}
				signup();
			} else {
				this.setState({
					message: 'Confirm password must be password!'
				});
			}
		} else {
			this.setState({
				message: 'Please fill out all information!'
			});
		}
	}
	render() {
		const { errors } = this.state;
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
		} else {
			return (
				<div className="limiter">
					<div className="container-login100">
						<div className="wrap-login100">
							<div className="login100-pic js-tilt" data-tilt>
								<img src={logo} alt="Logo" />
							</div>
							<div className="login100-form validate-form">
								<span className="login100-form-title">
									CREATE ACCOUNT
							</span>
								{this.state.message != ''
									? <div className="validation" style={{ color: 'red' }}>{this.state.message}</div>
									: null
								}
								{errors.first_name && <div className="validation" style={{ display: 'block' }, { color: 'red' }}>{errors.first_name}</div>}
								<div className="wrap-input100 validate-input">
									<input className="input100" type="text" name="first_name" value={this.state.first_name} onChange={this.onChange} placeholder="First name" />
									<span className="focus-input100"></span>
									<span className="symbol-input100">
										<FontAwesomeIcon icon="envelope" />
									</span>
								</div>
								{errors.last_name && <div className="validation" style={{ display: 'block' }, { color: 'red' }}>{errors.last_name}</div>}
								<div className="wrap-input100 validate-input">
									<input className="input100" type="text" name="last_name" value={this.state.last_name} onChange={this.onChange} placeholder="Last name" />
									<span className="focus-input100"></span>
									<span className="symbol-input100">
										<FontAwesomeIcon icon="envelope" />
									</span>
								</div>
								{errors.username && <div className="validation" style={{ display: 'block' }, { color: 'red' }}>{errors.username}</div>}
								<div className="wrap-input100 validate-input">
									<input className="input100" type="text" name="username" value={this.state.username} onChange={this.onChange} placeholder="Email" />
									<span className="focus-input100"></span>
									<span className="symbol-input100">
										<FontAwesomeIcon icon="envelope" />
									</span>
								</div>

								{errors.password && <div className="validation" style={{ display: 'block' }, { color: 'red' }}>{errors.password}</div>}
								<div className="wrap-input100 validate-input">
									<input className="input100" type="password" name="password" value={this.state.password} onChange={this.onChange} placeholder="Password" />
									<span className="focus-input100"></span>
									<span className="symbol-input100">
										<FontAwesomeIcon icon="lock" />
									</span>
								</div>
								{errors.confirm_password && <div className="validation" style={{ display: 'block' }, { color: 'red' }}>{errors.confirm_password}</div>}
								<div className="wrap-input100 validate-input">
									<input className="input100" type="password" name="confirm_password" value={this.state.confirm_password} onChange={this.onChange} placeholder=" Confirm password" />
									<span className="focus-input100"></span>
									<span className="symbol-input100">
										<FontAwesomeIcon icon="lock" />
									</span>
								</div>

								<div className="container-login100-form-btn">
									<button className="login100-form-btn" onClick={this.submitForm}>
										Sign up
							</button>
								</div>

								<div className="text-center" style={{ paddingTop: 12 }}>
									<span className="txt1">
										Have already an account ?
								</span>
									<Link className="txt2" to="/login">
										Login here
								</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}

	}
}
