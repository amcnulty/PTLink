import React from 'react';
import {Panel} from 'react-bootstrap';


const CoveredInClass = (props) => {
    return (
        <div>
            <Panel>
                <Panel.Heading>
                    <Panel.Title componentClass="h1">Covered In Class</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <input
                        className='form-control'
                        onChange={event => props.handleChange(event.target.value)}
                        value={props.value}
                    />
                </Panel.Body>
            </Panel>
        </div>
    )
}

export default CoveredInClass;