import React, { Component } from 'react'
import { connect } from 'react-redux'

class ReduxTest extends Component {
    render() {
        return (
            <div>
                Store: ImranKhan => {this.props.Kingness}
                <button onClick={() => { this.props.ChangeToGreat() }}>I AM GREAT</button>
            </div>
        )
    }
}
const ChangeToGreat = () => {
    return {
        type: 'CHANGETOGREAT'
    }
}

const StoreStateToProps = (state) => {
    return {
        Kingness: state.ImranKhan
    }
}
export default connect(StoreStateToProps, { ChangeToGreat: ChangeToGreat })  (ReduxTest)

