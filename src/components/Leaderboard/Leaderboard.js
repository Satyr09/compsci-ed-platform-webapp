import React,{Component} from 'react';
import classes from './Leaderboard.module.css';
import groupBy from 'lodash/groupBy';

class Leaderboard extends Component{
	state={
		article:null,
		rows:null
	};
	componentDidMount(){
		this.renderTable();
	}
	printTable=()=>{
		console.log(this.state.article);
		let arr=groupBy(this.state.article,"author");
		let m=[];
		console.log(arr);
		for(let group in arr){
			let name="";
			let avgRating=0,c=0;
			for(let prop in arr[group]){
				console.log(arr[group][prop]);
				name=arr[group][prop].author;
				//console.log(name);
				if(arr[group][prop].avgRating!==undefined){
					avgRating=avgRating+arr[group][prop].avgRating;
				}
				c=c+1;
				
			}
			console.log(avgRating/c);
			let a=[(avgRating/c).toFixed(2),name];
			m.push(a);
			//console.log(this.state.rows);
		}
		m.sort();
		m.reverse();
		let i=0;
		this.setState({
			rows:m.map(()=>{
			i=i+1;
			return (
				<tr className={classes.Tr} key={i}>
					<td className={classes.Td}>{i}</td>
					<td className={classes.Td}>{m[i-1][1]}</td>
					<td className={classes.Td}>{m[i-1][0]}</td>
				</tr>
			);
			})
		});

	}
	renderTable=()=>{
		//const qParams=queryString.parse(this.location.search);
		let x=null;
		fetch("http://localhost:5000/article", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
        /*body: JSON.stringify({
            title: topic,
            comment,
            author: "Jackson"
        })*/
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            x=data;
            //console.log(this.state.article);
            //console.log(groupBy(x,"author"));
            this.setState({article:x});
            this.printTable();
        })
        .catch(err => console.error(err));
        
	}
	render(){
		//this.renderTable();
		//console.log(this.state.rows);
		return(
			<div>
				<div className={classes.Caption}>Teacher Leaderboard</div>
				<table className={classes.Table}>
					<tbody>
						<tr className={classes.Tr}>
							<th className={classes.Th}>SL. NO.</th>
						    <th className={classes.Th}>TUTOR</th>
						    <th className={classes.Th}>AVERAGE RATING</th>
						</tr>
						{/*<tr className={classes.Tr}>
						    <td className={classes.Td}>1</td>
						    <td className={classes.Td}>Ken Anderson</td>
						    <td className={classes.Td}>4.3</td>
						</tr>
						<tr className={classes.Tr}>
						    <td className={classes.Td}>2</td>
						    <td className={classes.Td}>Austin Aries</td>
						    <td className={classes.Td}>4.5</td>
						</tr>*/}
						
						{this.state.rows}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Leaderboard;