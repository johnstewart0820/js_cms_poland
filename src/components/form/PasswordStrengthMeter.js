import React from 'react';
import '../../styles/auth/PasswordStrengthMeter.scss';
import * as zxcvbn from "zxcvbn";

const strengthIndicator = arg => {
    switch (arg.score) {
        case 0:
            return '';
        case 1:
            return '. . .';
        case 2:
            return '. . . . . .';
        case 3:
            return '. . . . . . . .';
        case 4:
            return '. . . . . . . . . . . .';
        default:
            return '';
    }
}

const passwordLabelHandler = result => {
    switch (result.score) {
        case 0:
            return '';
        case 1:
            return 'Słabe';
        case 2:
            return 'Normalne';
        case 3:
            return 'Dobre';
        case 4:
            return 'Silne';
        default:
            return 'Słabe';
    }
}

export default class PasswordStrengthMeter extends React.Component {
    render() {
        const {password} = this.props;
        const strengthResult = zxcvbn(password);
        return(
            <div className="strength-meter-container" style={{margin: '5px 5px 40px 5px'}}>
                <label className="strength-meter-indicator">
                    {strengthIndicator(strengthResult)}
                </label>
                <label className="strength-meter-label">
                    {passwordLabelHandler(strengthResult)}
                </label>
            </div>
        )
    }
}