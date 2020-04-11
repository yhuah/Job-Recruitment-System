import React from 'react';
import firebase from './firebase'
import withAuthorization from "./withAuthorization";



class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:null,
            username:firebase.auth().currentUser.displayName,
            oldPassword:'',
            passwordOne:'',
            passwordTwo:'',
            email: firebase.auth().currentUser.email,
            phone: '',
            error:null

        };

        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount(){

        firebase.auth().onAuthStateChanged(u=>{
            console.log(u)
            if(u){
                this.setState({
                    user: u,
                    username: u.displayName,
                    email:u.email

                });





            }




    })}



    reauthenticate= (currentPassword)=>{
        var user= firebase.auth().currentUser
        var cred = firebase.auth.EmailAuthProvider.credential(user.email,currentPassword)
        return user.reauthenticateWithCredential(cred)
    }

    onSubmit =()=>{


        if (this.state.passwordOne!==this.state.passwordTwo){
            alert("Password do not match")
            return;
        }


        console.log(this.state)
        this.reauthenticate(this.state.oldPassword).then(()=> {


            var user = firebase.auth().currentUser
            user.updatePassword(this.state.passwordOne).then(() => {
                alert("password was changed")
            }).catch((error) => {
                alert(error.message)
            });

        }).catch((error)=>{
            alert(error.message)

        })




    }



    logOutUser = e => {
        e.preventDefault();
        this.setState({
            displayName: null,
            userID: null,
            user: null
        });

        firebase
            .auth()
            .signOut()
            .then(() => {
                this.props.history.push('/login');
            });
    };


    render() {
        return (
            <div className="container-fluid" style={{background: "#e6e6e6", height: "100vh"}}>
                <div className="container">
                    <h1>
                        Profile
                    </h1>
                    <div className="p-2" style={{background: "#FFFFFF"}}>
                        <div className="form-group row">
                            <label htmlFor="username" className="col-sm-2 col-form-label">
                                <span className="mr-2">Username</span>
                            </label>
                            <div className="col-sm-10">
                                <input className="form-control" id="username"
                                       value={this.state.username} placeholder="Mike"
                                       disabled="disabled"
                                       onChange={(event) => this.setState({username: event.target.value})
                                       }/>
                            </div>
                        </div>


                        <div className="form-group row">
                            <label htmlFor="email" className="col-sm-2 col-form-label">
                                <span className="mr-2">Email</span>
                            </label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="email"
                                       disabled="disabled"
                                       value={this.state.email} placeholder="alice@wonderland.com"
                                       onChange={(event) => this.setState({email: event.target.value})}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="firstName" className="col-sm-2 col-form-label">
                                <span className="mr-2">Old password</span>
                            </label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="firstname"
                                       value={this.state.oldPassword} placeholder="*******"
                                       onChange={(event) => this.setState({oldPassword: event.target.value})}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="firstName" className="col-sm-2 col-form-label">
                                <span className="mr-2">Change password</span>
                            </label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="firstname"
                                       value={this.state.passwordOne} placeholder="*******"
                                       onChange={(event) => this.setState({passwordOne: event.target.value})}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="password" className="col-sm-2 col-form-label">
                                <span className="mr-2">Confirm password</span>
                            </label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="email"
                                       value={this.state.passwordTwo} placeholder="********"
                                       onChange={(event) => this.setState({passwordTwo: event.target.value})}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-10">
                                <button className="btn btn-primary btn-block btn-success"
                                        onClick={this.onSubmit}

                                >
                                    Change password
                                    <i className="fas fa-pen"></i>
                                </button>
                            </div>
                        </div>


                        <div className="form-group row">
                            <lable className="col-sm-2 col-form-label"></lable>
                            <div className="col-sm-10">


                                    <button className="btn  btn-block btn-danger" onClick={this.logOutUser}
                                    > Logout
                                    </button>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)( Profile);
