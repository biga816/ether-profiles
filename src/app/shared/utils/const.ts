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

export const URL = {
  ETHRSCAN: {
    1: {
      name: 'Main Network',
      path: 'https://etherscan.io/'
    },
    3: {
      name: 'Ropsten Test Network',
      path: 'https://ropsten.etherscan.io/'
    },
    4: {
      name: 'Rinkeby Test Network',
      path: 'https://rinkeby.etherscan.io/'
    },
    42: {
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
