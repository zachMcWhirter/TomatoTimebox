import React, { useContext, useState } from "react";
import { Card, CardBody, Label, Input } from "reactstrap";
import { Link, useParams } from "react-router-dom"
import { TaskContext } from "../../providers/TaskProvider";


export default function NoteCard({ note }) {

    const { id } = useParams();

    const { task } = useContext(TaskContext);

    return (
        <Card className="m-4">
            <CardBody>

                {/* <Link to={`/notesbytask/${task.id}`}>
                    <button className="tag-btn">Details</button>
                </Link> */}
                <h3 className="note-content">{note.content} </h3>
                <h5 className="note-createDateTime">Note Created:
                {new Intl.DateTimeFormat('en-US').format(new Date(note.createDateTime))}</h5>
                <Link to={`/notes/edit/${note.id}`}>
                    <button className="tag-btn">Edit</button>
                </Link>
                <Link to={`/notes/delete/${note.id}`}>
                    <button className="tag-btn">Delete</button>
                </Link>
            </CardBody>
            <br />
        </Card>
    );
}