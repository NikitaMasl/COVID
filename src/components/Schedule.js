import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { getDate, getConfirmed, getRecovered, getDeaths, formatDate, setDailyParam, getDailyConfirmed } from '../constants';

export default class Schedule extends Component {
    constructor(props){
        super(props);
        this.state={
            data: this.props.data,
            date: [],
            confirmed: [],
            recovered: [],
            deaths: [],
            cofirmedThisDay:[],
            dailyParam: {}
        }
    }
    componentDidMount(){
        this.setState({
            date: getDate(this.state.data),
            confirmed: getConfirmed(this.state.data),
            recovered: getRecovered(this.state.data),
            deaths: getDeaths(this.state.data),
            confirmedThisDay: getDailyConfirmed(this.state.data),
            dailyParam: setDailyParam(this.state.data)
        })
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(prevState.data !== nextProps.data){
            return {
                data: nextProps.data,
                date: getDate(nextProps.data),
                confirmed: getConfirmed(nextProps.data),
                recovered: getRecovered(nextProps.data),
                deaths: getDeaths(nextProps.data),
                confirmedThisDay: getDailyConfirmed(nextProps.data),
                dailyParam: setDailyParam(nextProps.data)
            }
        }
        return null
    }

    defaultDate = () => {
        let date = new Date();
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        let yy = date.getFullYear() ;
        if (yy < 10) yy = '0' + yy;
      
        return yy + '-' + mm + '-' + dd;
    }

    changeDailyParam = ({target: {value}}) => {
        const { data } = this.state;
        data.forEach( el => {
            if(formatDate(new Date(el.date)) === formatDate(new Date(value))){
                this.setState({
                    dailyParam:{
                        confirmed: el.confirmed,
                        deaths: el.deaths,
                        recovered: el.recovered,
                        confirmedForThisDay: el.confirmedThisDay
                    }
                })
            }
        })
    }
    render() {
        const { date, confirmed, recovered, deaths, dailyParam, confirmedThisDay } = this.state;
        const data = {
            labels: date,
            datasets: [
              {
                label: 'Cofirmed',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(255, 52, 52, 0.4)',
                borderColor: 'rgba(255, 52, 52,1)',
                borderCapStyle: 'butt',
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(255, 255, 255, 1)',
                pointBackgroundColor: 'rgba(255, 110, 110, 1)',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(255, 255, 255,1)',
                pointHoverBorderColor: 'rgba(0, 0, 0, 1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: confirmed
              },
              {
                label: 'Deathes',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                borderColor: 'rgba(0, 0, 0,1)',
                borderCapStyle: 'butt',
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(255, 255, 255, 1)',
                pointBackgroundColor: 'rgba(0, 0, 0, 1)',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(255, 255, 255,1)',
                pointHoverBorderColor: 'rgba(0, 0, 0, 1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: deaths
              },
              {
                label: 'Recovered',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(65, 231, 87, 0.4)',
                borderColor: 'rgba(65, 231, 87, 1)',
                borderCapStyle: 'butt',
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(255, 255, 255, 1)',
                pointBackgroundColor: 'rgba(65, 231, 87, 1)',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointHoverBorderColor: 'rgba(65, 231, 87, 1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: recovered
              },
              {
                label: 'Confirmed That Day',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(37, 34, 221, 0.4)',
                borderColor: 'rgba(37, 34, 221, 1)',
                borderCapStyle: 'butt',
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(255, 255, 255, 1)',
                pointBackgroundColor: 'rgba(37, 34, 221, 1)',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointHoverBorderColor: 'rgba(37, 34, 221, 1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: confirmedThisDay
              },
            ]
          };
        return (
            <div className="schedule">
                <div>
                    <div className="col-md-4 mb-3">
                        <label>Date</label>
                        <input type="date" className="form-control" defaultValue={this.defaultDate()} min='2020-03-02' max={this.defaultDate()} onChange={this.changeDailyParam}/>
                    </div>
                    {dailyParam.confirmed
                    ?
                    <span className='dailyParam'><h5>Total confirmed - {dailyParam.confirmed}, for 24 hour - {dailyParam.confirmedForThisDay}, total recovered - {dailyParam.recovered}, total deathes - {dailyParam.deaths}</h5></span>
                    :
                    <span className='dailyParam'><h5>We don't have information for this date yet, you have to choose another one</h5></span>
                    }
                </div>
                <Line 
                    data={data}
                    width={80}
                    height={35}
                    />
            </div>
        )
    }
}

Schedule.propTypes={
    data: PropTypes.array
}
Schedule.defaultProps = {
    data: []
}