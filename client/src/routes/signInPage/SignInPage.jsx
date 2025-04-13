import { SignIn } from '@clerk/clerk-react';
import './signInPage.css'

const SignInpage = () =>{
    return(
        <div className="signInPage">
            <SignIn path='/sign-in' signUpUrl='/sign-up' forceRedirectUrl="/dashboard"/>
        </div>
    )
}

export default SignInpage;