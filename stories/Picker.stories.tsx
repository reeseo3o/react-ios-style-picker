import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Picker } from '../src';
import '../src/styles/List.css';
import '../src/styles/ListItem.css';
import '../src/styles/ListCenter.css';

const meta: Meta<typeof Picker> = {
  title: 'Components/Picker',
  component: Picker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    itemHeight: {
      control: { type: 'range', min: 30, max: 80, step: 2 },
      description: 'Height of each item in the picker',
    },
    showGradientMask: {
      control: 'boolean',
      description: 'Whether to show gradient mask at top and bottom',
    },
    showCenterIndicator: {
      control: 'boolean',
      description: 'Whether to show center selection indicator',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark', 'auto'],
      description: 'Theme of the picker',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Picker
const BasicPickerTemplate = () => {
  const [selected, setSelected] = useState<string | number>('Option 3');
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7'];

  return (
    <div style={{ width: '200px' }}>
      <p style={{ textAlign: 'center', marginBottom: '16px' }}>
        Selected: <strong>{selected}</strong>
      </p>
      <Picker
        list={options}
        initialSelected={selected}
        onSelectedChange={setSelected}
        itemHeight={44}
      />
    </div>
  );
};

export const Basic: Story = {
  render: () => <BasicPickerTemplate />,
};

const NumberPickerTemplate = () => {
  const [selected, setSelected] = useState<string | number>(25);
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div style={{ width: '120px' }}>
      <p style={{ textAlign: 'center', marginBottom: '16px' }}>
        Selected: <strong>{selected}</strong>
      </p>
      <Picker
        list={numbers}
        initialSelected={selected}
        onSelectedChange={setSelected}
        itemHeight={50}
      />
    </div>
  );
};

export const Numbers: Story = {
  render: () => <NumberPickerTemplate />,
};

const DatePickerTemplate = () => {
  const [year, setYear] = useState<string | number>(2024);
  const [month, setMonth] = useState<string | number>(6);
  const [day, setDay] = useState<string | number>(15);

  const years = Array.from({ length: 50 }, (_, i) => 2000 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div>
      <p style={{ textAlign: 'center', marginBottom: '16px' }}>
        Selected: <strong>{year}/{month}/{day}</strong>
      </p>
      <div style={{ display: 'flex', gap: '8px', width: '280px' }}>
        <Picker
          list={years}
          initialSelected={year}
          onSelectedChange={setYear}
          itemHeight={40}
          style={{ flex: 1 }}
        />
        <Picker
          list={months}
          initialSelected={month}
          onSelectedChange={setMonth}
          itemHeight={40}
          style={{ flex: 1 }}
        />
        <Picker
          list={days}
          initialSelected={day}
          onSelectedChange={setDay}
          itemHeight={40}
          style={{ flex: 1 }}
        />
      </div>
    </div>
  );
};

export const DatePicker: Story = {
  render: () => <DatePickerTemplate />,
};

const WithoutCenterIndicatorTemplate = () => {
  const [selected, setSelected] = useState<string | number>('Apple');
  const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];

  return (
    <div style={{ width: '200px' }}>
      <p style={{ textAlign: 'center', marginBottom: '16px' }}>
        Selected: <strong>{selected}</strong>
      </p>
      <Picker
        list={fruits}
        initialSelected={selected}
        onSelectedChange={setSelected}
        itemHeight={44}
        showCenterIndicator={false}
      />
    </div>
  );
};

export const WithoutCenterIndicator: Story = {
  render: () => <WithoutCenterIndicatorTemplate />,
};

const WithoutGradientMaskTemplate = () => {
  const [selected, setSelected] = useState<string | number>('Medium');
  const sizes = ['XS', 'Small', 'Medium', 'Large', 'XL', 'XXL'];

  return (
    <div style={{ width: '150px' }}>
      <p style={{ textAlign: 'center', marginBottom: '16px' }}>
        Selected: <strong>{selected}</strong>
      </p>
      <Picker
        list={sizes}
        initialSelected={selected}
        onSelectedChange={setSelected}
        itemHeight={44}
        showGradientMask={false}
      />
    </div>
  );
};

export const WithoutGradientMask: Story = {
  render: () => <WithoutGradientMaskTemplate />,
};

const DarkThemeTemplate = () => {
  const [selected, setSelected] = useState<string | number>('Dark');
  const themes = ['Light', 'Dark', 'System', 'Custom'];

  return (
    <div style={{ width: '150px', backgroundColor: '#1C1C1E', padding: '20px', borderRadius: '12px' }}>
      <p style={{ textAlign: 'center', marginBottom: '16px', color: 'white' }}>
        Selected: <strong>{selected}</strong>
      </p>
      <Picker
        list={themes}
        initialSelected={selected}
        onSelectedChange={setSelected}
        itemHeight={44}
        theme="dark"
      />
    </div>
  );
};

export const DarkTheme: Story = {
  render: () => <DarkThemeTemplate />,
};

const CustomStyledTemplate = () => {
  const [selected, setSelected] = useState<string | number>('Primary');
  const colors = ['Primary', 'Secondary', 'Success', 'Warning', 'Error'];

  return (
    <div style={{ width: '200px' }}>
      <p style={{ textAlign: 'center', marginBottom: '16px' }}>
        Selected: <strong>{selected}</strong>
      </p>
      <Picker
        list={colors}
        initialSelected={selected}
        onSelectedChange={setSelected}
        itemHeight={50}
        itemClassName="custom-item"
        itemStyle={{ fontWeight: 'bold', color: '#007AFF' }}
        style={{ border: '2px solid #007AFF', borderRadius: '12px', overflow: 'hidden' }}
      />
    </div>
  );
};

export const CustomStyled: Story = {
  render: () => <CustomStyledTemplate />,
};

