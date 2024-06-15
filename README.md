# react-ios-style-picker

## Picker

## Props

- `list`: (필수) 표시할 아이템 리스트
- `itemHeight`: (선택) 아이템의 높이, 기본값 50
- `onSelectedChange`: (선택) 선택된 아이템이 변경될 때 호출되는 콜백 함수
- `initialSelected`: (선택) 초기 선택된 아이템
- `className`: (선택) 리스트에 적용할 클래스명
- `itemClassName`: (선택) 각 아이템에 적용할 클래스명

## 사용 예시

```jsx
import Picker from "./Picker";

const MESSAGE = () => {
  const handleSelectedChange = (selected) => {
    console.log("Selected item:", selected);
  };

  return (
    <Picker
      list={["Item 1", "Item 2", "Item 3"]}
      onSelectedChange={handleSelectedChange}
      initialSelected={"Item 2"}
      className="ios-picker"
      itemClassName="ios-picker-item"
    />
  );
};
```
