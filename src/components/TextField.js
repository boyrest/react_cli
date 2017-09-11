import React, {Component} from 'react';
import '../styles/TextField.less';

export default class TextField extends Component {
    constructor(props) {
        super(props);
        this.handleInpuChange = this
            .handleInpuChange
            .bind(this);
        this.state = {
            hasValue:false
        };
    }

    componentWillMount() {
        
    }

    handleInpuChange(e) {
        this.setState({
            hasValue: e.target.value? true : false
        })
    }

    render() {
        return (
            <div class="text-field">
                <img src={this.props.headerImg} class="text-field-header"/>
                <label className={this.state.hasValue?'float-text-title':'float-text'}>{this.props.floatingLabelText}</label>
                <input type={this.props.type} onChange={this.handleInpuChange}/>
            </div>
        )
    }
}
