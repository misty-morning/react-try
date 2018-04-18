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
			edit: null, 
			editingRow: [],
		}
		//this.props.editingRow = [];
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
	del = (e) => {
		let rowInx = e.target.dataset.row;
		let data = this.state.data.slice();
		data.splice(rowInx, 1);
		this.setState({
			data: data,
		})

	}
	startEdit = (e) => {
		let rowInx = e.target.dataset.row;
		//this.props.editingRow = this.state.data[rowInx];
		this.setState({
			editingRow: this.state.data[rowInx],
			edit: rowInx,
		});
	}
	calncelEdit = (e) => {
		this.setState({
			edit: null,
			editingRow: [],
		})
	}
	endEdit = (e) => {
		let data = this.state.data.slice();
		data[this.state.edit] = this.state.editingRow.slice();
		this.setState({
			data: data,
			edit: null,
		});
	}
	editRowEl = (e) => {
		let cellInx = e.target.dataset.cell;
		let row = this.state.editingRow.slice();
		row[cellInx] = e.target.value;
		this.setState({editingRow:row});
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
						<th>Управление</th>
					</tr>
				</thead>
				<tbody>
					{this.state.data.map(function(row, rowInx){
						let btns = <span><button onClick={this.startEdit} data-row={rowInx}>Изменить</button><button onClick={this.del} data-row={rowInx}>Удалить</button></span>
						if (this.state.edit == rowInx) {
							btns = <span><button onClick={this.endEdit} data-row={rowInx}>OK</button><button onClick={this.calncelEdit} data-row={rowInx}>Отмена</button></span>
						}
						return (
							<tr key={rowInx}>
								{row.map(function(cell, cellInx) {
									let content = cell;
									if (this.state.edit == rowInx) {
										content = <input type='text' defaultValue={cell} data-row={rowInx} data-cell={cellInx} onChange={this.editRowEl} />
									} 
									return <td key={cellInx} data-row={rowInx} data-cell={cellInx}>{content}</td>;
								}, this)}
								<td data-row={rowInx} data-cell={row.length + 1}>
									{btns}					
									
								</td>
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