export interface Container {
  children: Container | Text | Image[];
  [p: string]: any;
}

export interface IRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Rect extends IRect {
  backgroundColor: string;
  borderRadius: number;
  borderWidth: number;
  borderStyle: string;
  borderColor: string;
}

export interface Text extends Rect {
  type: "text";
  value: string;
  alignment: "left" | "center" | "right";
  rows: number;
  color: string;
}

export interface Image extends Rect {
  type: "image";
  value: string;
  objectFit: string;
}

export interface Link extends IRect {
  [p: string]: any;
}
