import React from "react"
import { Week } from "../Sections/Week"
import { tokenCheck } from "../tools/user"
import { Redirect, RouteComponentProps } from "react-router-dom"
import { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { AlertToast } from "../BasicComponents/AlertToast"
import { MainNavBar } from "../Sections/MainNavbar"

export const Activities = ({ match }: RouteComponentProps<{ toast: string; week: string }>): JSX.Element => {
	const [token, setToken] = useState(true)
	const [newFlightShow, setNewFlightShow] = useState(false)
	const [newAlertShow, setNewAlertShow] = useState(false)
	const [newEventShow, setNewEventShow] = useState(false)
	const [newPermShow, setNewPermShow] = useState(false)
	const [modifyFlightShow, setModifyFlightShow] = useState(false)
	const [modifyAlertShow, setModifyAlertShow] = useState(false)
	const [modifyEventShow, setModifyEventShow] = useState(false)
	const [modifyPermShow, setModifyPermShow] = useState(false)
	const [deleteFlightShow, setDeleteFlightShow] = useState(false)
	const [deleteAlertShow, setDeleteAlertShow] = useState(false)
	const [deleteEventShow, setDeleteEventShow] = useState(false)
	const [deletePermShow, setDeletePermShow] = useState(false)
	const [debriefFlightShow, setDebriefFlightShow] = useState(false)
	const [debriefPermShow, setDebriefPermShow] = useState(false)
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (match.params.toast === "newFlight") setNewFlightShow(true)
		if (match.params.toast === "newAlert") setNewAlertShow(true)
		if (match.params.toast === "newEvent") setNewEventShow(true)
		if (match.params.toast === "newPerm") setNewPermShow(true)
		if (match.params.toast === "modifyFlight") setModifyFlightShow(true)
		if (match.params.toast === "modifyAlert") setModifyAlertShow(true)
		if (match.params.toast === "modifyEvent") setModifyEventShow(true)
		if (match.params.toast === "modifyPerm") setModifyPermShow(true)
		if (match.params.toast === "deleteFlight") setDeleteFlightShow(true)
		if (match.params.toast === "deleteAlert") setDeleteAlertShow(true)
		if (match.params.toast === "deleteEvent") setDeleteEventShow(true)
		if (match.params.toast === "deletePerm") setDeletePermShow(true)
		if (match.params.toast === "debriefFlight") setDebriefFlightShow(true)
		if (match.params.toast === "debriefPerm") setDebriefPermShow(true)
	}, [])
	return !token ? (
		<Redirect to='/' />
	) : (
		<div className='alegreya'>
			<MainNavBar />
			<AlertToast
				color='primary'
				info='Le vol a bien été crée'
				show={newFlightShow}
				onClose={() => setNewFlightShow(false)}
			/>
			<AlertToast
				color='primary'
				info="L'alerte a bien été créee"
				show={newAlertShow}
				onClose={() => setNewAlertShow(false)}
			/>
			<AlertToast
				color='primary'
				info="L'évènement a bien été crée"
				show={newEventShow}
				onClose={() => setNewEventShow(false)}
			/>
			<AlertToast
				color='primary'
				info='La permission a bien été créee'
				show={newPermShow}
				onClose={() => setNewPermShow(false)}
			/>
			<AlertToast
				color='primary'
				info='Le vol a bien été modifié'
				show={modifyFlightShow}
				onClose={() => setModifyFlightShow(false)}
			/>
			<AlertToast
				color='primary'
				info="L'alerte a bien été modifiée"
				show={modifyAlertShow}
				onClose={() => setModifyAlertShow(false)}
			/>
			<AlertToast
				color='primary'
				info="L'évènement a bien été modifié"
				show={modifyEventShow}
				onClose={() => setModifyEventShow(false)}
			/>
			<AlertToast
				color='primary'
				info='La permission a bien été modifiée'
				show={modifyPermShow}
				onClose={() => setModifyPermShow(false)}
			/>
			<AlertToast
				color='danger'
				info='Le vol a bien été supprimé'
				show={deleteFlightShow}
				onClose={() => setDeleteFlightShow(false)}
			/>
			<AlertToast
				color='danger'
				info="L'alerte a bien été supprimée"
				show={deleteAlertShow}
				onClose={() => setDeleteAlertShow(false)}
			/>
			<AlertToast
				color='danger'
				info="L'évènement a bien été supprimé"
				show={deleteEventShow}
				onClose={() => setDeleteEventShow(false)}
			/>
			<AlertToast
				color='danger'
				info='La permission a bien été supprimée'
				show={deletePermShow}
				onClose={() => setDeletePermShow(false)}
			/>
			<AlertToast
				color='primary'
				info='Le vol a bien été débriefé'
				show={debriefFlightShow}
				onClose={() => setDebriefFlightShow(false)}
			/>
			<AlertToast
				color='primary'
				info='La permission a bien été validée'
				show={debriefPermShow}
				onClose={() => setDebriefPermShow(false)}
			/>
			<Week date={match.params.week} />
		</div>
	)
}
