import React, { forwardRef, useEffect } from 'react';
import { drawTextBox } from '../utils/canvasUtils';
import { drawImages } from '../utils/imageUtils';
import { textBoxConfigs } from '../config/textBoxes';

interface ImageCanvasProps {
  imageUrl: string;
  schoolName: string;
  region: string;
  educationOffice: string;
  managerName: string;
  eventName: string;
  executor: string;
  location: string;
  target: string;
  targetCount: string;
  executionDate: string;
  objectives: string;
  uploadedImages?: string[];
}

export const ImageCanvas = forwardRef<HTMLCanvasElement, ImageCanvasProps>(
  ({ 
    imageUrl, 
    schoolName,
    region,
    educationOffice,
    managerName,
    eventName, 
    executor, 
    location, 
    target,
    targetCount,
    executionDate,
    objectives,
    uploadedImages = [] 
  }, ref) => {
    useEffect(() => {
      const canvas = ref as React.RefObject<HTMLCanvasElement>;
      const ctx = canvas.current?.getContext('2d');
      const image = new Image();
      
      image.crossOrigin = "anonymous";

      image.onload = async () => {
        if (canvas.current && ctx) {
          canvas.current.width = image.width;
          canvas.current.height = image.height;
          ctx.drawImage(image, 0, 0);
          
          // Draw all labels
          drawTextBox(ctx, textBoxConfigs.adminText);
          drawTextBox(ctx, textBoxConfigs.executorLabel);
          drawTextBox(ctx, textBoxConfigs.locationLabel);
          drawTextBox(ctx, textBoxConfigs.targetLabel);
          drawTextBox(ctx, textBoxConfigs.targetCountLabel);
          drawTextBox(ctx, textBoxConfigs.executionDateLabel);
          drawTextBox(ctx, textBoxConfigs.objectivesLabel);
          drawTextBox(ctx, textBoxConfigs.evidenceLabel);
          
          if (region) {
            drawTextBox(ctx, { ...textBoxConfigs.region, text: `بمنطقة ${region}` });
          }

          if (educationOffice) {
            drawTextBox(ctx, { ...textBoxConfigs.educationOffice, text: `${educationOffice}` });
          }
          
          const textFields = {
            school: schoolName,
            manager: managerName,
            event: eventName,
            executor,
            location,
            target,
            targetCount,
            executionDate,
            objectives
          };

          Object.entries(textFields).forEach(([key, text]) => {
            if (text && textBoxConfigs[key]) {
              const config = { ...textBoxConfigs[key], text };
              drawTextBox(ctx, config);
            }
          });

          if (uploadedImages.length > 0) {
            await drawImages(ctx, uploadedImages, {
              x: 66,
              y: 700,
              width: 780,
              height: 380
            });
          }
        }
      };

      image.src = imageUrl;
    }, [imageUrl, schoolName, region, educationOffice, managerName, eventName, executor, location, target, targetCount, executionDate, objectives, uploadedImages]);

    return (
      <canvas
        ref={ref}
        className="w-full h-auto rounded-lg shadow-lg"
      />
    );
  }
);
