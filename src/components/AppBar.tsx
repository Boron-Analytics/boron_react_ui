import React from 'react';
import { Save, Upload } from 'lucide-react';

interface AppBarProps {
  onSave: () => void;
  onLoad: () => void;
}

const AppBar: React.FC<AppBarProps> = ({ onSave, onLoad }) => {
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">BORON ver:alpha</h1>
      <div className="flex space-x-4">
        <button
          onClick={onSave}
          className="bg-white text-blue-600 px-4 py-2 rounded-md flex items-center hover:bg-blue-100 transition-colors"
        >
          <Save className="w-5 h-5 mr-2" />
          Save
        </button>
        <button
          onClick={onLoad}
          className="bg-white text-blue-600 px-4 py-2 rounded-md flex items-center hover:bg-blue-100 transition-colors"
        >
          <Upload className="w-5 h-5 mr-2" />
          Load
        </button>
      </div>
    </div>
  );
};

export default AppBar;