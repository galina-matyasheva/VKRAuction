import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";


firebase.initializeApp({
    apiKey: 'AIzaSyBwcg9wjJDCJio5i-phsZtiRnuONiCNy_Y',
    authDomain: 'auth-sso-58ca0.firebaseapp.com'
});

class SSO extends Component {
    state={isSignedIn:false};

    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => false
        }
    };

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user })
            console.log('user',user)
        })

    };

    render() {
        return (
            <div>
                <div className='sign-content'>
                    {this.state.isSignedIn ?(
                        <span>
                    <div>Войти</div>
                    <button className='apply btn btn-dark' onClick={() => firebase.auth().signOut()}>Выйти</button>
                        <p className='welcome-in'>Добро пожаловать,<br/> {firebase.auth().currentUser.displayName}!</p>
                    </span>
                    ) : (
                        <StyledFirebaseAuth
                            uiConfig={this.uiConfig}
                            firebaseAuth={firebase.auth()}
                        />
                    ) }
                </div>
            </div>
        );
    }
}

export default SSO;
