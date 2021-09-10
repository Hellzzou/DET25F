import React from "react"
import { Card } from "react-bootstrap"
import { Button } from "../BasicComponents/Button"
import { DBCardProps } from "../types/Sections"

export const DBCard = (props: DBCardProps): JSX.Element => {
	return (
		<Card className='text-center'>
			<Card.Header className='fw-bold fs-4'>{props.title}</Card.Header>
			<Card.Body>
				<Card.Text>{props.infos}</Card.Text>
				<Card.Text className='text-warning'>{props.warning}</Card.Text>
			</Card.Body>
			<Card.Footer>
				<Button size={10} buttonContent='Modifier' buttonColor='primary' onClick={props.onClick} />
			</Card.Footer>
		</Card>
	)
}
