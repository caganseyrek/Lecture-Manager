import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
	return (
		<>
			<Sidebar />
			<div id="content-right">
				<Topbar />
				<Outlet />
			</div>
		</>
	)
}

export default RootLayout