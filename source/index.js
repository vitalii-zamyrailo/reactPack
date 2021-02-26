import React, { useState } from 'react';
import { render } from 'react-dom';

import moment from 'moment';

import './style.scss';

const getUsersModule = () => import(/* webpackChunkName: 'usersAPI' */ './common/usersAPI');

function App() {
	const [state, setState] = useState({ users: [] });

	const showUsersList = () =>
		getUsersModule().then(({ getUsers }) => getUsers().then(users => setState({ users })));

	const usersList = state.users.map(user => <li key={user.id}>{user.name}</li>);

	return <section>
				<span>Date: {moment().format()}</span>
				<ul>{usersList}</ul>
				<button onClick={showUsersList}>Fetch users</button>
			</section>;
}

render(<App />, document.getElementById('root'));
