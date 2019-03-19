import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const SuccessPage = (props) => {
    return (
        <div>
            <Jumbotron>
                <h1 className="display-3">You are successfully registered!</h1>
                <p className="lead">
                    No matter how you are registered you will be under a pseudonym
                    LORTU</p>
                <hr className="my-2" />
                <p>We will contact you</p>
            </Jumbotron>
        </div>
    );
};

export default SuccessPage;