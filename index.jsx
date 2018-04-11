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
	render() {
		return (
			<table></table>
		)
	}
}

class Shelf extends React.Component {

	someFunc = (some) => {
		return null;
	}
	
	render() {
		return (
			<div>
				<ChanageForm />
				<ExTable />
			</div>
		)
	}
}

var headers = [];
var data = [];

ReactDOM.render(<Shelf />, document.getElementById('app'));