import React, { useState } from "react"
import loginbg from "../images/loginbg1.jpg"
import { checkUser } from "../tools/user"
import { useHistory } from "react-router-dom"
import { Legend } from "../BasicComponents/Legend"
import { Label } from "../BasicComponents/Label"
import { Input } from "../BasicComponents/input"
import { formValidity, textIsNotNull } from "../tools/validators"
import { Button } from "../BasicComponents/Button"
import { INITIAL_FALSE_CONTROL } from "../Datas/initialObjects"
import { currentMonday } from "../Datas/constants"

export const Login = (): JSX.Element => {
	const [login, setLogin] = useState(INITIAL_FALSE_CONTROL)
	const [password, setPassword] = useState(INITIAL_FALSE_CONTROL)
	const [loginError, setLoginError] = useState("")
	const history = useHistory()
	const divStyle = {
		backgroundImage: `url(${loginbg})`,
		backgroundSize: "cover",
		height: "100vh",
	}
	const handleLogin = () => {
		;(async () => {
			const findUser = await checkUser(login.value, password.value)
			if (typeof findUser !== "string") {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				sessionStorage.setItem("token", findUser.token!)
				history.push(`/activities/${currentMonday}`)
			} else setLoginError(findUser)
		})()
	}
	return (
		<div className='alegreya'>
			<form action='#' className='row justify-content-center align-items-center bg-image' style={divStyle}>
				<div className='col-md-5'>
					<fieldset className='border border-dark text-dark rounded py-4 bg-light'>
						<Legend title='Connexion' />
						<div className='form-group row m-3 mt-5'>
							<Label size={4} title='Identifiant :' />
							<Input
								size={8}
								backgroundColor='dark'
								textColor='light'
								validator={textIsNotNull}
								type='text'
								min={0}
								max={0}
								control={login}
								setControl={setLogin}
								placeholder='Entrez votre identifiant...'
							/>
						</div>
						<div className='form-group row m-3'>
							<Label size={4} title='Mot de passe :' />
							<Input
								size={8}
								backgroundColor='dark'
								textColor='light'
								validator={textIsNotNull}
								type='password'
								min={0}
								max={0}
								control={password}
								setControl={setPassword}
								placeholder='Entrez votre mot de passe...'
							/>
						</div>
						<div className='row m-1 justify-content-center'>
							<Button
								buttonColor='primary'
								buttonContent='LOGIN'
								size={8}
								disabled={!formValidity([login, password])}
								onClick={handleLogin}
							/>
						</div>
						<div className='text-center mt-3 text-danger fw-bold'>{loginError}</div>
					</fieldset>
				</div>
			</form>
		</div>
	)
}
