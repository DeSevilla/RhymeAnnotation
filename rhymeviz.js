import nlp from 'nlp_compromise';
import nlpSyllables from 'nlp-syllables';


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var textareaStyle = {
  width: '400px',
  height: '400px'
};

var buttonStyle = {
  border: 'none',
  color: 'blue',
  cursor: 'pointer'
};

var displayStyle = {
  float: "left",
  height: "700px"
  /*
  const matrixStyle = {
      width: "1000px",
      height: "1000px"
  }*/

};function SSArray(props) {
  var ssArray = Array(props.arrayColors.length);
  var ourLineHeight;
  var squareSize;
  if (props.arrayColors.length < 200) {
    ourLineHeight = (Math.floor(500 / props.arrayColors.length) + 1).toString() + "px";
    squareSize = (Math.floor(500 / props.arrayColors.length) + 1).toString() + "px";
  } else {
    ourLineHeight = (Math.floor(800 / props.arrayColors.length) + 1).toString() + "px";
    squareSize = (Math.floor(800 / props.arrayColors.length) + 1).toString() + "px";
  }
  var arrayStyle = {
    lineHeight: ourLineHeight
  };
  for (var i = 0; i < props.arrayColors.length; i++) {
    //console.log("a");
    //console.log(i);
    ssArray[i] = Array(props.arrayColors.length);
    for (var j = 0; j < props.arrayColors.length; j++) {
      //console.log("b");
      //console.log(j);
      if (props.arrayColors[i] === props.arrayColors[j]) {
        //console.log("c");
        ssArray[i][j] = {
          display: "block",
          float: "left",
          background: props.arrayColors[j],
          width: squareSize,
          height: squareSize
        };
      } else {
        //console.log("d");
        ssArray[i][j] = {
          display: "block",
          float: "left",
          background: "white",
          width: squareSize,
          height: squareSize
        };
      }
    }
  }
  //console.log("z");
  var output = ssArray.map(function (anArray, index1) {
    return React.createElement(
      'div',
      { key: index1, style: arrayStyle },
      ' ',
      anArray.map(function (aStyle, index2) {
        return React.createElement('span', { key: index2, style: aStyle });
      }),
      React.createElement('br', null),
      ' '
    );
  });
  return output;
}

function ArrayBlock(props) {
  var output = props.textArray.map(function (string, index) {
    if (string == "<br/>") {
      return React.createElement('br', { key: index });
    } else {
      return React.createElement(WordToColor, { key: string + index.toString(), id: index, text: string,
        color: props.color, changeArray: props.changeArray });
    }
  });
  return React.createElement(
    'div',
    null,
    output
  );
}

