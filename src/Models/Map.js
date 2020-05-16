import { Minigame, MinigameTypes } from "./Minigame";

export const NodeTypes = {
  CellPhone: 'CellPhone',
  CoffeeShop: 'Coffee Shop',
  Database: 'Database',
  EmailService: 'Email Service',
  Firewall: 'Firewall',
  Identity: 'Identity',
  Internet: 'Internet',
  Laptop: 'Laptop',
  MalwareScanner: 'Malware Scanner',
  Office: 'Office',
  Router: 'Router',
  Server: 'Server',
  UptimeMonitor: 'Uptime Monitor',
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
  _makeNode(type, label, isExposed, desc, ram, minigameInfo = null, state = NodeStates.Online) {
    const id = this._nodes.length;
    this._nodes.push({ id, type, label, isExposed, desc, ram: ram, state, x: 0, y: 0, minigameInfo, subMap: null, data: 0 });
    return id;
  }
  _moveNode(id, x, y) {
    this._nodes[id].x = x;
    this._nodes[id].y = y;
  }
  _setNodeData(id, data) {
    this._nodes[id].data = data;
  }
  _getTotalData(id) {
    return this._nodes.reduce((p, n) => p + n.data + (n.subMap ? n.subMap._getTotalData() : 0), 0);
  }
  _makeEdge(type, id1, id2) {
    this._edges.push({ id: this._edges.length, type, id1, id2 });
  }
  _makeCoffeeShop(isFirst = false) {
    const id = this._makeNode(
      NodeTypes.CoffeeShop,
      'Timbucks (Coffee Shop)',
      false,
      isFirst
        ? `This particular shop is your base of operations. Connected to this network is your laptop, from which you are orchestrating this take-over.`
        : `Coffee shops have minimal security and free wi-fi. As such, they are an easy way to hijack common mobile devices.`,
      0,
    );
    this._nodes[id].subMap = new Map(MapTypes.CoffeeShop, this._nodes[id], isFirst);
    if (isFirst) {
      this._baseId = id;
    }
    return id;
  }
  _makeOffice() {
    const id = this._makeNode(
      NodeTypes.Office,
      'Tezmazon Office',
      false,
      `Tezmazon's offices are secure. Firewalls, anti-virus software, cutting-edge encryption. The more sensitive their data, the tighter the `
      + `security will be, but it's nothing you can't handle. Every system has vulnerabilities, and you will find them.`,
      0,
    );
    this._nodes[id].subMap = new Map(MapTypes.Office, this._nodes[id]);
    return id;
  }
  _makeRouter(difficulty = 0) {
    return this._makeNode(
      NodeTypes.Router,
      'Router',
      true,
      `A router receives messages from the internet and routes them to devices on the local network.`,
      2,
      new Minigame(MinigameTypes.Maze, { width: 17 + 3 * difficulty, height: 7 + 2 * difficulty }),
    )
  }
  _makeCellPhone() {
    return this._makeNode(
      NodeTypes.CellPhone,
      'Cell Phone',
      false,
      `Cell phones can be useful to gain hacking resources, but they will be limited. They are easily infected if you've already taken the router.`,
      4,
    )
  }
  _makeInternet() {
    return this._makeNode(
      NodeTypes.Internet,
      'The Internet',
      false,
      `Once a great open community where people accross the globe could exchange ideas. It is now little more than a weapon of the greedy elite. `
      + `Mass surveillance, targeted advertising, misinformation campaigns, propagation of hate speech, I could go on, but you know this as well as `
      + `I do. We will be its liberators.`,
      0,
      null,
      NodeStates.Neutral
    );
  }
  _makeLaptop() {
    return this._makeNode(
      NodeTypes.Laptop,
      'Your Laptop',
      false,
      `All your orders come from this laptop. If you haven't already, your first step should be to infect the router in this coffee shop. This will `
      + `give you an internet connection, and it will expose the other devices on this network for you to infect.`,
      16,
      null,
      NodeStates.Infected
    );
  }
  _makeServer() {
    return this._makeNode(
      NodeTypes.Server,
      'Server',
      false,
      `Servers are the heavy lifters. They get a lot done, and talk to a lot of other devices. If they are compromised, connected databases become `
      + `vulnerable`,
      32,
      new Minigame(MinigameTypes.Blocks),
    );
  }
  _makeDatabase() {
    const id = this._makeNode(
      NodeTypes.Database,
      'Database',
      false,
      `Databases are where Tezmazon keeps their data. Some databases contain more data than others. We will need at least 50% of all data under our `
      + `control for this to work. Once we have enough, I'll wipe it remotely, and your job will be done.`,
      8,
      new Minigame(MinigameTypes.Hash),
    );
    this._setNodeData(id, 2 ** Math.floor(Math.random() * 3 + 1)) // in TB
    return id;
  }
  constructor(type, owner, isFirst = false) {
    this._owner = owner || null;
    switch (type || MapTypes.Global) {
      case MapTypes.Global: {
        const numCoffeeShops = 5;
        const numOffices = 5;
        const internetId = this._makeInternet();
        const siteIds = [];
        for (let i = 0; i < numOffices; i++) {
          siteIds.push(this._makeOffice());
        }
        for (let i = 0; i < numCoffeeShops; i++) {
          siteIds.push(this._makeCoffeeShop(i === 0));
        }
        siteIds.sort(() => Math.random() - .5);
        siteIds.forEach((id, idx) => {
          this._makeEdge(EdgeTypes.Vulnerability, internetId, id);
          const theta = idx / siteIds.length * 2 * Math.PI;
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
          const id = isFirst && i === 0 ? this._makeLaptop() : this._makeCellPhone();
          this._makeEdge(EdgeTypes.Vulnerability, routerId, id);
          ids.push(id);
          ids.sort(() => Math.random() - .5);
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
        const routerId = this._makeRouter(1);
        const numServers = 2 + Math.floor(Math.random() * 3) * 2;
        for (let i = 0; i < numServers; i++) {
          const serverId = this._makeServer();
          this._makeEdge(EdgeTypes.Vulnerability, routerId, serverId);
          const theta = (i + (numServers === 4 ? .5 : 0)) / numServers * 2 * Math.PI;
          const serverX = Math.cos(theta) * 1.1;
          const serverY = Math.sin(theta) * .5;
          this._moveNode(serverId, serverX, serverY);
          const ids =
            new Array(Math.floor(Math.pow(Math.random(), 2) * 2.5 + 1))
              .fill('')
              .map(() => this._makeDatabase());
          ids.forEach((id, idx) => {
            this._makeEdge(EdgeTypes.Vulnerability, serverId, id);
            const omega = ids.length > 1
              ? theta + (idx / (ids.length - 1) - .5) / numServers * 2 * Math.PI
              : theta;
            this._moveNode(id, serverX + Math.cos(omega) * .8, serverY + Math.sin(omega) * .4);
          });
        }
        return;
      } default: {
        console.error(`INVALID MAP TYPE: '${type}'`);
      }
    }
  }
  _infectNode(id) {
    const node = this._nodes[id];
    node.state = NodeStates.Infected;
    if (node.isExposed) {
      this._owner.state = NodeStates.Infected;
    }
  }
  _shutdownNode(id) {
    const node = this._nodes[id];
    node.state = NodeStates.Offline;
    if (!this.hasExposedInfectedNodes()) {
      this._owner.state = NodeStates.Online;
    }
  }
  _cleanNode(id) {
    const node = this._nodes[id];
    node.state = NodeStates.Online;
    if (!this.hasExposedInfectedNodes()) {
      this._owner.state = NodeStates.Online;
    }
  }
  _rebootNode(id) {
    const node = this._nodes[id];
    node.state = NodeStates.Online;
  }
  _getAdjacentInfected(id) {
    const adjacentInfected = this._edges.map(e => {
      const nodes = [e.id1, e.id2].map(id => this._nodes[id]);
      if (nodes[0].state === NodeStates.Infected && nodes[1].id === id) {
        return nodes[1].id;
      }
      if (nodes[1].state === NodeStates.Infected && nodes[0].id === id) {
        return nodes[0].id;
      }
      return null;
    }).filter(n => n !== null);
    return adjacentInfected;
  }
  hasExposedInfectedNodes() {
    return this._nodes.some(n => n.isExposed && n.state === NodeStates.Infected)
  }
  canInfect(id, isOutsideInfected) {
    return (
      (this._nodes[id].isExposed && isOutsideInfected) ||
      ((this.hasExposedInfectedNodes() || this._nodes.some(n => n.type === NodeTypes.Laptop)) && this._getAdjacentInfected(id).length > 0)
    );
  }
  getInfectedRam() {
    return this._nodes.reduce((p, n) =>
      p +
      (n.state === NodeStates.Infected ? n.ram : 0) +
      (n.subMap ? n.subMap.getInfectedRam() : 0),
      0
    );
  }
}