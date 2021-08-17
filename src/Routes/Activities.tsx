import React from "react"
import { Week } from "../Sections/Week"
import { Header } from "../Sections/Header"
import { Navbar } from "../Sections/Navbar"

export const Activities = (): JSX.Element => {
	return (
		<div>
			<Header />
			<Navbar />
			<Week />
		</div>
	)
}
