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
		this.state = {
			data: this.props.data,
		}
	}
	render() {
		return (
			<table>
				<thead>
					<tr>
						{this.props.headers.map(function(head, inx){
							return <th key={inx}>{head}</th>
						})}
					</tr>
				</thead>
				<tbody>
					{this.state.data.map(function(row, rowInx){
						return (
							<tr key={rowInx}>
								{row.map(function(cell, cellInx) {
									return <td key={cellInx}>{cell}</td>
								})}
							</tr>
						)
					})}
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

var headers = ["Название", "Автор", "Год издания"];
var data = [
	["The Lord of the Rings", "J. R. R. Tolkien", "1954-1955"], 
	["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "1943"], 
	["Harry Potter and the Philosopher's Stone", "J. K. Rowling", "1997"], 
	["And Then There Were None", "Agatha Christie", "1939"], 
	["Dream of the Red Chamber", "Cao Xueqin", "1754-1791"], 
	["The Hobbit", "J. R. R. Tolkien", "1937"], 
	["She: A History of Adventure", "H. Rider Haggard", "1887"],
];

var bookShelf = ReactDOM.render(<Shelf headers={headers} initData={data} />, document.getElementById('app'));