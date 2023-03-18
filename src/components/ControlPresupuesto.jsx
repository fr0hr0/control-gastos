import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import { setCurrency } from "../helpers"

const ControlPresupuesto = ({ 
    gastos, 
    setGastos, 
    presupuesto, 
    setPresupuesto,
    setIsValidPresupuesto
}) => {

    const [porcentaje, setProcentaje] =  useState(0)
    const [ disponible, setDisponible] = useState(0)
    const [ gastado, setGastado] = useState(0)

    useEffect( ()=> {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0 )
        const totalDisponible = presupuesto - totalGastado

        const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2)
        setTimeout(() => {
            setProcentaje(nuevoPorcentaje)
        }, 1000);
        setDisponible(totalDisponible)
        setGastado(totalGastado)
    },[gastos])

    const handleResetApp = () => {
        const resultado = confirm('¿Deseas resetear la App?')
        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3b82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3b82F6'
                    })}
                    value = { porcentaje }
                    text={`${porcentaje}% Gastado`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button
                    className="reset-app"
                    type="button"
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span> {setCurrency(presupuesto)}
                </p>

                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span> {setCurrency(disponible)}
                </p>

                <p>
                    <span>Gastado: </span> {setCurrency(gastado)}
                </p>

            </div>
        </div>
    )
}

export default ControlPresupuesto