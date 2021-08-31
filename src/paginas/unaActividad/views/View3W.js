import React,{useState, useEffect} from 'react'

export const View3W = (props) => {
    let comboUnidadMedida = []
    let comboActividad = []
    let lblLabelComboActividades = null, lblInicioPlaneado = null, lblCantidadProgramada = null
    let lblUnidadMedidad = null, lblInicioProgamado = null, lblFinProgramado = null
    let listadoObjetosEstado = null

    const [finProgramado, setFinProgramado] = useState(null)
    const [inicioProgramado, setInicioProgramado] = useState(null)
    const [cantidadProgramada, setCantidadProgramada] = useState(null)
    const [unidadMedida, setUnidadMedida] = useState(null)
    const [textArea, setTextArea] = useState(null)
    const [listActividad, setListActividad] = useState(null)
    const [combo, setCombo] = useState({comboactividad:{visible:false, activo: false},
                                        descripcion:{visible:false, activo: false},
                                        unidadMedida:{visible:false, activo: false},
                                        Cantidad:{visible:false, activo: false},
                                        fechainiprog:{visible:false, activo: false},
                                        fechafinprog:{visible:false, activo: false},
                                        cmdeliminar:{visible:false, activo: false},
                                        cmdcerrar: null
                                    })

    if(props.apiActividad!==null&&props.apiActividad!==false){
        comboUnidadMedida = props.apiActividad.comboUnidadMedida
        comboActividad = props.apiActividad.comboactividad
        lblLabelComboActividades = props.apiActividad.lblobjeto3
        lblInicioPlaneado = props.apiActividad.lblobjeto5
        lblUnidadMedidad= props.apiActividad.lblobjeto6
        lblCantidadProgramada = props.apiActividad.lblobjeto7
        lblInicioProgamado = props.apiActividad.lblobjeto8
        lblFinProgramado = props.apiActividad.lblobjeto9
    }

    useEffect(() => {
        if(props.apiActividad!==null&&props.apiActividad!==false){
            if(props.apiActividad.fechafinprog!==null)
                setFinProgramado(props.apiActividad.fechafinprog.substring(0, (props.apiActividad.fechafinprog.indexOf("T")|0) + 6|0));
            if(props.apiActividad.fechainiprog!==null)
                setInicioProgramado(props.apiActividad.fechainiprog.substring(0, (props.apiActividad.fechainiprog.indexOf("T")|0) + 6|0))
            setTextArea(props.apiActividad.descripcion)
            setCantidadProgramada(props.apiActividad.cantidad)
            setUnidadMedida(props.apiActividad.idunidadmedida)
            setListActividad(props.apiActividad.idactividad)
            if(props.apiActividad.listadoObjetosEstado!==undefined) {
                props.apiActividad.listadoObjetosEstado.map(dato=>{
                    setCombo({...combo,[dato.id]:{visible: dato.visible, activo: dato.activo}})
                })
            }
        }
    },[props.apiActividad])

    const onUnidadMedidad = (e) => setUnidadMedida(e.target.value)
    const onListaActividad = (e) => setListActividad(e.target.value)
    const onTextArea = (e) =>setTextArea(e.target.value)
    const onCantidadProgramada = (e) => setCantidadProgramada(e.target.value)
    const onInicioProgramado = (e) => setInicioProgramado(e.target.value.substring(0, (e.target.value.indexOf("T")|0) + 6|0));
    const onFinProgramado = (e) => setFinProgramado(e.target.value.substring(0, (e.target.value.indexOf("T")|0) + 6|0));

    return (
        <div>
            {combo.comboactividad.visible&&
            <div className="input-group p-1">
                <p style={{paddingRight:'20px' }}>{lblLabelComboActividades}</p>
                <select value={listActividad} onChange={onListaActividad} id="nombreProyecto" className="form-select form-select-sm" disabled={!combo.comboactividad.activo}>
                    {comboActividad.map((obj)=>{
                        return <option value={obj.id}>{obj.descripcion}</option>
                    })}
                </select>
            </div>}
            {combo.descripcion.visible&&
            <div className="input-group p-1">
                <textarea value={textArea} onChange={onTextArea} id="idDescripcion" 
                          className="form-control" placeholder="Descripción de la actividad" 
                          style={{height: "100px"}} disabled={!combo.descripcion.activo}></textarea>
            </div>}


            <div style={{marginBottom:'15px', marginTop:'15px'}}>
                <p style={{fontSize:'small'}}>{lblInicioPlaneado}</p>
            </div>

            <div className="input-group p-1">
                <p style={{paddingRight:'20px' }}>{lblUnidadMedidad}</p>
                <select value={unidadMedida} onChange={onUnidadMedidad} id="idUnidadMedida"  className="form-select form-select-sm">
                    {comboUnidadMedida.map((obj)=>{
                        return <option value={obj.id}>{obj.descripcion}</option>
                    })}
                </select>
            </div>

            {combo.Cantidad.visible&&
            <div className="input-group p-1">
                <p style={{paddingRight:'20px'}}>{lblCantidadProgramada}</p>
                <input value={cantidadProgramada} onChange={onCantidadProgramada} id="idCantidad" 
                       type="number" className="form-control form-control-sm" 
                       placeholder="Ingresa una cantidad" disabled={!combo.Cantidad.activo}/>
            </div>}

            {combo.fechainiprog.visible&&
            <div className="input-group p-1">
                <p style={{paddingRight:'20px'}}>{lblInicioProgamado}</p>
                <input value={inicioProgramado} onChange={onInicioProgramado} id="fechaInicio" 
                       type="datetime-local" className="form-control form-control-sm"
                       disabled={!combo.fechainiprog.activo}/>
            </div>}

            {combo.fechafinprog.visible&&
            <div className="input-group p-1">
                <p style={{paddingRight:'20px'}}>{lblFinProgramado}</p>
                <input value={finProgramado} onChange={onFinProgramado} id="fechaFin" 
                       step={1} type="datetime-local" data-date-inline-picker="true" 
                       className="form-control form-control-sm" disabled={!combo.fechafinprog.activo}/>
            </div>}
        </div>
    )
}

const estilos = {
    fila:{display:'flex', justifyContent:'space-between', alignItems:'center'}
}
