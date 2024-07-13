import React from 'react';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';

interface AppBarProps {
  onSave: () => void;
  onLoad: () => void;
}

const AppBar: React.FC<AppBarProps> = ({ onSave, onLoad }) => {
  const leftContents = (
    <React.Fragment>
      <h1 className="text-2xl font-bold">BORON ver:alpha</h1>
    </React.Fragment>
  );

  const rightContents = (
    <React.Fragment>
      <Button 
        label="Save" 
        icon="pi pi-save" 
        className="p-button-success mr-2" 
        onClick={onSave} 
      />
      <Button 
        label="Load" 
        icon="pi pi-upload" 
        className="p-button-info" 
        onClick={onLoad} 
      />
    </React.Fragment>
  );

  return (
    <Toolbar 
      left={leftContents} 
      right={rightContents} 
      className="bg-blue-600 text-white"
    />
  );
};

export default AppBar;