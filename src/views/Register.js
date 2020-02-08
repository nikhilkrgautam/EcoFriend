import React from "react";


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
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
      <div id="register">
          <h2>Register!</h2>
          <form onSubmit={this.handleSubmit} id="reg-form">
              <div className="">
                <input type="text" id="name" name="name" onChange={this.onChange} value={this.state.name} autoComplete="off" placeholder="Name" required />
              </div>
              <div className="">
                <input type="text" id="email" name="email" onChange={this.onChange} value={this.state.email} autoComplete="off" placeholder="Email" required />
              </div>
              <div className="">
                <input type="password" id="password" name="password" onChange={this.onChange} value={this.state.password} autoComplete="off" placeholder="Password" required />
              </div>
              <button className="" type="submit" name="action">Submit</button>
          </form>
      </div>
    )
  }
}

export default Register
