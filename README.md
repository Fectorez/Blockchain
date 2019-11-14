tuto infura : https://www.trufflesuite.com/tutorials/using-infura-custom-provider

dans truffle-config :
```
const mnemonic = "<la seed phrase du compte metamask>";
```
pour obtenir la seedphrase, cliquer sur l'icône metamask, cliquer sur le rond en haut à droite (compte) > paramètres > sécurité & confidentialité > révéler les mots seed > taper le mdp

```
ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/5aef76951e4a4689befb73d13839d113`),
```
s'inscrire sur infura, créer un projet avec un nom. Ca donne un id, et le mettre à la place de "5eaf..."

> npm install truffle-hdwallet-provider
si ça marche pas sur windows (problème MS BUILD) aller en cmd admin et taper npm install -g windows-build-tools

sur metamask, aller sur le Réseau de test Ropsten (barre en haut) (et pas Kovan)

se donner à soi-même des ETH avec https://faucet.metamask.io/ : cliquer sur "se donner 1ETH from facet" et attendre un peu

truffle compile
ne dois pas donner d'erreur

truffle migrate --network ropsten