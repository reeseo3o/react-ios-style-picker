'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

var List = React.forwardRef(function (_a, ref) {
    var children = _a.children, onScroll = _a.onScroll, itemStyle = _a.itemStyle;
    return (jsxRuntime.jsx("ul", { ref: ref, onScroll: onScroll, className: "list", style: itemStyle, children: children }));
});
List.displayName = "List";

var css_248z$2 = ".list-item {\n  display: flex;\n  height: 3rem;\n  align-items: center;\n  justify-content: center;\n  opacity: 0.4;\n}\n\n.list-item.selected {\n  height: 2.5rem;\n  align-items: center;\n  justify-content: center;\n  align-self: stretch;\n  border-radius: 0.5rem;\n  background-color: rgba(128, 128, 128, 0.5);\n  font-weight: 600;\n  opacity: 1;\n}\n";
styleInject(css_248z$2);

var ListItem = React.forwardRef(function (_a, ref) {
    var children = _a.children, isSelected = _a.isSelected;
    return (jsxRuntime.jsx("li", { ref: ref, className: "list-item ".concat(isSelected ? "selected" : ""), children: children }));
});
ListItem.displayName = "ListItem";

var css_248z$1 = ".list-center {\n  position: sticky;\n  top: 3rem;\n  height: 3rem;\n}\n";
styleInject(css_248z$1);

var ListCenter = function () { return jsxRuntime.jsx("div", { className: "list-center" }); };

var useScrollSelection = function (_a) {
    var list = _a.list, itemHeight = _a.itemHeight, initialSelected = _a.initialSelected, onSelectedChange = _a.onSelectedChange;
    var _b = React.useState(0), selectedIndex = _b[0], setSelectedIndex = _b[1];
    var _c = React.useState(itemHeight || 50), measuredItemHeight = _c[0], setMeasuredItemHeight = _c[1];
    var scrollRef = React.useRef(null);
    var itemRef = React.useRef(null);
    React.useLayoutEffect(function () {
        if (initialSelected && scrollRef.current) {
            var index = list.findIndex(function (item) {
                return React__default["default"].isValidElement(item) && React__default["default"].isValidElement(initialSelected)
                    ? item.key === initialSelected.key ||
                        item.props.children === initialSelected.props.children
                    : item === initialSelected;
            });
            if (index !== -1) {
                setSelectedIndex(index);
                scrollRef.current.scrollTop = index * measuredItemHeight;
            }
        }
    }, [initialSelected, measuredItemHeight, list]);
    React.useEffect(function () {
        if (itemRef.current && !itemHeight) {
            setMeasuredItemHeight(itemRef.current.clientHeight);
        }
    }, [itemHeight]);
    var handleScroll = React.useCallback(function () {
        if (scrollRef.current) {
            var scrollTop = scrollRef.current.scrollTop;
            var index = Math.round(scrollTop / measuredItemHeight);
            console.log("Scroll top:", scrollTop);
            console.log("Measured item height:", measuredItemHeight);
            console.log("Calculated index:", index);
            if (index >= 0 && index < list.length && index !== selectedIndex) {
                setSelectedIndex(index);
                onSelectedChange === null || onSelectedChange === void 0 ? void 0 : onSelectedChange(list[index]);
            }
        }
    }, [selectedIndex, measuredItemHeight, list, onSelectedChange]);
    return {
        selectedIndex: selectedIndex,
        scrollRef: scrollRef,
        handleScroll: handleScroll,
        itemRef: itemRef,
    };
};

var Picker = function (_a) {
    var list = _a.list, itemHeight = _a.itemHeight, initialSelected = _a.initialSelected, onSelectedChange = _a.onSelectedChange;
    var _b = useScrollSelection({
        list: list,
        itemHeight: itemHeight,
        initialSelected: initialSelected,
        onSelectedChange: onSelectedChange,
    }), selectedIndex = _b.selectedIndex, scrollRef = _b.scrollRef, handleScroll = _b.handleScroll, itemRef = _b.itemRef;
    return (jsxRuntime.jsxs(List, { ref: scrollRef, onScroll: handleScroll, children: [jsxRuntime.jsx(ListCenter, {}), list.map(function (item, index) { return (jsxRuntime.jsx(ListItem, { ref: index === 0 ? itemRef : null, isSelected: index === selectedIndex, children: item }, index)); })] }));
};

var css_248z = ".bottom-sheet-overlay {\n  width: 100%;\n  height: 100vh;\n  background: var(--Gray-wh, #ebebeb);\n  background-color: #c0c0c0;\n}\n\n.bottom-sheet-content {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  overflow-y: auto;\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n  width: 100%;\n  border-radius: 24px 24px 0px 0px;\n  background-color: #ffffff;\n  box-shadow: 0px 8px 20px 0px rgba(14, 31, 53, 0.2);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.bottom-sheet {\n}\n\n.bottom-sheet-button {\n  text-align: center;\n  padding: 10px;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n}\n";
styleInject(css_248z);

var BottomSheet = function (_a) {
    var children = _a.children, isOpen = _a.isOpen, onClose = _a.onClose, _b = _a.className, className = _b === void 0 ? "" : _b, _c = _a.style, style = _c === void 0 ? {} : _c, button = _a.button;
    if (!isOpen)
        return null;
    return (jsxRuntime.jsxs("div", { className: "bottom-sheet-overlay ".concat(className), onClick: onClose, children: [jsxRuntime.jsx("div", { style: style, className: "bottom-sheet-content", onClick: function (e) { return e.stopPropagation(); }, children: children }), button && jsxRuntime.jsx("div", { className: "bottom-sheet-button", children: button })] }));
};

exports.BottomSheet = BottomSheet;
exports.Picker = Picker;
//# sourceMappingURL=bundle.js.map
