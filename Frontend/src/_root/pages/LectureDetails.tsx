import { useState } from "react";
import { ExampleLectures } from "../../constants/_lectures"
import { exampleUserImages } from "../../constants/_userInfo"

const LectureDetails = () => {
	const headerBackground = "linear-gradient(0deg, rgba(43, 45, 66, 0.20) 0%, rgba(43, 45, 66, 0.20) 100%), url('" + exampleUserImages.lectureDetailsHeaderImg + "'), lightgray 0px -304.909px / 100% 403.767% no-repeat";
	const headerImageStyles = {
		background: headerBackground,
		backgroundRepeat: "no-repeat",
		backgroundSize: "100% auto",
		backgroundPosition: "center 60%"
	}

	return (
		<>
			<div id="header-image" style={headerImageStyles}>
				<div id="header-image-wrap">
					Lecture Details
					<input type="button" id="new-lecture" value="New Lecture" />
				</div>
			</div>
			<div id="wrap-content">
				<div id="details-listview">
					<div className="row header">
						<div className="lecture-code">Lecture Code</div>
						<div className="lecture-name">Lecture Name</div>
						<div className="lecture-lecturer">Lecturer</div>
						<div className="lecture-credit">Credit</div>
						<div className="lecture-average">Average</div>
						<div className="lecture-details">Lecture Details</div>
					</div>
					{ExampleLectures.map((lecture) => {
						return (
							<div className="row" key={lecture.lectureCode}>
								<div className="lecture-code">{lecture.lectureCode}</div>
								<div className="lecture-name">{lecture.lectureName}</div>
								<div className="lecture-lecturer">{lecture.lecturer}</div>
								<div className="lecture-credit">{lecture.lectureCredit} credit</div>
								<div className="lecture-average">{lecture.lectureAvg}</div>
								<input type="button" className="lecture-details" value="Lecture Details" />
							</div>
						)
					})}
				</div>
			</div>
		</>
	)
}

export default LectureDetails