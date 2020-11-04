import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";


export default function Register() {
    const history = useHistory();
    const { register } = useContext(UserProfileContext);

    const [displayName, setDisplayName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Do better.");
        } else {
            const userProfile = { displayName, email };
            register(userProfile, password)
                .then(() => history.push("/"));
        }
    };

    return (
        <>
            <Form onSubmit={registerClick}>
                <div classname="login-register">
                    <fieldset>
                        <FormGroup style={{ display: "flex", justifyContent: "space-between" }}>
                            <Label htmlFor="displayName">DisplayName:</Label>
                            <Input id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
                        </FormGroup>


                        <FormGroup style={{ display: "flex", justifyContent: "space-between" }}>
                            <Label for="email">Email:</Label>
                            <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                        </FormGroup>

                        <FormGroup style={{ display: "flex", justifyContent: "space-between" }}>
                            <Label for="password">Password:</Label>
                            <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                        </FormGroup>
                        <FormGroup style={{ display: "flex", justifyContent: "space-between" }}>
                            <Label for="confirmPassword">Confirm Password:</Label>
                            <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                        </FormGroup>
                        <br />
                        <FormGroup className="register-buttons">
                            <Button className="btn-red">Register</Button>
                            <em>
                                Already registered? <Link to="login" style={{ color: "white", fontWeight: "bold", textDecoration: "underline" }}>Sign In</Link>
                            </em>

                        </FormGroup>

                    </fieldset>
                </div>
            </Form>
        </>
    );
}