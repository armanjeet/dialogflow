declare module 'leader-line' {
  export default class LeaderLine {
    constructor(start: HTMLElement, end: HTMLElement, options?: any);
    remove(): void;
    position(): void;
    color: string;
    size: number;
    dash: boolean;
    startPlug: string;
    endPlug: string;
    startSocket: string;
    endSocket: string;
    outline: boolean;
    startSocketGravity: [number, number];
    endSocketGravity: [number, number];
  }
}
