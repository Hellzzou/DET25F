import React from "react"
import { Toast } from "react-bootstrap"
import ToastContainer from "react-bootstrap/ToastContainer"
import { AlertToastProps } from "../types/BasicComponents"

export const AlertToast = (props: AlertToastProps): JSX.Element => {
	return (
		<ToastContainer className='p-3' position='bottom-end'>
			<Toast className={`bg-${props.color}`} delay={3000} show={props.show} autohide onClose={props.onClose}>
				<Toast.Header closeButton={false}>
					<strong>Acitivités DET 25F</strong>
				</Toast.Header>
				<Toast.Body>{props.info}</Toast.Body>
			</Toast>
		</ToastContainer>
	)
}
