var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.state = {
      rows: [{
        name: 'top',
        index: 0,
        value: 0,
        endValue: 0,
        speed: 200,
        isRunning: true,
        key: Math.random(),
        direction: 'ltr'
      }, {
        name: 'center',
        value: 0,
        index: 1,
        endValue: 0,
        speed: 200,
        isRunning: true,
        key: Math.random(),
        direction: 'rtl'
      }, {
        name: 'bottom',
        value: 0,
        index: 2,
        endValue: 0,
        speed: 200,
        isRunning: true,
        key: Math.random(),
        direction: 'ltr'
      }],
      prize: 'none',
      activeRowIndex: 0
    };
    _this.handleClick = _this.handleClick.bind(_this);
    _this.updateActiveRow = _this.updateActiveRow.bind(_this);
    _this.setEndValue = _this.setEndValue.bind(_this);
    _this.setRotatingValue = _this.setRotatingValue.bind(_this);
    _this.cancelInterval = _this.cancelInterval.bind(_this);
    _this.resetGame = _this.resetGame.bind(_this);
    _this.determinePrize = _this.determinePrize.bind(_this);
    document.body.addEventListener('touchstart', _this.handleClick.bind(_this));
    window.addEventListener('keypress', _this.handleClick.bind(_this));
    return _this;
  }

  _createClass(App, [{
    key: 'handleClick',
    value: function handleClick() {
      var index = this.state.activeRowIndex;
      // If click occurs while a row is active
      if (index < this.state.rows.length) {
        //Cancel the row's timer
        this.cancelInterval(index);
        //And set the value it ended on
        this.setEndValue(index, this.state.rows[index].value);
        this.determinePrize();
      }
      // Update the active row index every click
      this.updateActiveRow();
    }
  }, {
    key: 'updateActiveRow',
    value: function updateActiveRow() {
      //If the active section isn't a row
      if (this.state.activeRowIndex < this.state.rows.length) {
        var index = this.state.activeRowIndex + 1;
        this.setState({ activeRowIndex: index });
      } else {
        this.resetGame();
      }
    }
  }, {
    key: 'determinePrize',
    value: function determinePrize() {
      var rows = this.state.rows;
      var endValues = rows.map(function (row) {
        return row.endValue;
      });

      var prize = '';
      endValues.forEach(function (value, index) {
        if (endValues[index] !== endValues[0]) {
          prize = 3; //code for 'No Prize'
        } else {
          prize = endValues[0];
        }
      });

      console.log(prize);
      this.setState({ prize: prize });
    }
  }, {
    key: 'resetGame',
    value: function resetGame() {
      //Generate new key for each row. This forces re-rendering and resetting of timers.
      var rows = this.state.rows.map(function (row) {
        //Generate new key
        row.key = Math.random();
        //Reset running timer
        row.isRunning = true;
        return row;
      });

      //Set the state
      this.setState({ rows: rows });
      this.setState({ activeRowIndex: 0 });
    }
  }, {
    key: 'setRotatingValue',
    value: function setRotatingValue(index, value) {
      var rows = this.state.rows;
      var row = rows[index];
      row.value = value;
      rows[index] = row;
      this.setState({ rows: rows });
    }
  }, {
    key: 'setEndValue',
    value: function setEndValue(index, value) {
      var rows = this.state.rows;
      var row = rows[index];
      row.endValue = value;
      rows[index] = row;
      this.setState({ rows: rows });
    }
  }, {
    key: 'cancelInterval',
    value: function cancelInterval(index) {
      var rows = this.state.rows;
      var row = rows[index];
      row.isRunning = false;
      rows[index] = row;
      this.setState({ rows: rows });
    }
  }, {
    key: 'render',
    value: function render() {
      var rows = this.state.rows.map(function (row) {
        return React.createElement(Row, {
          name: row.name,
          index: row.index,
          data: this.state,
          setEndValue: this.setEndValue,
          setRotatingValue: this.setRotatingValue,
          isRunning: row.isRunning,
          speed: row.speed,
          key: row.key,
          direction: row.direction
        });
      }, this);

      return React.createElement(
        'div',
        { key: this.state.key, ref: 'game' },
        React.createElement(
          'div',
          { className: 'viewport' },
          React.createElement(
            'div',
            { className: 'game' },
            React.createElement(
              'div',
              { className: 'rows' },
              rows
            )
          ),
          React.createElement(Results, { shown: this.state.activeRowIndex === 3, prize: this.state.prize })
        )
      );
    }
  }]);

  return App;
}(React.Component);

var Row = function (_React$Component2) {
  _inherits(Row, _React$Component2);

  function Row() {
    _classCallCheck(this, Row);

    var _this2 = _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).call(this));

    _this2.state = { value: 0 };
    _this2.counterIntervalFunction = _this2.counterIntervalFunction.bind(_this2);
    _this2.clearCounterInterval = _this2.clearCounterInterval.bind(_this2);
    return _this2;
  }

  _createClass(Row, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var interval = setInterval(this.counterIntervalFunction, this.props.speed);
      this.setState({ interval: interval });
    }
  }, {
    key: 'counterIntervalFunction',
    value: function counterIntervalFunction() {
      if (this.props.isRunning && this.props.direction === 'ltr') {
        var value = this.state.value < 2 ? this.state.value + 1 : 0;
        this.setState({ value: value });
        this.props.setRotatingValue(this.props.index, this.state.value);
      } else if (this.props.isRunning && this.props.direction === 'rtl') {
        var value = this.state.value > 0 ? this.state.value - 1 : 2;
        this.setState({ value: value });
        this.props.setRotatingValue(this.props.index, this.state.value);
      } else {
        this.clearCounterInterval();
      }
    }
  }, {
    key: 'clearCounterInterval',
    value: function clearCounterInterval() {
      clearInterval(this.state.interval);
    }
  }, {
    key: 'render',
    value: function render() {
      var activeRowIndex = this.props.data.activeRowIndex;
      var activeClass = this.props.index === activeRowIndex ? 'active' : '';
      var columnsClassList = 'columns columns-' + this.props.name;
      var wrapperClassList = 'row ' + activeClass;
      var animation = this.props.direction + '-transition-' + this.state.value;
      var style = {
        animationName: animation,
        animationDuration: this.props.speed + 'ms'
      };

      return React.createElement(
        'div',
        { className: wrapperClassList },
        React.createElement(
          'div',
          { className: columnsClassList, style: style },
          React.createElement('div', { className: 'column' }),
          React.createElement('div', { className: 'column' }),
          React.createElement('div', { className: 'column' })
        )
      );
    }
  }]);

  return Row;
}(React.Component);

var Results = function (_React$Component3) {
  _inherits(Results, _React$Component3);

  function Results() {
    _classCallCheck(this, Results);

    var _this3 = _possibleConstructorReturn(this, (Results.__proto__ || Object.getPrototypeOf(Results)).call(this));

    _this3.state = {
      messages: ['3UP', '5UP', '2UP', 'No Prize']
    };
    return _this3;
  }

  _createClass(Results, [{
    key: 'render',
    value: function render() {
      var shown = this.props.shown ? 'shown' : '';
      var classList = 'results ' + shown;
      return React.createElement(
        'div',
        { className: classList },
        this.state.messages[this.props.prize]
      );
    }
  }]);

  return Results;
}(React.Component);

// Render the app

ReactDOM.render(React.createElement(App, null), document.querySelector('.app'));