'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var container = exports.container = function container(name, action) {
	var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	var pathArr = opts.pathArr,
	    componentArr = opts.componentArr,
	    obj = opts.obj;

	var actionType = componentArr.join('_').toUpperCase() + '_GET';
	var data = '' + action + name[0].toUpperCase() + name.slice(1);
	var contents = '';
	contents += 'import React, { Component, Fragment } from \'react\';;\n';
	contents += 'import PropTypes from \'prop-types\';\n';
	contents += 'import { bindActionCreators } from \'redux\';\n';
	contents += 'import { connect } from \'react-redux\';\n';
	contents += 'import * as creators from \'@actions/' + action + '\';\n';
	contents += 'import * as types from \'@constants/actions/' + action + '\';\n';
	contents += '// \u516C\u7528\u7EC4\u4EF6\n';
	contents += '// import SetTitle from \'@components/_common/SetTitle/SetTitle\';\n';
	contents += '// \u4E1A\u52A1\u7EC4\u4EF6\n';
	contents += '\n';
	contents += 'class Container extends Component {\n';
	contents += '\tconstructor(...params) {\n';
	contents += '\t\tsuper(...params);\n';
	contents += '\t}\n';
	contents += '\tcomponentDidMount() {\n';
	contents += '\t\tthis.loadData(this.props);\n';
	contents += '\t}\n';
	contents += '\tloadData($props){\n';
	contents += '\t\treturn;\n';
	contents += '\t\tif ($props.' + data + '.isFetching === 0) {\n';
	contents += '\t\t\tlet url = types.' + actionType + ';\n';
	contents += '\t\t\tlet param = {};\n\n';
	contents += '\t\t\tlet params = {\n';
	contents += '\t\t\t\tparam: param,\n';
	contents += '\t\t\t\tajaxType: \'GET\',\n';
	contents += '\t\t\t\tonSuccess: (res) => {\n';
	contents += '\t\t\t\t\t//\n';
	contents += '\t\t\t\t},\n';
	contents += '\t\t\t\tonError: (res) => {\n';
	contents += '\t\t\t\t\t//\n';
	contents += '\t\t\t\t}\n';
	contents += '\t\t\t};\n';
	contents += '\t\t\t$props.actions.request(url, params, {});\n';
	contents += '\t\t}\n';
	contents += '\t}\n';
	contents += '\trender() {\n';
	contents += '\t\treturn (\n';
	contents += '\t\t\t<div>\n';
	contents += '\t\t\t\ttest\n';
	contents += '\t\t\t</div>\n';
	contents += '\t\t);\n';
	contents += '\t}\n';
	contents += '};\n\n';
	contents += 'Container.propTypes = {};\n\n';
	contents += 'function mapStateToProps(state) {\n';
	contents += '\treturn {\n';
	contents += '\t\t' + data + ': state.' + data + ',\n';
	contents += '\t};\n';
	contents += '}\n\n';
	contents += 'function mapDispatchToProps(dispatch) {\n';
	contents += '\treturn {\n';
	contents += '\t\tactions: bindActionCreators(creators, dispatch)\n';
	contents += '\t};\n';
	contents += '}\n\n';
	contents += 'export default connect(mapStateToProps, mapDispatchToProps)(Container);\n';
	return contents;
};