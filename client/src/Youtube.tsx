/*
 * Filename: client/src/Youtube.tsx
 * Created Date: Sunday, February 14th 2021, 2:23:45 pm
 * Author: Thomas vanBommel
 * 
 */

import { Video } from "../../common/types";
import React from 'react';

type State = {
    error: Error,
    isLoaded: boolean,
    videos: Video[]
};

class Youtube extends React.Component<{}, State> {

    /** Create a Youtube component */
    constructor(props: {}) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            videos: []
        };
    }

    /** Successfully mounted component */
    componentDidMount() {

    }

    render() {
        return (
            <h1>Youtube 123</h1>
        );
    }
}

export default Youtube;