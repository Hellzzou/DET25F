import React, { useEffect } from "react"
import { Week } from "../Sections/Week"
import { tokenCheck } from "../tools/user"
import { Redirect, RouteComponentProps } from "react-router-dom"
import { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { AlertToast } from "../BasicComponents/AlertToast"
import { MainNavBar } from "../Sections/MainNavbar"
import { activitiesAlert } from "../Datas/constants"

export const Activities = ({ match }: RouteComponentProps<{ week: string }>): JSX.Element => {
	const [token, setToken] = useState(true)
	const [alertType, setAlertType] = useState<string>("")
	const [show, setShow] = useState(false)
	const [alert, setAlert] = useState<{ color: string; info: string }>({ color: "", info: "" })
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		const storage = sessionStorage.getItem("activitiesAlert")
		if (storage !== null) {
			setAlert(activitiesAlert[storage])
			setAlertType(storage)
		}
	}, [])
	useEffect(() => {
		if (alertType !== "") setShow(true)
	}, [alertType])
	useEffect(() => {
		if (show) sessionStorage.removeItem("activitiesAlert")
	}, [show])
	return !token ? (
		<Redirect to='/' />
	) : (
		<div className='alegreya'>
			<MainNavBar />
			<AlertToast color={alert.color} info={alert.info} show={show} onClose={() => setShow(false)} />
			<Week date={match.params.week} />
		</div>
	)
}
