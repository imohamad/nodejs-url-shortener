import {
    trigger,
    animate,
    transition,
    style,
    query
  } from '@angular/animations';
  
  export const fadeAnimation = trigger('fadeAnimation', [
    transition("void => *", [
      style({opacity: 0, transform: 'translateY(-5%)'}),
      animate('0.2s')
    ])
  ]);
  
  
  