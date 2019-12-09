import React, { Component } from 'react'
import logoToSell from '../../images/toSell.png'
import './PropertyCardComponent.css'

export default class PropertyCardComponent extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render () {
        return (
            <div className='PropertyCardComponent'>
                <h1>NOM DE LA PROPRIETE</h1>
                <center><img className='logoToSell' src={ logoToSell } alt="Maison à vendre" /></center>
            </div>
        )
    }
}