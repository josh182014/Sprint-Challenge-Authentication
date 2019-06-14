import React from 'react'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        };
    }

    handleInputChanges = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.handleLogin(this.state)
        this.props.history.push('/jokes')
    }
    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <div>Username</div>
                        <input
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChanges}
                        type="text"
                        />
                    </div>
                    <div>
                        <div>Password</div>
                        <input
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChanges}
                        type="password"
                        />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}