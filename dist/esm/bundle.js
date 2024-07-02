import { jsx, jsxs } from 'react/jsx-runtime';
import { forwardRef, useState, useRef, useLayoutEffect, useEffect } from 'react';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$3 = ".list {\n  position: relative;\n  margin: 0;\n  height: 9rem;\n  width: 100%;\n  list-style: none;\n  overflow: hidden;\n  overflow-y: scroll;\n  padding: 0;\n}\n\n.list::-webkit-scrollbar {\n  display: none;\n}\n\n.list {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n";
styleInject(css_248z$3);

var List = forwardRef(function (_a, ref) {
    var children = _a.children, onScroll = _a.onScroll, itemStyle = _a.itemStyle;
    return (jsx("ul", { ref: ref, onScroll: onScroll, className: "list", style: itemStyle, children: children }));
});
List.displayName = "List";

var css_248z$2 = ".list-item {\n  display: flex;\n  height: 3rem;\n  align-items: center;\n  justify-content: center;\n  opacity: 0.4;\n}\n\n.list-item.selected {\n  height: 2.5rem;\n  align-items: center;\n  justify-content: center;\n  align-self: stretch;\n  border-radius: 0.5rem;\n  background-color: rgba(128, 128, 128, 0.5);\n  font-weight: 600;\n  opacity: 1;\n}\n";
styleInject(css_248z$2);

var ListItem = forwardRef(function (_a, ref) {
    var children = _a.children, isSelected = _a.isSelected;
    return (jsx("li", { ref: ref, className: "list-item ".concat(isSelected ? "selected" : ""), children: children }));
});
ListItem.displayName = "ListItem";

var css_248z$1 = ".list-center {\n  position: sticky;\n  top: 3rem;\n  height: 3rem;\n}\n";
styleInject(css_248z$1);

var ListCenter = function () { return jsx("div", { className: "list-center" }); };

var useScrollSelection = function (_a) {
    var list = _a.list, initialSelected = _a.initialSelected, onSelectedChange = _a.onSelectedChange;
    var _b = useState(function () {
        return list.indexOf(initialSelected);
    }), selectedIndex = _b[0], setSelectedIndex = _b[1];
    var _c = useState(50), itemHeight = _c[0], setItemHeight = _c[1];
    var scrollRef = useRef(null);
    var itemRef = useRef(null);
    useLayoutEffect(function () {
        if (itemRef.current) {
            setItemHeight(itemRef.current.clientHeight);
        }
    }, []);
    useEffect(function () {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = selectedIndex * itemHeight;
        }
    }, [selectedIndex, itemHeight]);
    var handleScroll = function () {
        if (scrollRef.current) {
            var index = Math.floor(scrollRef.current.scrollTop / itemHeight);
            setSelectedIndex(index);
            onSelectedChange(list[index]);
        }
    };
    return {
        selectedIndex: selectedIndex,
        scrollRef: scrollRef,
        handleScroll: handleScroll,
        itemRef: itemRef,
    };
};

var Picker = function (_a) {
    var list = _a.list, initialSelected = _a.initialSelected, _b = _a.onSelectedChange, onSelectedChange = _b === void 0 ? function () { } : _b;
    var _c = useScrollSelection({
        list: list,
        initialSelected: initialSelected,
        onSelectedChange: onSelectedChange,
    }), selectedIndex = _c.selectedIndex, scrollRef = _c.scrollRef, handleScroll = _c.handleScroll, itemRef = _c.itemRef;
    return (jsxs(List, { ref: scrollRef, onScroll: handleScroll, children: [jsx(ListCenter, {}), list.map(function (item, index) { return (jsx(ListItem, { ref: index === 0 ? itemRef : null, isSelected: index === selectedIndex, children: item }, index)); })] }));
};

var css_248z = ".bottom-sheet-overlay {\n  width: 100%;\n  height: 100vh;\n  background: var(--Gray-wh, #ebebeb);\n  background-color: #c0c0c0;\n}\n\n.bottom-sheet-content {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  overflow-y: auto;\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n  width: 100%;\n  border-radius: 24px 24px 0px 0px;\n  background-color: #ffffff;\n  box-shadow: 0px 8px 20px 0px rgba(14, 31, 53, 0.2);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.bottom-sheet {\n}\n\n.bottom-sheet-button {\n  text-align: center;\n  padding: 10px;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n}\n";
styleInject(css_248z);

var BottomSheet = function (_a) {
    var children = _a.children, isOpen = _a.isOpen, onClose = _a.onClose, _b = _a.className, className = _b === void 0 ? "" : _b, _c = _a.style, style = _c === void 0 ? {} : _c, button = _a.button;
    if (!isOpen)
        return null;
    return (jsxs("div", { className: "bottom-sheet-overlay ".concat(className), onClick: onClose, children: [jsx("div", { style: style, className: "bottom-sheet-content", onClick: function (e) { return e.stopPropagation(); }, children: children }), button && jsx("div", { className: "bottom-sheet-button", children: button })] }));
};

export { BottomSheet, Picker };
//# sourceMappingURL=bundle.js.map
