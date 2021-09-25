import React, { useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import logo from "../images/logo.jpeg"
import aero from "../images/aero.jpeg"
import { getWeekNumber } from "../tools/dateManager"
import { inDays } from "../Datas/constants"
import useAsyncEffect from "use-async-effect"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { flightDateFinderURL, groundFunctionURL, memberURL } from "../Datas/urls"
import { INITIAL_CREWMEMBER } from "../Datas/initialObjects"
import { CrewMember, Etat400View, Flight } from "../types/Objects"
import { buildEtat400View } from "../tools/buildEtat400"

export const Etat400 = ({ match }: RouteComponentProps<{ monday: string }>): JSX.Element => {
	const [chief, setChief] = useState<CrewMember>(INITIAL_CREWMEMBER)
	const [second, setSecond] = useState<CrewMember>(INITIAL_CREWMEMBER)
	const [ops, setOps] = useState<CrewMember>(INITIAL_CREWMEMBER)
	const [flights, setFlights] = useState<Etat400View[]>([])
	useAsyncEffect(async () => {
		const chief = await postFetchRequest<CrewMember>(groundFunctionURL, { function: "Commandant" })
		const second = await postFetchRequest<CrewMember>(groundFunctionURL, { function: "Commandant en second" })
		const ops = await postFetchRequest<CrewMember>(groundFunctionURL, { function: "CSO" })
		if (typeof chief !== "string") setChief(chief)
		if (typeof second !== "string") setSecond(second)
		if (typeof ops !== "string") setOps(ops)
		const flights = await postFetchRequest<Flight[]>(flightDateFinderURL, {
			start: new Date(parseInt(match.params.monday)),
			end: new Date(parseInt(match.params.monday) + 7 * inDays),
		})
		const members = await getFetchRequest<CrewMember[]>(memberURL)
		if (typeof flights !== "string" && typeof members !== "string") setFlights(buildEtat400View(flights, members))
	}, [])
	return (
		<div className='m-2'>
			<div className='row'>
				<div className='col-md-2 text-center'>
					<img src={logo} className='d-inline ms-2' />
				</div>
				<div className='col-md-8 text-center text-primary'>
					<h6 className='my-1 border border-primary rounded p-1'>ETAT 400</h6>
					<h6 className='my-1 border border-primary rounded p-1'>{`SEMAINE ${getWeekNumber(
						parseInt(match.params.monday)
					)}`}</h6>
					<h6 className='my-1 border border-primary rounded p-1'>{`Du ${new Date(
						parseInt(match.params.monday)
					).toLocaleDateString()} au ${new Date(
						parseInt(match.params.monday) + 6 * inDays
					).toLocaleDateString()}`}</h6>
				</div>
				<div className='col-md-2 text-center'>
					<img src={aero} className='d-inline ms-2' />
				</div>
			</div>
			<div className='row mt-3 justify-content-center'>
				<div className='col-md-8'>
					<table className='table text-start table-bordered'>
						<tr>
							<td className='border border-dark p-1'>CHEF DET</td>
							<td className='border border-dark p-1'>{`${chief.rank} ${chief.surName}`}</td>
							<td className='border border-dark p-1'>{chief.tel}</td>
							<td className='border border-dark p-1'>ASTREINTE JETAV</td>
							<td className='border border-dark p-1'>90 39 68</td>
						</tr>
						<tr>
							<td className='border border-dark p-1'>ADJOIN DET</td>
							<td className='border border-dark p-1'>{`${second.rank} ${second.surName}`}</td>
							<td className='border border-dark p-1'>{second.tel}</td>
							<td className='border border-dark p-1'></td>
							<td className='border border-dark p-1'></td>
						</tr>
						<tr>
							<td className='border border-dark p-1'>CHEF OPS</td>
							<td className='border border-dark p-1'>{`${ops.rank} ${ops.surName}`}</td>
							<td className='border border-dark p-1'>{ops.tel}</td>
							<td className='border border-dark p-1'></td>
							<td className='border border-dark p-1'></td>
						</tr>
						<tr>
							<td className='border border-dark p-1'>FAX</td>
							<td className='border border-dark p-1'></td>
							<td className='border border-dark p-1'>44 45 84</td>
							<td className='border border-dark p-1'></td>
							<td className='border border-dark p-1'></td>
						</tr>
					</table>
				</div>
			</div>
			<div className='text-decoration-underline'>1. VOLS</div>
			<table className='table mt-2 text-center table-bordered'>
				<tr>
					<th className='p-1'>DATE</th>
					<th>EQ</th>
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
						<td className='p-1'>{flight.date}</td>
						<td>{flight.crew}</td>
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
			<div>2. PREVISION MENSUELLE</div>
			<div className='mb-5'>Aucune prévision durant cette période</div>
			<div>2. MOUVEMENTS</div>
			<div>Aucune mouvement durant cette période</div>
			<div className='row'>
				<div className='col-md-10'></div>
				<div className='col-md-2 text-center'>{`${ops.rank} ${ops.surName}`}</div>
			</div>
		</div>
	)
}
