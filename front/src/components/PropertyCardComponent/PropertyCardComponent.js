import React, { Component } from 'react'
import logoToSell from '../../images/toSell.png'
import './PropertyCardComponent.css'

export default class PropertyCardComponent extends Component {
    constructor(props) {
        super();

        this.state = {
            property: props.property,
            fromCatalog: props.fromCatalog
        }
    }

    render () {
        const obj = this.state.property
        const fromCatalog = this.state.fromCatalog

        return (
            <div className='PropertyCardComponent'>
                <h1>{obj.description}</h1>
                <center><img className='logoToSell' src={ logoToSell } alt="Maison à vendre" /></center>
                <ul>
                    <li>Adresse : {obj.geoAddress}</li>
                    <li>Surface : {obj.size}</li>
                    <li>Pièces : {obj.nbRooms}</li>
                    <li>Prix : {obj.price} ETH</li>
                    <li>Documents : {obj.documents}</li>
                </ul>
                {fromCatalog ? <button type="button">Acheter</button> : null}
            </div>
        )
    }
}