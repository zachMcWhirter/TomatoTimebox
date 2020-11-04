import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Login() {
    const history = useHistory();
    const { login } = useContext(UserProfileContext);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then(() => history.push("/"))
            .catch(() => alert("Invalid email or password"));
    };

    return (
        <>
            <Form classname="login-register" onSubmit={loginSubmit}>
                <div>
                    <fieldset >
                        <FormGroup style={{ display: "flex", justifyContent: "space-between" }}>
                            <Label for="email">Email:</Label>
                            <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup style={{ display: "flex", justifyContent: "space-between" }}>
                            <Label for="password">Password:</Label>
                            <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                        </FormGroup>
                        <div>
                            <br />
                            <FormGroup className="register-buttons">
                                <Button className="btn-red">Login</Button>
                                <em>
                                    Not registered? <Link to="register" style={{ color: "white", fontWeight: "bold", textDecoration: "underline" }}>Register Here</Link>
                                </em>
                            </FormGroup>
                        </div>
                    </fieldset>
                </div>
            </Form>
        </>
    );
}