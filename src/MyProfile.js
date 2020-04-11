import React from 'react';
import {Link} from "react-router-dom";
import firebase from './firebase'
import withAuthorization from "./withAuthorization";



class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:null,
            username:'',
            firstName:'',
            lastName:'',
            passwordOne:'',
            passwordTwo:'',
            email: '',
            phone: '',
            error:null

        };

        this.onSubmit = this.onSubmit.bind(this);
        this.profileUpdate=this.profileUpdate.bind(this)

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
           /*
            const profileRef= firebase.database().ref(`profile`+u.uid)
            profileRef.on('value', snapshot=>{
                let profile = snapshot.val()

                this.setState({

                    firstName: profile.firstName,
                    lastName:profile.lastName,
                    phone: profile.phone


                })
            })

        });*/



    })}



    profileUpdate(){

        let user = firebase.auth().currentUser
        const ref = firebase
            .database()
            .ref(`profile/${user.uid}`);
        ref.push({

            username: this.state.username,
            firstName: this.state.firstName,
            lastName:this.state.lastName,
            phone:this.state.phone,
            email: this.state.email

        });
        alert("your have updated your profile")

        console.log(this.state)

    }

  onSubmit =event =>{


      firebase.auth().onAuthStateChanged(u=>{
          console.log(u)
          if(u) {
              u.updatePassword(this.state.passwordTwo).then(()=>{
                  alert('you have reset your password')
              })

          }
              });


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
