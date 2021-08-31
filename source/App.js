import React  from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from 'react-router-dom'

import HomeRoute from './routes/Home';
import UsersRoute from './routes/Users';
import GalleryRoute from './routes/Gallery';

import './style.scss';

export default function App() {
	return (
		<Router>
			<div>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/users">Users</Link>
					</li>
					<li>
						<Link to="/gallery">Gallery</Link>
					</li>
				</ul>
				<hr />
				<Switch>
					<Route exact path="/">
						<HomeRoute />
					</Route>
					<Route exact path="/users">
						<UsersRoute />
					</Route>
					<Route exact path="/gallery">
						<GalleryRoute />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}
