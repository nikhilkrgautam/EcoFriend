import React from "react";


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onChange(e) {
      const { name, value } = e.target
      this.setState({
          [name]: value
      });
  }

  handleSubmit(e) {
      e.preventDefault()


  }

  componentDidMount() {

  }

  render() {

    return (
      <div id="login">
          <h2>Login!</h2>
          <form onSubmit={this.handleSubmit} id="reg-form">
              <div className="">
                <input type="text" id="email" name="email" onChange={this.onChange} value={this.state.email} autoComplete="off" placeholder="Email" required />
              </div>
              <div className="">
                <input type="password" id="password" name="password" onChange={this.onChange} value={this.state.password} autoComplete="off" placeholder="Password" required />
              </div>
              <button className="" type="submit" name="action">Login</button>
          </form>
      </div>
    )
  }
}

export default Login
