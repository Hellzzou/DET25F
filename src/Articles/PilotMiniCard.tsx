import React from "react"
import { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { CrewTPACard } from "../BasicComponents/CrewTPACard"
import { INITIAL_CREWMEMBER } from "../Datas/crewMember"
import { memberURL } from "../Datas/datas"
import { getQuadri } from "../tools/colorManager"
import { getFetchRequest } from "../tools/fetch"
import { PilotMiniCardProps } from "../types/Articles"
import { crewMember } from "../types/Objects"

export const PilotMiniCard = (props: PilotMiniCardProps): JSX.Element => {
	const [fullName, sertFullName] = useState<crewMember>(INITIAL_CREWMEMBER)
	useAsyncEffect(async () => {
		const members = await getFetchRequest<crewMember[]>(memberURL)
		if (typeof members !== "string") {
			const member = members.find(({ trigram }) => trigram === props.pilot.name)
			if (member) sertFullName(member)
		}
	}, [])
	return (
		<div className='card m-1'>
			<div className='card-body card-body-color py-2'>
				<h5 className='card-title text-center py-0'>{`${fullName.rank} ${fullName.firstName} ${fullName.surName}`}</h5>
				<hr className='m-2'></hr>
				<div className='row'>
					<div className='p-1 col-md-6'>
						<CrewTPACard member={props.pilot} date={props.date} />
					</div>
					<div className='col-md-6'>
						<h6 className='card-subtitle mb-2 text-muted text-center'>TPA Individuel</h6>
						<div className='row'>
							<div className='col-md-5 text-start'>ATT PC: </div>
							<div className={`col-md-7 text-end text-${getQuadri(props.pilot.TPA.ATTPC, props.date)}`}>
								{props.pilot.TPA.ATTPC.toLocaleDateString()}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-5 text-start'>IFR : </div>
							<div className={`col-md-7 text-end  text-${getQuadri(props.pilot.TPA.IFR, props.date)}`}>
								{props.pilot.TPA.IFR.toLocaleDateString()}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-5 text-start'>LCS : </div>
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
