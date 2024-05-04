import React from 'react';

export class ControlMapFactory {
  controlMap: Record<string, React.ComponentType | undefined> = {};

  getComponent(shape: string): React.ComponentType<any> | undefined {
    return this.controlMap[shape];
  }

  setComponent(shape: string, component: React.ComponentType<any>) {
    this.controlMap[shape] = component;
  }
}

export const ControlMap = new ControlMapFactory();
