import * as React from "react";
import { Nav } from "rsuite";

export interface ModulePickerProps {
  selectedSession: string;
  onSelect: (session: string) => void;
}

export default function ModulePicker({ selectedSession, onSelect }: ModulePickerProps) {
  return (
    <Nav
      appearance="tabs"
      activeKey={selectedSession}
      onSelect={onSelect}
    >
      <Nav.Item eventKey="1">Module 1</Nav.Item>
      <Nav.Item eventKey="2">Module 2</Nav.Item>
      <Nav.Item eventKey="3">Module 3</Nav.Item>
      <Nav.Item eventKey="4">Module 4</Nav.Item>
      <Nav.Item eventKey="5">Module 5</Nav.Item>
      <Nav.Item eventKey="6">Module 6</Nav.Item>
    </Nav>
  );
}
