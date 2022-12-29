import {finalToken} from '../../messaging'

export default function Button() {
    function enviarAlerta() {
        window.alert("Hello")
        window.alert(finalToken)
    }
    return (
    <>
        <button onClick={enviarAlerta}>clique alert</button>
    </>
  )
}
