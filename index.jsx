class ChanageForm extends React.Component {
	render() {
		return (
			<form>
				<input type="text" />
				<input type="submit" value="Добавить"/>
			</form>
		)
	}
}

class ExTable extends React.Component {
	constructor(props) {
		super(props);
		let desceinding = [];
		for (var i = 0; i < this.props.headers.length; i++) {
			desceinding[i] = undefined;
		}
		this.state = {
			data: this.props.data,
			sortCol: null,
			desceinding: desceinding,
		}
	}
	sort = (e) => {
		//console.log(e.target);
		let column = e.target.cellIndex;

		let data = this.state.data.slice();

		let descending = this.state.desceinding.slice();

		if (!descending[column]) descending[column] = false;

		data.sort(function (a, b) {
			if (descending[column]) {
				if (a[column] < b[column]) return 1;
				if (a[column] > b[column]) return -1;
			} else {
				if (a[column] > b[column]) return 1;
				if (a[column] < b[column]) return -1
			}
			
		}); 
		descending[column] = !descending[column];
		this.setState({
			data: data,
			sortCol: column,
			desceinding: descending,
		});
	}
	render() {
		let arrowUp = "\u2191";
		let arrowDown = "\u2193";
		return (
			<table>
				<thead onClick={this.sort}>
					<tr>
						{this.props.headers.map(function(head, inx){
							let arrow = "";
							if (this.state.desceinding[inx] !== undefined) {
								this.state.desceinding[inx] ? arrow = arrowDown : arrow = arrowUp;
							}
							return <th key={inx}>{head + arrow}</th>
						}, this)}
					</tr>
				</thead>
				<tbody>
					{this.state.data.map(function(row, rowInx){
						return (
							<tr key={rowInx}>
								{row.map(function(cell, cellInx) {
									return <td key={cellInx} data-row={rowInx} data-cell={cellInx}>{cell}</td>
								})}
							</tr>
						)
					}, this)}
				</tbody>  
			</table>
		)
	}
}

class Shelf extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.initData,
		}
	}

	someFunc = (some) => {
		return null;
	}
	
	render() {
		return (
			<div>
				<ChanageForm />
				<ExTable data={this.state.data} headers={this.props.headers} />
			</div>
		)
	}
}

var headers = ["Номер", "Название", "Автор", "Год издания"];
var data = [
	[1, "The Lord of the Rings", "J. R. R. Tolkien", "1954-1955"], 
	[2, "Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "1943"], 
	[3, "Harry Potter and the Philosopher's Stone", "J. K. Rowling", "1997"], 
	[4, "And Then There Were None", "Agatha Christie", "1939"], 
	[5, "Dream of the Red Chamber", "Cao Xueqin", "1754-1791"], 
	[6, "The Hobbit", "J. R. R. Tolkien", "1937"], 
	[7, "She: A History of Adventure", "H. Rider Haggard", "1887"],
];

var bookShelf = ReactDOM.render(<Shelf headers={headers} initData={data} />, document.getElementById('app'));