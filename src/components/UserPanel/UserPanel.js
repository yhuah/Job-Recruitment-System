
import React from 'react'

import {Menu,Form,Dropdown} from 'semantic-ui-react'
import firebase from "../../firebase"
class NavBar extends React.Component {


    dropdownOptions =() =>[

        {
            key:"user",

            text:<span>Signed in as <strong>User</strong></span>,
            disabled:true

        },
        {
            key:"avatar",
            text:<span>Change Avatar</span>,

        },
        { key:"sign out",
            text:<span onClick={this.handleSignout}> Sign Out</span>
        }
    ];

    handleSignout =() =>{
        firebase.auth()
            .signOut()
            .then(() =>console.log('signed out'))

    }



    render() {


        return(


            <Menu borderless className = 'top-menu' fixed-top>
                <Menu.Item header className='logo'>
                    <h1>Job hunter</h1>
                </Menu.Item>

                        <Menu.Item className='search-input'>
                            <Form>
                                <Form.Field>
                                    <Form.Input placeholder='Search'
                                           size='small'
                                           action='Go'
                                    />
                                </Form.Field>
                            </Form>

                        </Menu.Item>

                <Menu.Item >

                    <Dropdown trigger ={

                        <span> User</span>
                    } options={this.dropdownOptions()}/>


                </Menu.Item>

            </Menu>

















            );
    }
}

export default NavBar;
