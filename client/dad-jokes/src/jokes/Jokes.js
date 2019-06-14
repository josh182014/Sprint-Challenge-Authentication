import React from 'react';

class Jokes extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getJokes()
    }

    render() {
        return (
            <div>
            <h2>Jokes</h2>

            <div>
            {this.props.jokes.map(joke => (
                <div key={joke.id}>{joke.joke}</div>
            ))}
            </div>
            </div>
        ) 
    }
}

export default Jokes;
