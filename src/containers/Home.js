import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReportPreview from '../components/dashboard/ReportPreview';
import Search from '../components/common/Search';
import initModal from '../components/common/Modal';
import * as actions from '../actions/index';
import '../css/Home.css';

class Home extends Component {
	constructor(props) {
		super(props);
		this.searchQuery = this.searchQuery.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	searchQuery(query) {
		this.props.searchReports(query);
	}

	handleDelete(id) {
		this.props.deleteReport(id);
	}

	renderReports(data) {
		const { query } = this.props.search;
		const filter = report =>
			report.candidateName.toLowerCase().includes(query.toLowerCase());

		return data
			.filter(filter)
			.map(report => 
				<ReportPreview 
					key={report.id}
					handleDelete={this.handleDelete}
					initModal={initModal} 
					{...report} 
				/>);
	}

	componentDidMount() {
		this.props.fetchReports();
	}

	render() {
		const { searchReports, reports } = this.props;
		const { isLoading, data } = reports;

		return (
			<div className="candidates-list-wrapper">
				<Search searchQuery={searchReports} />
				{isLoading ? <p>Loading ...</p> : this.renderReports(data)}
			</div>
		);
	}
}

const mapStateToProps = ({ reports, search }) => ({ reports, search });

export default connect(mapStateToProps, actions)(Home);