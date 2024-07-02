import Home from '@/pages/Home';
import setupStore from '@store/store.ts';
import '@styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import reportWebVitals from '@lib/reportWebVitals';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={setupStore}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);

reportWebVitals(console.log);