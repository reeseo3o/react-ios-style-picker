# react-ios-style-picker

`react-ios-style-picker` is a highly customizable, easy-to-use React component library designed to mimic the native iOS picker interface. This library provides an accessible way to integrate picker functionality into your React applications. The components are built with flexibility in mind, allowing for extensive customization in terms of appearance and behavior.

The library includes two main components:

- **Picker**: Enables users to select options from a scrollable list, which can be customized with various styles and callback functions.
- **BottomSheet**: A versatile component that slides up from the bottom of the screen, perfect for housing pickers, menus, or other content in a modal overlay.

Whether you're building a mobile-first design or adding mobile-friendly elements to a responsive web application, `react-ios-style-picker` provides the tools you need to incorporate sleek, intuitive selection interfaces.

### Key Features:

- **iOS-like Interface**: Provides a user experience similar to the native iOS picker, making it ideal for creating consistent and familiar interfaces across web and mobile platforms.
- **Customizable Appearance**: Offers extensive styling options to match the picker and bottom sheet components with your application's theme.
- **Flexible Functionality**: Supports a variety of use cases from simple date pickers to more complex custom selector interfaces.
- **Accessibility Focused**: Designed with accessibility in mind, ensuring that all users can navigate and interact with the components effectively.

#### Picker

The Picker component allows users to select an item from a scrollable list. It is customizable with styles and callback functions.

##### Props

- list ((string | number)[]): Array of items to display in the picker.
- itemHeight (number): Height of each item in the picker. Default is 50.
- initialSelected (string | number): Initially selected item.
- onSelectedChange (Function): Callback function that is called when a new item is selected.
- itemClassName (string): Additional CSS class for each item.
- itemStyle ({[key: string]: string}): Inline styles for each item.

##### Example Usage

```jsx
import Picker from "./components/Picker";

function App() {
  return (
    <Picker
      list={["Option 1", "Option 2", "Option 3"]}
      itemHeight={40}
      initialSelected="Option 2"
      onSelectedChange={(selected) => console.log(`Selected: ${selected}`)}
      itemClassName="custom-item-class"
      itemStyle={{ color: "red" }}
    />
  );
}
```

### BottomSheet

The BottomSheet component is used to display content in a sliding panel from the bottom. It is ideal for modal views.

##### Props

- children (React.ReactNode | React.ReactNode[]): The content to display inside the BottomSheet.
- isOpen (boolean): Whether the BottomSheet is visible.
- onClose (Function): Function to call when the BottomSheet needs to be closed.
- className (string): Additional CSS class for the overlay.
- style (React.CSSProperties): Inline styles for the BottomSheet content.
- button (React.ReactNode): An optional button that can be displayed in the BottomSheet.

###### Example Usage

```jsx
import BottomSheet from "./components/BottomSheet";

function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open BottomSheet</button>
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        button={<button onClick={() => alert("Clicked!")}>Click Me</button>}
        className="custom-overlay-class"
        style={{ padding: "20px" }}
      >
        <div>Content goes here</div>
      </BottomSheet>
    </>
  );
}
```

### Installation

To use these components in your project, you need to install the library via npm or yarn:

`npm install react-ios-style-picker`
or
`yarn add react-ios-style-picker`
