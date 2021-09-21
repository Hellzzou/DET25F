import React from "react"
import { DBInfos } from "../Datas/DbInfos"
import { DBCard } from "../Sections/DBCard"
import { MainNavBar } from "../Sections/MainNavbar"

export const ManageDB = (): JSX.Element => {
	return (
		<div className='alegreya'>
			<MainNavBar />
			<div className='row m-2'>
				<div className='col-md-4'>
					<DBCard
						title='AVIONS'
						infos={DBInfos.aircraft.infos}
						warning={DBInfos.aircraft.warning}
						url='/aircrafts'
					/>
				</div>
				<div className='col-md-4'>
					<DBCard title='FUEL' infos={DBInfos.fuel.infos} warning={DBInfos.fuel.warning} url='/fuels' />
				</div>
				<div className='col-md-4'>
					<DBCard
						title='CONFIGS'
						infos={DBInfos.configs.infos}
						warning={DBInfos.configs.warning}
						url='/configs'
					/>
				</div>
			</div>
			<div className='row m-2'>
				<div className='col-md-4'>
					<DBCard title='ZONES' infos={DBInfos.areas.infos} warning={DBInfos.areas.warning} url='/areas' />
				</div>
				<div className='col-md-4'>
					<DBCard
						title='ZONES ZEENC'
						infos={DBInfos.NCAreas.infos}
						warning={DBInfos.NCAreas.warning}
						url='/NCAreas'
					/>
				</div>
				<div className='col-md-4'>
					<DBCard
						title='GROUPES'
						infos={DBInfos.groups.infos}
						warning={DBInfos.groups.warning}
						url='/groups'
					/>
				</div>
			</div>
			<div className='row m-2'>
				<div className='col-md-4'>
					<DBCard
						title='TYPES DE VOL'
						infos={DBInfos.types.infos}
						warning={DBInfos.types.warning}
						url='/types'
					/>
				</div>
				<div className='col-md-4'>
					<DBCard
						title="MEMBRES D'EQUIPAGE"
						infos={DBInfos.crewMembers.infos}
						warning={DBInfos.crewMembers.warning}
						url='/crewMembers'
					/>
				</div>
				<div className='col-md-4'>
					<DBCard
						title='UTILISATEURS'
						infos={DBInfos.users.infos}
						warning={DBInfos.users.warning}
						url='/users'
					/>
				</div>
			</div>
		</div>
	)
}
