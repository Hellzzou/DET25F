import React from "react"
import { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { CrewTPACard } from "../BasicComponents/CrewTPACard"
import { INITIAL_CREWMEMBER } from "../Datas/initialObjects"
import { memberURL } from "../Datas/urls"
import { buildPilotPurcentage } from "../tools/buildMemberActions"
import { getQuadri } from "../tools/colorManager"
import { getFetchRequest } from "../tools/fetch"
import { PilotMiniCardProps } from "../types/Articles"
import { CrewMember } from "../types/Objects"

export const PilotMiniCard = (props: PilotMiniCardProps): JSX.Element => {
	const [fullName, sertFullName] = useState<CrewMember>(INITIAL_CREWMEMBER)
	const [purcentage, setPurcentage] = useState({ value: "", color: "dark" })
	useAsyncEffect(async () => {
		const members = await getFetchRequest<CrewMember[]>(memberURL)
		const member = members.find(({ trigram }) => trigram === props.pilot.name)
		if (member) sertFullName(member)
		const purcentage = buildPilotPurcentage(props.pilot.TPA, props.date)
		setPurcentage({
			value: purcentage + " %",
			color: purcentage < 66 ? (purcentage < 50 ? "danger" : "warning") : "success",
		})
	}, [props.date])
	return (
		<div className='card m-1'>
			<div className='card-body card-body-color py-2'>
				<div className='row my-0'>
					<h5 className='col-md-9 text-center py-0'>{`${fullName.rank} ${fullName.firstName} ${fullName.surName}`}</h5>
					<h5 className={`col-md-3 text-${purcentage.color} text-center py-0`}>{`${purcentage.value}`}</h5>
				</div>
				<hr className='m-2'></hr>
				<div className='row'>
					<div className='p-1 col-md-6'>
						<CrewTPACard member={props.pilot} date={props.date} />
					</div>
					<div className='col-md-6'>
						<h6 className='card-subtitle mb-2 text-muted text-center'>TPA Individuel</h6>
						<div className='row'>
							<div className='col-md-5 text-start'>ATT PC:</div>
							<div className={`col-md-7 text-end text-${getQuadri(props.pilot.TPA.ATTPC, props.date)}`}>
								{props.pilot.TPA.ATTPC.toLocaleDateString()}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-5 text-start'>IFR:</div>
							<div className={`col-md-7 text-end  text-${getQuadri(props.pilot.TPA.IFR, props.date)}`}>
								{props.pilot.TPA.IFR.toLocaleDateString()}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-5 text-start'>LCS:</div>
							<div className={`col-md-7 text-end  text-${getQuadri(props.pilot.TPA.LCS, props.date)}`}>
								{props.pilot.TPA.LCS.toLocaleDateString()}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
