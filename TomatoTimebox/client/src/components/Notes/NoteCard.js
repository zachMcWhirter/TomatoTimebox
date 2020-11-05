import React from "react";
import { CardBody } from "reactstrap";
import { Link } from "react-router-dom"

export default function NoteCard({ note }) {

    return (

        <CardBody>
            <div className="extra-box-for-note-card">
                <div>
                    <p className="note-createDateTime">
                        {new Intl.DateTimeFormat('en-US').format(new Date(note.createDateTime))}</p>
                    <h3 className="note-content">{note.content} </h3>
                </div>
                <div>
                    <Link to={`/notes/edit/${note.id}`}>
                        <button className="tag-btn">Edit</button>
                    </Link>
                    <Link to={`/notes/delete/${note.id}`}>
                        <button className="tag-btn">Delete</button>
                    </Link>
                </div>
            </div>
        </CardBody>
    );
}