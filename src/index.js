import React from "react";
import { render } from "react-dom";
import { HomePage } from "./modules/home/homepage";
import { SchoolPage } from "./modules/school/schoolpage";
import { StudentPage } from "./modules/student/student";
import { TeacherPage } from "./modules/teacher/teacher";
import { ClassPage } from "./modules/class/class";
import Navigo from "navigo";
import './style.css';
// import './reset.css';

const router = new Navigo('/', { hash: true });
window.router = router;


router
	.on("/", (_) => {
		render(<HomePage />, document.getElementById("root"));
	})
	.on('/school/:schoolid', ({ data, params, queryString }) => {
		console.log(data); // { id: 'xxx', action: 'save' }
		console.log(params); // { m: "n", k: "z" }
		console.log(queryString); // "m=n&k=z"
		render(<SchoolPage tab={params?.tab}schoolid={data.schoolid} params={params}/>, document.getElementById("root"));
	})
	.on('/teacher/:id', ({ data }) => {
		render(<TeacherPage id={data.id} />, document.getElementById("root"));
	})
	.on('/student/:id', ({ data }) => {
		render(<StudentPage id={data.id} />, document.getElementById("root"));
	})
	.on('/classes/:id', ({ data }) => {
		render(<ClassPage id={data.id} />, document.getElementById("root"));
	})
	.on((match) => {
		console.log(match);
	})
	.resolve();