export const MinigameTypes = {
  Maze: 'Maze',
  Blocks: 'Blocks',
  Hash: 'Hash',
};

export class Minigame {
  constructor(type, props = {}) {
    this.type = type;
    switch (type) {
      case MinigameTypes.Maze: {
        this.title = 'Cyber-Attack: Router';
        this.desc = `The red node is your virus. Hack your way through to the white node.`;
        this.keys = '1234567890-=qwertyuiop[]asdfghjkl;zxcvbnm,.'.split('');
        this.timeLimit = props.timeLimit || 119;
        this.width = props.width || 15;
        this.height = props.height || 6;
        this.nodes = new Array(this.width * this.height)
          .fill('')
          .map((_, idx) => ({
            id: idx,
            key: this.keys[Math.floor(Math.random() * this.keys.length)],
            x: idx % this.width,
            y: Math.floor(idx / this.width)
          }));
        this.edges = [];
        const first = this.nodes[Math.floor(Math.random() * this.nodes.length)];
        const visited = [first];
        const stack = [first];
        while (stack.length > 0) {
          const current = stack[0];
          const neighbors = this.nodes.filter(n => Math.abs(n.x - current.x) + Math.abs(n.y - current.y) === 1);
          const unvisited = neighbors.filter(n => !visited.includes(n)).sort(() => Math.random() - .5);
          if (unvisited.length === 0) {
            stack.shift();
          } else {
            const chosen = unvisited[0];
            this.edges.push({ id1: current.id, id2: chosen.id });
            visited.push(chosen);
            stack.unshift(chosen);
          }
        }
        for (let i = 0; i < 10; i++) {
          const x = Math.floor(Math.random() * (this.width - 2) + 1);
          const y = Math.floor(Math.random() * (this.height - 2) + 1);
          const id1 = y * this.width + x;
          const id2 = id1 + [1, -1, this.width, -this.width].sort(() => Math.random() - .5)[0];
          if (this.edges.some(e => e.id1 === id1 && e.id2 === id2)) i--;
          else this.edges.push({ id1, id2 });
        }
        const x1 = Math.floor(Math.random() * (this.width - 2) / 4 + 1);
        const y1 = Math.floor(Math.random() * (this.height - 2) / 4 + 1);
        this.startId = y1 * this.width + x1;
        const x2 = this.width - 1 - Math.floor(Math.random() * (this.width - 2) / 4 + 1);
        const y2 = this.height - 1 - Math.floor(Math.random() * (this.height - 2) / 4 + 1);
        this.endId = y2 * this.width + x2;
        // clean up unlucky keys
        let conflicts;
        do {
          const neighborMatrix = this.nodes.map(({ id }) =>
            this.edges.map(({ id1, id2 }) => id1 === id ? this.nodes[id2] : (id2 === id ? this.nodes[id1] : null)).filter(n => n)
          );
          conflicts = neighborMatrix
            .map(nodes => nodes.filter(n1 => nodes.some(n2 => n1.id !== n2.id && n1.key === n2.key)))
            .filter(nodes => nodes.length > 0);
          conflicts.forEach(nodes => nodes.forEach(n => n.key = this.keys[Math.floor(Math.random() * this.keys.length)]));
        } while (conflicts.length > 0);
        break;
      }
      case MinigameTypes.Blocks: {
        this.title = 'Cyber-Attack: Server';
        this.desc = 'The red node is your virus. Infect all the blue nodes without touching the anti-virus blocks.';
        this.keys = '1234567890-=qwertyuiop[]asdfghjkl;zxcvbnm,.'.split('').sort(() => Math.random() - .5);
        this.width = props.width || 12;
        this.height = props.height || 8;
        this.hKeys = this.keys.slice(0, this.width);
        this.vKeys = this.keys.slice(this.width, this.width + this.height);
        this.nodes = new Array(this.width * this.height)
          .fill('')
          .map((_, idx) => ({
            id: idx,
            x: idx % this.width,
            y: Math.floor(idx / this.width),
            isPivot: Math.random() < .15,
          }));
        this.startPos = { x: 2, y: 2 };
        this.blocks = new Array(props.blockCount || 3)
          .fill('')
          .map(() => {
            const x = Math.floor(Math.random() * this.width)
            const y = x < this.width / 2
              ? Math.floor(Math.random() * this.height / 2) + Math.floor(this.height / 2)
              : Math.floor(Math.random() * this.height);
            return { x, y };
          });
        break;
      }
      case MinigameTypes.Hash: {
        this.title = 'Cyber-Attack: Database';
        this.desc = `We need the password to unlock the database. If you figure out half the characters, we can brute force our way in. Type your `
          + `guesses and press enter to guess. Characters guessed correctly will appear red. Characters in the wrong place will appear white.`;
        this.keys = '1234567890-=qwertyuiop[]asdfghjkl;zxcvbnm,.'.split('').sort(() => Math.random() - .5);
        this.hash = this.keys.slice(0, props.hashLength || 10);
        this.timeLimit = props.timeLimit || 4 * 60 - 1;
        break;
      }
      default:
        throw new Error(`unexpected minigame type: '${type}'`);
    }
  }
}