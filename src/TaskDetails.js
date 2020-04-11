import React, {Component} from "react";
import Button from '@material-ui/core/Button'

import './TaskDetails.css'
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TaskDetails_detail from "./TaskDetails_detail";
import {auth, database} from "./firebase";


class TaskDetails extends Component {
    constructor() {
        super();
        this.state = {
            isPoster: true,
            uid: null
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        if(auth.currentUser != null) {
            console.log(auth.currentUser.uid);
        }
        auth.onAuthStateChanged(user =>{
            if(user){
                let ref = database.ref("user-task/" + user.uid);
                console.log(this.state.uid);
                this.data = ref.on("value", (snapshot) => {
                    const task = [];
                    snapshot.forEach(data => {
                        task.push(data.val());
                    });
                    task.forEach(function (entry)  {
                        if(true){
                            console.log(entry)
                        }
                    });
                    console.log(snapshot.val());
                    if(true) {
                        this.setState({
                                isPoster : true
                            }
                        )
                    }
                });
                this.setState({
                    uid : user.uid
                })
                console.log(this.state.uid)
            }
            else {
                console.log("user not logged in")
            }
        })






    }

    render() {

        return (
            <Container fixed>
                <hr/>
                <div className="Task">
                    <h1 className="TaskHeader">Task Details</h1>
                    <Paper elevation={5}>
                        <TaskDetails_detail id={this.props.match.params.id}/>

                        <Button disabled = {!this.state.isPoster} variant="contained" color="primary" href={'/apply/'+this.props.match.params.id}>Apply</Button>


                        <Button variant="contained" color="red" href={'/market'}>Back</Button>

                    </Paper>
                </div>
            </Container>

        )
    }

}

export default TaskDetails