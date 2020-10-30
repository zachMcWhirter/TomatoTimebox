import React, { useContext, useState } from "react";
import { Card, CardBody, Label, Input } from "reactstrap";
import { Link } from "react-router-dom"
import { NoteContext } from "../../providers/NoteProvider";


export default function NoteCard({ note }) {


    const { task } = useContext(NoteContext);

    return (
        <Card className="m-4">
            <CardBody>
                <h4>{task.name}</h4>
                <Link to={`/notesbytask/${task.id}`}>
                    <button className="tag-btn">Details</button>
                </Link>
                {/* <Link to={`/notes/edit/${id}`}>
                    <button className="tag-btn">Edit</button>
                </Link>
                <Link to={`/notes/delete/${id}`}>
                    <button className="tag-btn">Delete</button>
                </Link> */}
                <p className="note-content">Content: {note.content} </p>
                <p className="note-createDateTime">Note Created:
                {new Intl.DateTimeFormat('en-US').format(new Date(note.createDateTime))}</p>
            </CardBody>
            <br />
        </Card>
    );
}