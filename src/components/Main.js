import React, { Component } from 'react';
import { HashRouter as Router,
        Route            
} from 'react-router-dom';
import Navigation from './Navigation';
import Schedule from './Schedule';
// import data from '../data/data.json';
import { sortData } from '../constants.js';

export default class Main extends Component {
    constructor(props){
        super(props)
        this.state={
            russia:[],
            moscow:[],
            saintPetersburg:[]
        }
    }
    componentDidMount(){
        // this.setState({
        //     russia:sortData(data["Данные"]).russia,
        //     moscow:sortData(data["Данные"]).moscow,
        //     saintPetersburg:sortData(data["Данные"]).saintp
        // })
        fetch("../data/data.json", {                
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                russia:sortData(data["Данные"]).russia,
                moscow:sortData(data["Данные"]).moscow,
                saintPetersburg:sortData(data["Данные"]).saintp
            })
        }).catch(error => console.log(error))
    }
    render() {
        const { russia, moscow, saintPetersburg } = this.state;
        return (
            <main>
                <Router
                    hashType={'noslash'}
                >
                    <Navigation/>  
                    <Route exact path="/"><Schedule data={russia}/></Route>
                    <Route path="/MSC"><Schedule data={moscow}/></Route>
                    <Route path="/SPB"><Schedule data={saintPetersburg}/></Route>
                </Router>
                <div id="bottom"></div>
            </main>
        )
    }
}
