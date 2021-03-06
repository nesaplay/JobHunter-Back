import { all } from 'redux-saga/effects';

import logger from './logger';
import reports from './reports';
import search from './search';
import remove from './delete';
import users from './users';
import companies from './companies';
import reset from './reset';
import upload from './upload';

export default function* rootSaga() {
	yield all([
		logger(),
		reports(),
		search(),
		remove(),
		users(),
		companies(),
		reset(),
		upload()
	]);
}
