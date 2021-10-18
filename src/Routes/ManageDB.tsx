import React from "react"
import { DBInfos } from "../Datas/constants"
import { DBCard } from "../Sections/DBCard"
import { MainNavBar } from "../Sections/MainNavbar"

export const ManageDB = (): JSX.Element => {
	return (
		<div className='alegreya'>
			<MainNavBar />
			<div className='row m-2'>
				{DBInfos.map((card) => (
					<div key={DBInfos.indexOf(card)} className='col-md-4'>
						<DBCard title={card.title} infos={card.infos} warning={card.warning} url={card.url} />
					</div>
				))}
			</div>
		</div>
	)
}
