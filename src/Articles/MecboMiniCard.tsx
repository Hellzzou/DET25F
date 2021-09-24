import React, { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { CrewTPACard } from "../BasicComponents/CrewTPACard"
import { INITIAL_CREWMEMBER } from "../Datas/initialObjects"
import { memberURL } from "../Datas/urls"
import { buildMecboPurcentage } from "../tools/buildMemberActions"
import { getAnnual, getQuadri } from "../tools/colorManager"
import { getFetchRequest } from "../tools/fetch"
import { MecboMiniCardProps } from "../types/Articles"
import { CrewMember } from "../types/Objects"

export const MecboMiniCard = (props: MecboMiniCardProps): JSX.Element => {
	const [fullName, sertFullName] = useState<CrewMember>(INITIAL_CREWMEMBER)
	const [purcentage, setPurcentage] = useState({ value: "", color: "dark" })
	useAsyncEffect(async () => {
		const members = await getFetchRequest<CrewMember[]>(memberURL)
		if (typeof members !== "string") {
			const member = members.find(({ trigram }) => trigram === props.mecbo.name)
			if (member) sertFullName(member)
		}
		const purcentage = buildMecboPurcentage(props.mecbo.TPA, props.date)
		setPurcentage({
			value: purcentage + " %",
			color: purcentage < 66 ? (purcentage < 50 ? "danger" : "warning") : "success",
		})
	}, [])
	return (
		<div className='card m-1'>
			<div className='card-body card-body-color py-2'>
				<div className='row my-0'>
					<h5 className='col-md-9 text-center py-0'>{`${fullName.rank} ${fullName.firstName} ${fullName.surName}`}</h5>
					<h5 className={`col-md-3 text-${purcentage.color} text-center py-0`}>{`${purcentage.value}`}</h5>
				</div>
				<hr className='m-2'></hr>
				<div className='row'>
					<div className='col-md-6'>
						<CrewTPACard member={props.mecbo} date={props.date} />
					</div>
					<div className='col-md-6'>
						<h6 className='card-subtitle mb-2 text-muted text-center'>TPA Individuel</h6>
						<div className='row'>
							<div className='col-md-6 text-start'>LCS:</div>
							<div className={`col-md-6 text-end  text-${getQuadri(props.mecbo.TPA.LCS, props.date)}`}>
								{props.mecbo.TPA.LCS.toLocaleDateString()}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-6 text-start'>Photos:</div>
							<div className={`col-md-6 text-end  text-${getQuadri(props.mecbo.TPA.PH[0], props.date)}`}>
								{props.mecbo.TPA.PH[0].toLocaleDateString()}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-6 text-start'>Photos:</div>
							<div className={`col-md-6 text-end  text-${getQuadri(props.mecbo.TPA.PH[1], props.date)}`}>
								{props.mecbo.TPA.PH[1].toLocaleDateString()}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-6 text-start'>Trappe:</div>
							<div className={`col-md-6 text-end  text-${getAnnual(props.mecbo.TPA.TRP, props.date)}`}>
								{props.mecbo.TPA.TRP.toLocaleDateString()}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