var AnnotationBlock = function (_React$Component) {
  _inherits(AnnotationBlock, _React$Component);

  function AnnotationBlock(props) {
    _classCallCheck(this, AnnotationBlock);

    //console.log(props.textArray);
    var _this = _possibleConstructorReturn(this, (AnnotationBlock.__proto__ || Object.getPrototypeOf(AnnotationBlock)).call(this, props));

    _this.state = {
      text: props.startText,
      textArray: props.textArray,
      arrayBlock: React.createElement(ArrayBlock, { textArray: ["hi"], color: 'green', changeArray: _this.changeArray }),
      inProgressColor: "red",
      color: props.color,
      input: true
    };
    _this.arrayColors = ["green"];
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleColorSubmit = _this.handleColorSubmit.bind(_this);
    _this.changeArray = _this.changeArray.bind(_this);
    return _this;
  }

  _createClass(AnnotationBlock, [{
    key: 'handleChange',
    value: function handleChange(event) {
      //console.log("here1");
      this.setState(_defineProperty({}, event.target.name, event.target.value));
      //console.log("there1");
    }
  }, {
    key: 'handleColorSubmit',
    value: function handleColorSubmit(event) {
      var _this2 = this;

      /*console.log("hi");
      console.log(this.state.text);
      console.log("done");*/
      this.setState({
        color: this.state.inProgressColor
      }, function () {
        console.log("updating" + _this2.state.color);
        _this2.setState({
          arrayBlock: React.createElement(ArrayBlock, { textArray: _this2.state.textArray, color: _this2.state.color, changeArray: _this2.changeArray })
        });console.log("Should be done");
      });
      //console.log(this.state.color);
      event.preventDefault();
    }
  }, {
    key: 'concatArrays',
    value: function concatArrays(array1, array2) {
      return array1.concat(array2);
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      var _this3 = this;

      //console.log("here");
      var intermediate = this.state.text.replace(/\n/g, " <br/> ");
	  nlp.plugin(nlpSyllables);
	  var t2 = nlp.term(intermediate);
      var ar = [].concat.apply([], t2.syllables());
      //console.log(ar);
      this.setState({
        textArray: ar
      }, function () {
        _this3.arrayColors = _this3.state.textArray.map(function (string) {
          return "white";
        });
        _this3.setState({
          arrayBlock: React.createElement(ArrayBlock, { textArray: _this3.state.textArray, color: _this3.state.color, changeArray: _this3.changeArray })
        });
      });
      event.preventDefault();
      this.setState({
        input: false
      });
    }
  }, {
    key: 'changeArray',
    value: function changeArray(id, color) {
      //console.log("changing color");
      this.arrayColors[id] = color;
      this.setState({
        color: this.state.color
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      //console.log(this.state.textArray);
      if (this.state.input) {
        return React.createElement(
          'div',
          { style: displayStyle },
          'Copy and paste text into the box and click "submit".',
          React.createElement(
            'form',
            { onSubmit: this.handleSubmit },
            React.createElement('textarea', { value: this.state.text, name: 'text', onChange: this.handleChange, style: textareaStyle }),
            React.createElement('input', { type: 'submit', value: 'Submit' })
          )
        );
      } else {
        return React.createElement(
          'div',
          null,
          React.createElement(
            'button',
            { onClick: function onClick() {
                _this4.setState({
                  input: true
                });
              } },
            'Return to input'
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'form',
              { onSubmit: this.handleColorSubmit },
              React.createElement(
                'label',
                null,
                'Color:',
                React.createElement('input', { type: 'text', name: 'inProgressColor', value: this.state.inProgressColor, onChange: this.handleChange })
              ),
              React.createElement('input', { type: 'submit', value: 'Submit' })
            ),
            React.createElement(ArrayBlock, { textArray: this.state.textArray, color: this.state.color, changeArray: this.changeArray })
          ),
          React.createElement(
            'div',
            null,
            React.createElement(SSArray, { arrayColors: this.arrayColors })
          )
        );
      }
    }
  }]);

  return AnnotationBlock;
}(React.Component);

var WordToColor = function (_React$Component2) {
  _inherits(WordToColor, _React$Component2);

  function WordToColor(props) {
    _classCallCheck(this, WordToColor);

    var _this5 = _possibleConstructorReturn(this, (WordToColor.__proto__ || Object.getPrototypeOf(WordToColor)).call(this, props));

    _this5.state = {
      color: props.color,
      buttonStyle: {
        border: "none",
        background: "white",
        color: "black",
        display: "inline-block"
      }

    };

    _this5.handleClick = _this5.handleClick.bind(_this5);

    return _this5;
  }

  _createClass(WordToColor, [{
    key: 'handleClick',
    value: function handleClick(e) {
      var _this6 = this;

      this.setState({
        color: this.props.color
      }, function () {
        _this6.setState({
          buttonStyle: {
            border: "none",
            background: "white",
            color: _this6.state.color,
            display: "inline-block"
          } });
      });
      this.props.changeArray(this.props.id, this.props.color);
      e.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {

      return React.createElement(
        'button',
        { onClick: this.handleClick, style: this.state.buttonStyle },
        this.props.text
      );
    }
  }]);

  return WordToColor;
}(React.Component);

ReactDOM.render(React.createElement(AnnotationBlock, { startText: '', color: 'red', textArray: [""] }),
//<SSArray arrayColors={["#ad1453","red","red","red","red","red","blue","#ad1453"]}/>,
//<WordToColor key="hi" text="Destruction" color="green"/>,
//<ArrayBlock textArray={["Hello", "World"]} color="blue" changeArray={()=>{console.log("chan");}}/>,
document.getElementById('root'));

var domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(AnnotationBlock), domContainer);