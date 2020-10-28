import React from "react";
import { TaskContext } from "../../providers/TaskProvider";
import { Card, CardBody, Button } from "reactstrap";



export default function TaskCard({ task }) {
    const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

    console.log(task)
    console.log("task.isFinished", task.isFinished)

    return (

        <Card className="m-4">
            <CardBody>
                <h4>{task.name}</h4>
                <p className="task-description">Description: {task.description} </p>
                <p className="task-description">Category: {task.category.name} </p>
                <p className="task-description">Task Completed: {task.isFinished} </p>
                {/* <em className="userProfile-displayName">{task.} </em> */}

            </CardBody>
            <br />
        </Card>

    );
}


//     return (
//         <>
//             <div className="authorPostItem">
//                 <div className="authorButtonsOverlay">
//                     <div className="imageButtonHeader">
//                         {/* {!post.imageLocation ?
//                             <a className="defaultPostImagePreview" href={`/posts/details/${post.id}`}>
//                                 <img className="defaultImageBackground" src={defaultImage} onerror="this.onerror=null;this.src=https://res.cloudinary.com/dhduglm4j/image/upload/v1602603540/tabloid_euehri.png;" alt="image" />
//                             </a>
//                             : <a className="postImagePreview" href={`/posts/details/${post.id}`}>
//                                 <img className="imageBackground" src={post.imageLocation} alt="image" />
//                             </a>
//                         } */}



//                     </div>

//                     <div className="authorPostDetails">
//                         <div className="authorPostItems">
//                             <div className="authorPostHeaderLeft">
//                                 <h5 className="apht">{task.name}</h5>
//                                 <em className="postsAuthor">{task.userProfile.displayName} </em>
//                             </div>
//                             {/* <div className="authorPostHeaderRight">
//                                 <h5>{task.category.name}</h5>
//                                 <i>{new Intl.DateTimeFormat('en-US').format(new Date(task.publishDateTime))}</i>
//                             </div> */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }




