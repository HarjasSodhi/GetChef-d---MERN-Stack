import Circle from "react-loader-spinner";
import './loader.css'

let Loader = () => {
    return (
            <div className="loader">
                <Circle
                    type="Circles"
                    color="purple"
                    height={80}
                    width={80}
                />
            </div>
    )
}

export default Loader;