var React = require('react');
var connect = require('react-redux').connect;
var LoadingIndicator = require('elements/LoadingIndicator');

var Minion = require('components/minions/Minion');

var tabStyle = require('./Tab.less');

var MinionsTab = React.createClass({
    propTypes: {
        fetchingMinionsInProgress: React.PropTypes.bool.isRequired,
        minions: React.PropTypes.array.isRequired
    },

    renderMinions() {
        return this.state.minions.map(minion => <Minion key={minion.id} minion={minion}/>);
    },

    render() {
        if (this.props.fetchingMinionsInProgress) {
            return (
                <LoadingIndicator>
                    Loading Minions
                </LoadingIndicator>
            );
        }
        return (
            <div className={tabStyle.this}>
                {this.renderMinions()}
            </div>
        );
    }
});

function select(state) {
    var minions = _.keys(state.minions).map(key => ({
        id: key,
        grains: state.minions[key]
    }));
    return {
        minions,
        fetchingMinionsInProgress: state.fetchingMinionsInProgress
    };
}

module.exports = connect(select)(MinionsTab);
