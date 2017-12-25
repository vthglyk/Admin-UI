import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { store } from '../../../index';
import { Provider } from 'react-redux';
import ModalContent from './modal-content';

export default class Modal extends Component {

    componentDidMount() {
        this.modaldiv = document.createElement('div');
        this.modaldiv.id = this.props.id;
        this.modaldiv.className = "modal fade";
        this.modaldiv.role = "dialog";
        document.body.appendChild(this.modaldiv);
        this._render();
    }

    componentWillUpdate() {
        this._render();
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.modaldiv);
        document.body.removeChild(this.modaldiv);
    }

    _render() {
        ReactDOM.render(
            <Provider store = {store}>
                <div className="modal-dialog">
                    <ModalContent>
                        {this.props.children}
                    </ModalContent>
                </div>
            </Provider>,
            this.modaldiv
        );
    }

    render() {
        return <noscript />;
    }
}