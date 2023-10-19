import Connection from './pool';

class Instance {
  constructor() {
    this.instance = null;
  }

  clearInstance() {
    this.instance = null;
  }

  createInstance(props) {
    this.instance = new Connection(props);
  }

  getInstance() {
    return this.instance;
  }
}

export default new Instance();
