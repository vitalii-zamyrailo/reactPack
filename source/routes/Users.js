import React, { useState } from 'react';

import moment from 'moment';
import { square } from '../testThings/math';

const getUsersModule = () => import(/* webpackChunkName: 'usersAPI' */ '../testThings/usersAPI');

export default function () {
	const [state, setState] = useState({ users: [] });

	const showUsersList = () =>
		getUsersModule().then(({ getUsers }) => getUsers().then(users => setState({ users })));

	const usersList = state.users.map(user => <li key={user.id}>{user.name}</li>);

	return (
		<section>
			<span>Date now: {moment().format()}</span>
			<h3>Found {Math.sqrt(square(usersList.length))} users:</h3>
			<ul>{usersList}</ul>
			<button onClick={showUsersList}>Fetch users</button>
		</section>
	);
};
