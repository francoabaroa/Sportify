import React, { Component } from 'react';
import { connect } from 'react-redux';
import teams from '../helpers/teamNames';
import { fetchSpecificPlayers } from '../compare/actions';
import { filterPlayers } from '../player/actions';
import StatHeadings from '../player/StatHeadings.jsx';

class DIYStatsView extends Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.onFieldSubmit = this.onFieldSubmit.bind(this);
  }

  onCheck(event) {
    // console.log('checked!', event.target.name, event.target.checked);
  }

  onFieldSubmit(event) {
    event.preventDefault();
    console.log(event.target[0].value);
    this.props.filterPlayers({ filters: { playerId: this.props.search[0].playerId, Opponent: event.target[0].value }, tableName: 'playerProjectedGames', season: 2015 })
    .then((response) => {
      console.log(response.payload.data[0]);
    });
  }

  onSearch(event) {
    event.preventDefault();
    console.log(event.target[0].value);
    this.props.fetchSpecificPlayers({ playerNames: [event.target[0].value] })
    .then((response) => { console.log(response.payload.data[0]); });
  }

  renderStats() {
    return this.props.players.map((player, index) => {
      return (
        <tbody key={index}>
          <tr>
            <td> <a> {player.Name || player.full }</a></td>
            <td> {player.Position || 'NA'} </td>
            <td> {player.Played || 0}</td>
            <td> {player.Opponent || 'BYE'} </td>
            <td> {player.FantasyPoints || 0}</td>
            <td> Actual </td>
            <td> {parseInt(player.PassingYards) || 0}</td>
            <td> {player.PassingTouchdowns || 0}</td>
            <td> {player.PassingInterceptions || 0}</td>
            <td> {player.PassingAttempts || player.RushingAttempts || 0 }</td>
            <td> {parseInt(player.RushingYards) || 0}</td>
            <td> {player.RushingTouchdowns || 0}</td>
            <td> {player.ReceivingTargets || 0}</td>
            <td> {player.Receptions || 0} </td>
            <td> {player.RushingTouchdowns || 0}</td>
            <td> {player.ReceivingTouchdowns || 0}</td>
            <td> {player.TwoPointConversionReturns || 0}</td>
            <td> {player.PassingTouchdowns > 30 ? 'Approve' : 'Disapprove'} </td>
          </tr>
        </tbody>
      );
    });
  }

  render() {
    const teamOptions = [];
    let playerImage, playerStats;
    for (let k in teams) {
      teamOptions.push(<option key={k} value={k}>{teams[k]}</option>);
    }
    if (this.props.search[0]) {
      playerImage = <img src={this.props.search[0].player.image_url} role="presentation"/>;
    }
    console.log(this.props.players);
    return (
      <div className="center-content">
        <h1>DIY Stats View</h1>
        <h3>Choose a player:</h3>
        <div className="search-container">
          <form onSubmit={this.onSearch}>
            <input type="text" name="name" placeholder="SEARCH" />
            <button type="Submit" >Submit</button>
          </form>
        </div>
        <h3>Current Player:</h3>
        {playerImage}
        <h3>Performance</h3>
        <input type="checkbox" name="0" /> Against a Team
        <input type="checkbox" name="1" /> On a Day of the Week
        <input type="checkbox" name="2" /> At a Specific Stadium
        <input type="checkbox" name="3" /> At Home/Away
        <input type="checkbox" name="4" /> Under Specific Weather Conditions
        <input type="checkbox" name="5" /> Started/Benched
        <form onSubmit={this.onFieldSubmit}>
          <div className="filter-form-select">
            <label htmlFor="teamSelect"> AGAINST A TEAM </label>
            <select data="teamVal" id="teamSelect">
              {teamOptions}
            </select>
          </div>
          <button type="Submit" >Submit</button>
        </form>
        <h3>Past Statistics</h3>
        <table>
          <StatHeadings />
          {this.renderStats()}
        </table>
        <h3>Conclusions</h3>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { players: state.players, search: state.query };
}

DIYStatsView.propTypes = {
  players: React.PropTypes.array.isRequired,
  search: React.PropTypes.array.isRequired,
};

export default connect(mapStateToProps, { fetchSpecificPlayers, filterPlayers })(DIYStatsView);
