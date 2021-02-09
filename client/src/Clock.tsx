/*
 * Filename: client/src/Clock.tsx
 * Created Date: Tuesday, February 9th 2021, 5:21:46 pm
 * Author: Thomas vanBommel
 * 
 */

class Clock extends React.Component<{}, { datetime: string }> {
    clock_id = 0;

    /** Create a new clock component */
    constructor(props: {}){
        super(props);
        this.state = { datetime: this.getDateString() };
    }

    /** Successfully mounted component */
    componentDidMount() {
        this.clock_id = Number(setInterval(this.tick.bind(this), 1000));
    }

    /** Component will be unmounted (removed) */
    componentWillUnmount() {
        clearInterval(this.clock_id);
    }

    /** Increment datetime value */
    tick() {
        this.setState({ datetime: this.getDateString() });
    }

    /** Get the current datetime in string format */
    getDateString() {
        return new Date().toLocaleTimeString();
    }

    /** Draw to the canvas */
    render() {
        return (
            <div>
                <p className="text-muted m-0 me-2">
                    { this.state.datetime }
                </p>
            </div>
        );
    }
}