import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { BottomSheet, Picker } from '../src';
import '../src/styles/BottomSheet.css';
import '../src/styles/List.css';
import '../src/styles/ListItem.css';
import '../src/styles/ListCenter.css';

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'mobile1',
      viewports: {
        mobile1: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        }, 
      },
    },
    docs: {
      story: {
        inline: false,
        iframeHeight: 500,
        iframeWidth: 320,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the bottom sheet is open',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark', 'auto'],
      description: 'Theme of the bottom sheet',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const BasicBottomSheetTemplate = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#007AFF',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Open BottomSheet
      </button>
      <BottomSheet 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        style={{ maxWidth: '375px', margin: '0 auto' }}
        button={
          <button
            onClick={() => setIsOpen(false)}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '17px',
              fontWeight: '600',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#007AFF',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Confirm
          </button>
        }
      >
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Hello!</h3>
          <p style={{ margin: 0, color: '#666' }}>This is a basic bottom sheet example.</p>
        </div>
      </BottomSheet>
    </div>
  );
};

export const Basic: Story = {
  render: () => <BasicBottomSheetTemplate />,
};

const WithPickerTemplate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | number>('Option 3');
  
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7'];

  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#007AFF',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Select: {selected}
      </button>
      <BottomSheet 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        style={{ maxWidth: '375px', margin: '0 auto' }}
        button={
          <button
            onClick={() => setIsOpen(false)}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '17px',
              fontWeight: '600',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#007AFF',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Done
          </button>
        }
      >
        <Picker
          list={options}
          initialSelected={selected}
          onSelectedChange={setSelected}
          itemHeight={44}
        />
      </BottomSheet>
    </div>
  );
};

export const WithPicker: Story = {
  render: () => <WithPickerTemplate />,
};

const WithMultiplePickersTemplate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hour, setHour] = useState<string | number>(12);
  const [minute, setMinute] = useState<string | number>('30');
  const [period, setPeriod] = useState<string | number>('PM');

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
  const periods = ['AM', 'PM'];

  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#007AFF',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Time: {hour}:{minute} {period}
      </button>
      <BottomSheet 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        style={{ maxWidth: '375px', margin: '0 auto' }}
        button={
          <button
            onClick={() => setIsOpen(false)}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '17px',
              fontWeight: '600',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#007AFF',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Set Time
          </button>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', justifyContent: 'center', width: '100%', paddingLeft: '20px', paddingRight: '20px', paddingTop: '20px', paddingBottom: '20px', boxSizing: 'border-box' }}>
          <Picker
            list={hours}
            initialSelected={hour}
            onSelectedChange={setHour}
            itemHeight={44}
            style={{ flex: '1 1 0', minWidth: 0 }}
          />
          <Picker
            list={minutes}
            initialSelected={minute}
            onSelectedChange={setMinute}
            itemHeight={44}
            style={{ flex: '1 1 0', minWidth: 0 }}
          />
          <Picker
            list={periods}
            initialSelected={period}
            onSelectedChange={setPeriod}
            itemHeight={44}
            style={{ flex: '1 1 0', minWidth: 0 }}
          />
        </div>
      </BottomSheet>
    </div>
  );
};

export const WithMultiplePickers: Story = {
  render: () => <WithMultiplePickersTemplate />,
};

const DarkThemeTemplate = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#1C1C1E',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Open Dark BottomSheet
      </button>
      <BottomSheet 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        theme="dark"
        style={{ maxWidth: '375px', margin: '0 auto' }}
        button={
          <button
            onClick={() => setIsOpen(false)}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '17px',
              fontWeight: '600',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#0A84FF',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Confirm
          </button>
        }
      >
        <div style={{ padding: '20px', textAlign: 'center', color: 'white' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Dark Theme</h3>
          <p style={{ margin: 0, color: '#8E8E93' }}>This bottom sheet uses dark theme.</p>
        </div>
      </BottomSheet>
    </div>
  );
};

export const DarkTheme: Story = {
  render: () => <DarkThemeTemplate />,
};

