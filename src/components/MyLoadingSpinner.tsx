import { Spinner, SpinnerSize } from "@fluentui/react";
import { IMyLoadingSpinnerProps } from "./IMyLoadingSpinnerProps";
import graphic from "../media/earth.png";
function MyLoadingSpinner(props: IMyLoadingSpinnerProps): JSX.Element {
  return (
    <div style={{ height: props.divHeight }}>
      <Spinner
        size={SpinnerSize.large}
        label={props.loadingText}
        ariaLive="assertive"
        labelPosition="left"
      />
      <img className="App-logo" src={graphic} alt="scanning universe.." />
    </div>
  );
}

export default MyLoadingSpinner;
