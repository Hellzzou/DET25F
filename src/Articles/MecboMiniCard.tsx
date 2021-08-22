import React, { useState } from "react"
import { Card } from "react-bootstrap"
import useAsyncEffect from "use-async-effect"
import { CrewTPACard } from "../BasicComponents/CrewTPACard"
import { INITIAL_CREWMEMBER } from "../Datas/crewMember"
import { DB_URL } from "../Datas/datas"
import { getAnnual, getQuadri } from "../tools/date"
import { getFetchRequest } from "../tools/fetch"
import { MecboMiniCardProps } from "../types/Articles"
import { crewMember } from "../types/Objects"

export const MecboMiniCard = (props: MecboMiniCardProps): JSX.Element => {
	const [fullName, sertFullName] = useState<crewMember>(INITIAL_CREWMEMBER)
	useAsyncEffect(async () => {
		const members = await getFetchRequest(DB_URL + "crewMembers")
		sertFullName(members.find((member: crewMember) => member.trigram === props.mecbo.name))
	}, [])
	return (
		<Card className='text-center'>
			<Card.Header className='p-1'>{`${fullName.rank} ${fullName.firstName} ${fullName.surName}`}</Card.Header>
			<Card.Body className='p-2'>
				<div className='row'>
					<div className='col-md-6'>
						<CrewTPACard member={props.mecbo} date={props.date} />
					</div>
					<div className='col-md-6'>
						<Card.Title>TPA Individuel</Card.Title>
						<div className='row'>
							<div className='col-md-6 text-start'>LCS: </div>
							<div
								className={`col-md-6 text-end fw-bold text-${getQuadri(
									props.mecbo.TPA.LCS,
									props.date
								)}`}>
								{props.mecbo.TPA.LCS.toLocaleDateString()}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-6 text-start'>Photos : </div>
							<div
								className={`col-md-6 text-end fw-bold text-${getQuadri(
									props.mecbo.TPA.PH[0],
									props.date
								)}`}>
								{props.mecbo.TPA.PH[0].toLocaleDateString()}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-6 text-start'>Photos : </div>
							<div
								className={`col-md-6 text-end fw-bold text-${getQuadri(
									props.mecbo.TPA.PH[1],
									props.date
								)}`}>
								{props.mecbo.TPA.PH[1].toLocaleDateString()}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-6 text-start'>Trappe : </div>
							<div
								className={`col-md-6 text-end fw-bold text-${getAnnual(
									props.mecbo.TPA.TRP,
									props.date
								)}`}>
								{props.mecbo.TPA.TRP.toLocaleDateString()}
							</div>
						</div>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}
