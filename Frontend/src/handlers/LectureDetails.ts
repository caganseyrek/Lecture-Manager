const backendurl = "http://localhost:3000"

export async function getLectures() {
    const lectures = await fetch(backendurl + "/lectures", {
        method: 'GET',
        headers: {
            "Auth": "Bearer token" /* + localStorage.getItem(token) */
        }
    }).catch(error => {
        console.log(error)
        return 500
    })
    return lectures
}

export async function newLecture(newLectureName: String, newLectureCode: String, newLectureCredit: Number, newLecturer: String) {
    await fetch(backendurl + "/lectures", {
        method: 'POST',
        headers: {
            "Auth": "Bearer token" /* + localStorage.getItem(token) */
        },
        body: JSON.stringify({
            lectureName: newLectureName,
            lectureCode: newLectureCode,
            lectureCredit: newLectureCredit,
            lecturer: newLecturer
        })
    }).then((result) => {
        if (result.ok) { return 200 }
        else { console.log(result) }
    }).catch(error => {
        console.log(error)
        return 500
    })
}

export async function getLecture(id: Number) {
    const lecture = await fetch(backendurl + "/lectures/" + id, {
        method: 'GET',
        headers: {
            "Auth": "Bearer token" /* + localStorage.getItem(token) */
        }
    }).then((result) => {
        if (!result.ok) { console.log(result) }
    }).catch(error => {
        console.log(error)
        return 500
    })
    return lecture
}

export async function editLecture(id: Number, lectureName: String, lectureCode: String, lectureCredit: Number, lecturer: String) {
    const args: { [key: string]: String | Number } = { lectureName, lectureCode, lectureCredit, lecturer }
    for (let key in args) {
        if (args[key as keyof typeof args] === "not-edited") {
            delete args[key as keyof typeof args]
        }
    }
    await fetch(backendurl + "/lectures/" + id, {
        method: 'PATCH',
        headers: {
            "Auth": "Bearer token" /* + localStorage.getItem(token) */
        },
        body: JSON.stringify(args)
    }).then((result) => {
        if (result.ok) { return 200 }
        else { console.log(result) }
    }).catch(error => {
        console.log(error)
        return 500
    })
}

export async function deleteLecture(id: Number) {
    await fetch(backendurl + "/lectures/" + id, {
        method: 'DELETE',
        headers: {
            "Auth": "Bearer token" /* + localStorage.getItem(token) */
        }
    }).then((result) => {
        if (result.ok) { return 200 }
        else { console.log(result) }
    }).catch(error => {
        console.log(error)
        return 500
    })
}