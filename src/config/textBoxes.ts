import { TextBoxConfig, TextStyle } from '../types/canvas';

export const defaultTextStyle: TextStyle = {
  fontSize: 20,
  fontFamily: 'Rubik',
  color: '#0d3946',
  backgroundColor: 'transparent'
};

export const fixedTextStyle: TextStyle = {
  fontSize: 20,
  fontFamily: 'Rubik',
  color: 'white',
  backgroundColor: 'transparent'
};

export const blackTextStyle: TextStyle = {
  fontSize: 20,
  fontFamily: 'Rubik',
  color: '#0d3946',
  backgroundColor: 'transparent'
};

export const textBoxConfigs: Record<string, TextBoxConfig> = {
  adminText: {
    text: 'الإدارة العامة للتعليم',
    x: 280,
    y: 57,
    width: 200,
    height: 30,
    fixed: true,
    style: 'white'
  },
  region: {
    text: '',
    x: 280,
    y: 87,
    width: 200,
    height: 30,
    fixed: true,
    style: 'white'
  },
  educationOffice: {
    text: '',
    x: 280,
    y: 117,
    width: 200,
    height: 30,
    fixed: true,
    style: 'white'
  },
  manager: {
    text: '',
    x: 20,
    y: 1157,
    width: 277,
    height: 28
  },
  executorLabel: {
    text: 'المنفذ :',
    x: 748,
    y: 354,
    width: 100,
    height: 30,
    fixed: true,
    style: 'black'
  },
  locationLabel: {
    text: 'مكان التنفيذ :',
    x: 748,
    y: 413,
    width: 100,
    height: 30,
    fixed: true,
    style: 'black'
  },
  targetLabel: {
    text: 'المستهدفون :',
    x: 748,
    y: 477,
    width: 100,
    height: 30,
    fixed: true,
    style: 'black'
  },
  targetCountLabel: {
    text: 'عدد المستهدفون :',
    x: 700,
    y: 540,
    width: 150,
    height: 30,
    fixed: true,
    style: 'black'
  },
  executionDateLabel: {
    text: 'تاريخ التنفيذ :',
    x: 690,
    y: 600,
    width: 150,
    height: 30,
    fixed: true,
    style: 'black'
  },
  objectivesLabel: {
    text: 'الأهداف :',
    x: 420,
    y: 410,
    width: 100,
    height: 30,
    fixed: true,
    style: 'black'
  },
  evidenceLabel: {
    text: 'الشواهد :',
    x: 684,
    y: 655,
    width: 100,
    height: 30,
    fixed: true,
    style: 'black'
  },
  school: {
    text: '',
    x: 310,
    y: 187,
    width: 277,
    height: 33,
    backgroundColor: '#0b3946'
  },
  event: {
    text: '',
    x: 66,
    y: 261,
    width: 770,
    height: 40,
    backgroundColor: '#0b3946'
  },
  executor: {
    text: '',
    x: 66,
    y: 350,
    width: 700,
    height: 33
  },
  location: {
    text: '',
    x: 540,
    y: 410,
    width: 190,
    height: 33
  },
  target: {
    text: '',
    x: 540,
    y: 475,
    width: 190,
    height: 33
  },
  targetCount: {
    text: '',
    x: 540,
    y: 540,
    width: 160,
    height: 33
  },
  executionDate: {
    text: '',
    x: 540,
    y: 600,
    width: 190,
    height: 33
  },
  objectives: {
    text: '',
    x: 66,
    y: 440,
    width: 440,
    height: 195,
    textAlign: 'top'
  }
};
