import { Link, /*useLocation*/ } from 'react-router-dom'
import { SidebarLinks } from '../constants/SidebarLinks'

const Sidebar = () => {
	const sidebarState = false;
	// const { pathName } = useLocation();

	return (
		<>
			<div id="sidebar-left" style={sidebarState ? { left: "-240px" } : { left: "0px" }}>
				<Link id="sidebar-logo-name" to="#">
					<div id="logo"></div>
					<div id="name">Lecture Manager</div>
				</Link>				
				<a id="commander-btn" className="sidebar-btn" /*onclick="commanderToggler()"*/>
					Commander
					<label className="sidebar-btn-desc">Ask the commander to do and find anything</label>
				</a>
				{SidebarLinks.map((link) => {
					const isActive = (/*pathName*/"Lecture Details" === link.label);
					return (
						<Link key={link.id} className={isActive ? 'sidebar-btn menu-active' : 'sidebar-btn'} id={link.id} to={link.path}>{link.label}{(link.isWip) ? <div className='wip'></div> : ''}</Link>
					)
				})}
				<div id="sidebar-bottom">
					<input type="button" className="sidebar-btn" id="settings" value="Settings" /*onclick="settingsToggler()"*/ />
					<Link className="sidebar-btn" id="help-docs" to="path_to_docs">
						Help & Docs<div id="external-icon"></div>
						<label className="sidebar-btn-desc">See how to use all of the features</label>
					</Link>
				</div>
			</div>
		</>
	)
}

export default Sidebar