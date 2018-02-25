import { environment } from '../../../environments/environment';


export const WEB3 = {
  NETWORK: {
    1: 'Mainnet',
    3: 'Ropsten',
    4: 'Rinkeby',
    42: 'Kovan',
    unknown: 'Unknown'
  }
};

export const ETH = {
  NETWORKS: [
    { id: 3, name: 'ropsten'},
    { id: 4, name: 'rinkeby'},
    { id: 42, name: 'kovan'}
  ]
};

export const URL = {
  ETHRSCAN: {
    'ropsten': {
      name: 'Ropsten Test Network',
      path: 'https://ropsten.etherscan.io/'
    },
    'rinkeby': {
      name: 'Rinkeby Test Network',
      path: 'https://rinkeby.etherscan.io/'
    },
    'kovan': {
      name: 'Kovan Test Network',
      path: 'https://kovan.etherscan.io/'
    }
  },
  INFURA: {
    1: 'https://mainnet.infura.io/1jyxaSVQd74TDQH6IHbe',
    3: 'https://ropsten.infura.io/1jyxaSVQd74TDQH6IHbe',
    4: 'https://rinkeby.infura.io/1jyxaSVQd74TDQH6IHbe',
    42: 'https://kovan.infura.io/1jyxaSVQd74TDQH6IHbe'
  }
};
