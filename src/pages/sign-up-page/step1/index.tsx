export default function Step1Component(clickFunc) {

    return (
        <button onClick = {() => clickFunc()}>
            Click me
        </button>
    )
}