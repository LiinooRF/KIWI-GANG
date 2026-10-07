import { Button } from "react-bootstrap";

//Archivo para realizar testing.
export default function Boton({ texto, onClick }) {
    return (
        <button
        type="submit"              
        className="btn btn-success mt-4"
        onClick={onClick}
        >
        {texto}
        </button>
    )
}