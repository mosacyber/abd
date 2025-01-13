import { TextBoxConfig, TextStyle } from '../types/canvas';
import { calculateFontSize } from './textUtils';
import { defaultTextStyle, fixedTextStyle, blackTextStyle, textBoxConfigs } from '../config/textBoxes';
import { wrapArabicText } from './textHandling';

// وظيفة خاصة لرسم نص الأهداف
function drawObjectivesText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  width: number,
  height: number,
  style: TextStyle
) {
  const padding = 15;
  const availableWidth = width - (padding * 2);
  const availableHeight = height - (padding * 2);
  const lineHeightRatio = 1.3;
  const initialFontSize = 24;

  const { lines, fontSize } = wrapArabicText(
    ctx,
    text,
    availableWidth,
    availableHeight,
    lineHeightRatio,
    initialFontSize
  );

  ctx.font = `${fontSize}px Rubik`;
  ctx.fillStyle = style.color;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'top';

  const lineHeight = fontSize * lineHeightRatio;
  lines.forEach((line, index) => {
    if (line.trim()) {
      const yPosition = y + padding + (index * lineHeight);
      ctx.fillText(line, x + width - padding, yPosition);
    }
  });
}

export function drawTextBox(
  ctx: CanvasRenderingContext2D,
  config: TextBoxConfig,
  style: TextStyle = defaultTextStyle
) {
  const { text, x, y, width, height, textAlign = 'middle', fixed = false, style: textStyleType, backgroundColor } = config;
  
  let textStyle = style;
  if (fixed) {
    textStyle = textStyleType === 'black' ? blackTextStyle : fixedTextStyle;
  }
  
  // رسم الخلفية إذا كانت محددة
  if (backgroundColor) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(x, y, width, height);
    textStyle = { ...textStyle, color: '#ffffff' };
  }

  // إذا كان النص هو نص الأهداف، استخدم وظيفة drawObjectivesText
  if (config === textBoxConfigs.objectives) {
    drawObjectivesText(ctx, text, x, y, width, height, textStyle);
    return;
  }

  // معالجة النصوص الأخرى بشكل عادي
  const needsWrapping = text.length > 50;
  
  if (needsWrapping) {
    const initialFontSize = 20;
    const lineHeightRatio = 1.3;
    const padding = 15;
    
    const availableWidth = width - (padding * 2);
    const availableHeight = height - (padding * 2);
    
    const { lines, fontSize } = wrapArabicText(
      ctx,
      text,
      availableWidth,
      availableHeight,
      lineHeightRatio,
      initialFontSize
    );
    
    ctx.font = `${fontSize}px Rubik`;
    ctx.fillStyle = textStyle.color;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    
    const lineHeight = fontSize * lineHeightRatio;
    lines.forEach((line, index) => {
      if (line.trim()) {
        const yPosition = y + padding + (index * lineHeight);
        ctx.fillText(line, x + width - padding, yPosition);
      }
    });
  } else {
    // معالجة النصوص القصيرة
    const fontSize = fixed ? textStyle.fontSize : calculateFontSize(ctx, text, width - 20, height - 10, textStyle.fontSize);
    ctx.font = `${fontSize}px Rubik`;
    ctx.fillStyle = textStyle.color;
    ctx.textBaseline = textAlign === 'top' ? 'top' : 'middle';
    ctx.textAlign = fixed ? 'right' : 'center';
    
    const xPos = fixed ? x + width : x + (width / 2);
    const yPos = textAlign === 'top' ? y + 10 : y + (height / 2);
    
    ctx.fillText(text, xPos, yPos);
  }
}
