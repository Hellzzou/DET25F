import React from "react"
import { useState } from "react"
import { Card } from "react-bootstrap"
import useAsyncEffect from "use-async-effect"
import { CrewTPACard } from "../BasicComponents/CrewTPACard"
import { INITIAL_CREWMEMBER } from "../Datas/crewMember"
import { DB_URL } from "../Datas/datas"
import { getQuadri } from "../tools/colorManager"
import { getFetchRequest } from "../tools/fetch"
import { PilotMiniCardProps } from "../types/Articles"
import { crewMember } from "../types/Objects"

export const PilotMiniCard = (props: PilotMiniCardProps): JSX.Element => {
	const [fullName, sertFullName] = useState<crewMember>(INITIAL_CREWMEMBER)
	useAsyncEffect(async () => {
		const members = await getFetchRequest(DB_URL + "crewMembers")
		sertFullName(members.find((member: crewMember) => member.trigram === props.pilot.name))
	}, [])
	return (
		<Card className='text-center'>
			<Card.Header className='p-1'>{`${fullName.rank} ${fullName.firstName} ${fullName.surName}`}</Card.Header>
			<Card.Body className='p-2'>
				<div className='row'>
					<div className='col-md-6'>
						<CrewTPACard member={props.pilot} date={props.date} />
					</div>
					<div className='col-md-6'>
						<Card.Title>TPA Individuel</Card.Title>
						<div className='row'>
							<div className='col-md-6 text-start'>ATT PC: </div>
							<div
								className={`col-md-6 text-end fw-bold text-${getQuadri(
									props.pilot.TPA.ATTPC,
									props.date
								)}`}>
								{props.pilot.TPA.ATTPC.toLocaleDateString()}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-6 text-start'>IFR : </div>
							<div
								className={`col-md-6 text-end fw-bold text-${getQuadri(
									props.pilot.TPA.IFR,
									props.date
								)}`}>
								{props.pilot.TPA.IFR.toLocaleDateString()}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-6 text-start'>LCS : </div>
							<div
								className={`col-md-6 text-end fw-bold text-${getQuadri(
									props.pilot.TPA.LCS,
									props.date
								)}`}>
								{props.pilot.TPA.LCS.toLocaleDateString()}
							</div>
						</div>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}
