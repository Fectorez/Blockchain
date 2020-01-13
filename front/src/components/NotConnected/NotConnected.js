import React, { Component } from 'react'
import logoMetaMask from '../../images/metamask.png'
import './NotConnected.css'

export default class CreatePropertyComponent extends Component {
    render() {
        return(
            <div className='NotConnected'>
                <center>
                    <p>Veuillez vous <b>connecter à MetaMask</b> et <b>rafraîchir la page</b> pour accéder au site !</p>
                    <img className='metamask' src={ logoMetaMask } alt="LogoMetaMask" />
                </center>
            </div>
        )
    }
}