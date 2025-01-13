export interface TextStyle {
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor: string;
}

export interface TextBoxConfig {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  textAlign?: 'top' | 'middle';
  fixed?: boolean;
  style?: 'black' | 'white';
}
