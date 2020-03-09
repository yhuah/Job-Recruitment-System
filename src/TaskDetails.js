import React, {Component} from "react";
import Button from '@material-ui/core/Button'

import './TaskDetails.css'
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const fakeData = {
    id: 0,
    taskTitle: "Feed my cat",
    userName: "Van",
    salary: "20",
    details: "I am going to leave school next week and I need some one who loves cat to" +
        "take care of my cat"
}

class TaskDetails extends Component {
    render() {
        return (
            <Container fixed>
                <hr/>
                <div className="Task">
                    <h1 className="TaskHeader">Task Details</h1>
                    <Paper elevation={5}>
                        <div className="TaskInfo">
                            <Typography variant="h6" align="center" component="h2" gutterBottom>
                                Task:
                                <h6>
                                    {fakeData.taskTitle}
                                </h6>
                            </Typography>
                            <hr/>
                            <Typography variant="h6" align="center" component="h2" gutterBottom>
                                Poster:
                                <h6>
                                    {fakeData.userName}
                                </h6>
                            </Typography>
                            <hr/>
                            <Typography variant="h6" align="center" component="h2" gutterBottom>
                                Task Description:
                                <h6>
                                    {fakeData.details}
                                </h6>
                            </Typography>
                                <hr/>
                            <Typography variant="h6" align="center" component="h2" gutterBottom>
                                Salary:
                                <h6>
                                    {fakeData.salary}
                                </h6>
                            </Typography>
                            <hr/>
                                <Button variant="contained" color="primary">Apply</Button>
                                <Button variant="contained" color="red" >Back</Button>

                        </div>
                    </Paper>
                </div>
            </Container>

    )
    }

    }

    export default TaskDetails