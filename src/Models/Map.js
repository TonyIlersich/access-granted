export const NodeTypes = {
  Internet: 'Internet',
  CoffeeShop: 'Coffee Shop',
  Office: 'Office',
  Server: 'Server',
  Database: 'Database',
  Router: 'Router',
  Firewall: 'Firewall',
  Identity: 'Identity',
  UptimeMonitor: 'Uptime Monitor',
  MalwareScanner: 'Malware Scanner',
  EmailService: 'Email Service',
  CellPhone: 'CellPhone'
};

export const NodeStates = {
  Neutral: 'Neutral',
  Online: 'Online',
  Infected: 'Infected',
  Offline: 'Offline',
};

export const EdgeTypes = {
  Vulnerability: 'Vulnerability',
  Protection: 'Protection',
  Scan: 'Scan',
  UptimeCheck: 'UptimeCheck'
};

const MapTypes = {
  Global: 'Global',
  Office: 'Office',
  CoffeeShop: 'Coffee Shop'
};

export class Map {
  _nodes = [];
  _edges = [];
  _makeNode(type, label, isExposed, desc, minigameInfo = null, subMap = null, state = NodeStates.Online) {
    const id = this._nodes.length;
    this._nodes.push({ id, type, label, isExposed, desc, state, x: 0, y: 0, minigameInfo, subMap });
    return id;
  }
  _moveNode(id, x, y) {
    this._nodes[id].x = x;
    this._nodes[id].y = y;
  }
  _makeEdge(type, id1, id2) {
    this._edges.push({ id: this._edges.length, type, id1, id2 });
  }
  _makeCoffeeShop() {
    return this._makeNode(
      NodeTypes.CoffeeShop,
      'Timbucks (Coffee Shop)',
      false,
      'Coffee shops have minimal security and free wi-fi. As such, they are an easy source for personal data and free resources.',
      null,
      new Map(MapTypes.CoffeeShop)
    );
  }
  _makeOffice() {
    return this._makeNode(
      NodeTypes.Office,
      'Tezmazon Office',
      false,
      `Tezmazon's offices are secure. Firewalls, anti-virus software, cutting-edge encryption. The more sensitive their data, the tighter the `
      + `security will be, but it's nothing you can't handle. Every system has vulnerabilities, and you will find them.`,
      null,
      new Map(MapTypes.Office)
    );
  }
  _makeRouter() {
    return this._makeNode(
      NodeTypes.Router,
      'Router',
      true,
      `A router receives messages from the internet and routes them to devices on the local network. They can be tricky to infect, and you may have `
      + `to fight to keep them. They are usually a primary target for counter-hacking.`,
      null, // TODO: put useful data here
    )
  }
  _makeCellPhone() {
    return this._makeNode(
      NodeTypes.CellPhone,
      'Cell Phone',
      false, // TODO: consider exposing some cell phones as if they are on data? might not be worth it since coffeeshops should be easy anyways
      `The average citizen doesn't realize how dangerous cell phones are. If you gain access, you have their personal data at your finger tips, not `
      + `to mention free processing power and a stable internet connection. Cell phones can be low-liability sources for cyberattacks, leaving you `
      + `out of harms way if things go south.`
    )
  }
  _makeInternet() {
    return this._makeNode(
      NodeTypes.Internet,
      'Internet',
      false,
      `The Internet. What was once a global, free community exchanging humanity's knowledge is now but another tool of corporate greed. Mass `
      + `surveillance, targeted advertising, misinformation, the propagation of hate speech, I could go on, but you know as well as I do.`,
      null,
      null,
      NodeStates.Neutral
    );
  }
  constructor(type) {
    switch (type || MapTypes.Global) {
      case MapTypes.Global: {
        const numCoffeeShops = 5;
        const numOffices = 5;
        // TODO: give desc
        const internetId = this._makeInternet();
        const siteIds = [];
        for (let i = 0; i < numOffices; i++) {
          siteIds.push(this._makeOffice());
        }
        for (let i = 0; i < numCoffeeShops; i++) {
          siteIds.push(this._makeCoffeeShop());
        }
        siteIds.sort(() => Math.random() - .5);
        siteIds.forEach((id, idx) => {
          this._makeEdge(EdgeTypes.Vulnerability, internetId, id);
          const theta = (idx + .2) / siteIds.length * 2 * Math.PI;
          this._moveNode(id, Math.cos(theta) * 1.7, Math.sin(theta) * .8);
        });
        return;
      } case MapTypes.CoffeeShop: {
        // NOTE: this code is garbage but ill prolly never fix it
        const numCellPhones = Math.floor(Math.random() * 2 + 9);
        const routerId = this._makeRouter();
        this._moveNode(routerId, .85, -.7);
        const ids = [];
        for (let i = 0; i < numCellPhones; i++) {
          const cellPhoneId = this._makeCellPhone();
          this._makeEdge(EdgeTypes.Vulnerability, routerId, cellPhoneId);
          ids.push(cellPhoneId);
        }
        const root = Math.floor(Math.sqrt(numCellPhones));
        const length = root;
        const width = root - 1;
        for (let i = 0; i < length * width; i++) {
          const x0 = i % length / width;
          const y0 = Math.floor(i / length) / width;
          this._moveNode(ids[i], x0 * -1.6 + .1, y0 * 1 + .05);
        }
        for (let i = length * width; i < numCellPhones; i++) {
          const x0 = (i - length * width) / (numCellPhones - length * width - 1);
          const y0 = x0;
          this._moveNode(ids[i], x0 * -1.3 + 1.9, y0 * 1.2 - .4);
        }
        return;
      } case MapTypes.Office: {
        const routerId = this._makeRouter();
        // TODO: implement this
        return;
      } default: {
        console.error(`INVALID MAP TYPE: '${type}'`);
      }
    }
  }
}