import { useState } from "react"
import { ExampleLectures, exampleLectureOverview } from "../constants/_lectures"
import { exampleUserImages, /*exampleUserInfo*/ } from "../constants/_userInfo"

const Topbar = () => {
	const [_sidebarState, setSidebarState] = useState(true);
	const userPicture = {
		backgroundImage: exampleUserImages.profilePicture,
		backgroundRepeat: "no-repeat",
		backgroundSize: "100% auto",
		backgroundPosition: "center center",
	}

	return (
		<div id="topbar-background">
			<div id="topbar">
				<input type="button" id="sidebar-toggle-btn" onClick={() => setSidebarState(sidebarState => !sidebarState)} />
				<div id="topbar-overview">
					<div className="overview-container"><label className="overview-label">Lectures</label>
						{ExampleLectures.length} total
					</div>
					<div className="overview-container"><label className="overview-label">Average</label>
						{exampleLectureOverview.average}
					</div>
				</div>
				<input type="button" id="profile-image" style={userPicture} /*onclick="logoutToggler()"*/ />
				<div id="logout-container">
					<a id="logout">
						Log Out
						<label>{/*exampleUserInfo.email*/}</label>
					</a>
				</div>
			</div>
		</div>
	)
}

export default Topbar