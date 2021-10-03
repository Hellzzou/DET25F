/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import logo from "../images/logo.jpeg"
import aero from "../images/aero.jpeg"
import { Alert, CrewMember, FDVView, Flight } from "../types/Objects"
import useAsyncEffect from "use-async-effect"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { alertDateFinderURL, flightDateFinderURL, groundFunctionURL, memberURL } from "../Datas/urls"
import { inDays } from "../Datas/constants"
import { buildFDVView } from "../tools/buildEtat400"
import { INITIAL_CREWMEMBER } from "../Datas/initialObjects"

export const FlightSheet = ({ match }: RouteComponentProps<{ monday: string }>): JSX.Element => {
	const [flights, setFlights] = useState<FDVView[]>([])
	const [alertChief, setAlertChief] = useState<CrewMember>(INITIAL_CREWMEMBER)
	const [alertTech, setAlertTech] = useState<CrewMember>(INITIAL_CREWMEMBER)
	const [memberToSign, setMemberToSign] = useState<CrewMember>(INITIAL_CREWMEMBER)
	useAsyncEffect(async () => {
		const flights = await postFetchRequest<Flight[]>(flightDateFinderURL, {
			start: new Date(parseInt(match.params.monday)),
			end: new Date(parseInt(match.params.monday) + inDays),
		})
		const members = await getFetchRequest<CrewMember[]>(memberURL)
		if (typeof flights !== "string" && typeof members !== "string") setFlights(buildFDVView(flights, members))
		const alerts = await postFetchRequest<Alert[]>(alertDateFinderURL, {
			start: new Date(parseInt(match.params.monday)),
			end: new Date(parseInt(match.params.monday) + inDays),
		})
		if (typeof alerts !== "string" && typeof members !== "string" && alerts[0]) {
			setAlertChief(members.find(({ trigram }) => trigram === alerts[0].chief)!)
			setAlertTech(members.find(({ trigram }) => trigram === alerts[0].tech)!)
		}
		const memberToSign = await postFetchRequest<CrewMember>(groundFunctionURL, { function: "Commandant" })
		if (typeof memberToSign !== "string") setMemberToSign(memberToSign)
	}, [])
	return (
		<div className='m-2'>
			<div className='row'>
				<div className='col-md-2 text-center'>
					<img src={logo} className='d-inline ms-2' />
				</div>
				<div className='col-md-8 text-center text-primary'>
					<h6 className='my-3 border border-primary rounded p-1'>FEUILLE DES VOLS DU DETACHEMENT 25F</h6>
					<h6 className='my-3 border border-primary rounded p-1'>
						{new Date(parseInt(match.params.monday)).toLocaleDateString("fr-FR", {
							weekday: "long",
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</h6>
				</div>
				<div className='col-md-2 text-center'>
					<img src={aero} className='d-inline ms-2' />
				</div>
			</div>
			<div className='row justify-content-center m-3'>
				{flights[0] ? (
					<table className='table table-bordered text-center'>
						<tr>
							<th>EQ</th>
							<th colSpan={2}>Membres d&apos;équipages</th>
							<th>DEC</th>
							<th>HDV</th>
							<th>LIBELLE</th>
							<th>REMARQUES</th>
							<th>SSG</th>
							<th>PLEIN</th>
							<th>CONFIG</th>
						</tr>
						{flights.map((flight) => (
							<tr key={flights.indexOf(flight)}>
								<td>{flight.crew}</td>
								<td>{flight.chief}</td>
								<td>{flight.crewMembers}</td>
								<td>{flight.takeOff}</td>
								<td>{flight.duration}</td>
								<td>{flight.type}</td>
								<td>{flight.mission}</td>
								<td>{flight.underGroup}</td>
								<td>{flight.fuel}</td>
								<td>{flight.config}</td>
							</tr>
						))}
					</table>
				) : (
					<h4 className='text-center'>NO FLY DAY</h4>
				)}
			</div>
			<div style={{ height: "50vh" }}></div>
			<div className='row'>
				<div className='col-md-1'></div>
				<div className='col-md-8'>
					<table className='table table-bordered text-center'>
						<tr>
							<th>CHEF DE BORD D&apos;ALERTE</th>
							<th className='text-primary text-uppercase'>
								{alertChief ? `${alertChief.rank} ${alertChief.surName}` : ""}
							</th>
							<th className='text-primary'>{alertChief ? alertChief.tel : ""}</th>
						</tr>
						<tr>
							<th>TECHNICIEN D&apos;ASTREINTE</th>
							<th className='text-primary text-uppercase'>
								{alertTech ? `${alertTech.rank} ${alertTech.surName}` : ""}
							</th>
							<th className='text-primary'>{alertTech ? alertTech.tel : ""}</th>
						</tr>
					</table>
				</div>
				<div className='col-md-3 text-center'>{`${memberToSign.rank} ${memberToSign.firstName} ${memberToSign.surName}`}</div>
			</div>
		</div>
	)
}
