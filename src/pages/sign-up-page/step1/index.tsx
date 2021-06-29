export default function Step1Component({clickFunc}) {

    return (
        <button className = "btn-main" onClick = {() => {clickFunc()}}>
            Click me
        </button>
    )
}