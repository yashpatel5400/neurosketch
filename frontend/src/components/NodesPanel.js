import React from 'react';
import { MDBBtn, MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardText, NavbarBrand } from "mdbreact";
import { DragWrapper } from './DragWrapper';
import { OutputNodeWidget } from './nodes/output/OutputNodeWidget';
import { InputNodeWidget } from './nodes/input/InputNodeWidget';
import { ConnectionNodeWidget } from './nodes/connection/ConnectionNodeWidget';

class Node extends React.Component {
  renderNode() {
    const { type, color, name } = this.props;

    if (type === 'output') {
      return <OutputNodeWidget node={{ name: name }} displayOnly />;
    }
    if (type === 'input') {
      return <InputNodeWidget node={{ name: name }} displayOnly />;
    }
    if (type === 'connection') {
      return <ConnectionNodeWidget node={{ name: name }} color={color} displayOnly />;
    }
    console.warn('Unknown node type');
    return null;
  }

  render() {
    const { type, color, name } = this.props;
    
    return (
      <DragWrapper type={type} color={color} style={{ display: 'inline-block' }}>
        {this.renderNode()}
      </DragWrapper>
    );
  }
}

export class NodesPanel extends React.Component {
  render() {
    const { selectedNode, onShow, onUndo, onRedo, canUndo, canRedo } = this.props;

    const layersTypesToNodes = {
      "Core" : [
        "Dense",
        "Activation",
        "Dropout",
        "Flatten",
        "Input",
        "Reshape",
        "Permute",
        "RepeatVector",
        "Lambda",
        "ActivityRegularization",
        "Masking",
        "SpatialDropout1D",
        "SpatialDropout2D",
        "SpatialDropout3D"
      ],

      "Convolutional" : [
        "Conv1D",
        "Conv2D",
        "Conv3D",
        "SeparableConv1D",
        "SeparableConv2D",
        "DepthwiseConv2D",
        "Conv2DTranspose",
        "Conv3DTranspose",
        "Cropping1D",
        "Cropping2D",
        "Cropping3D",
        "UpSampling1D",
        "UpSampling2D",
        "UpSampling3D",
        "ZeroPadding1D",
        "ZeroPadding2D",
        "ZeroPadding3D"
      ],

      "Pooling" : [
        "MaxPooling1D",
        "MaxPooling2D",
        "MaxPooling3D",
        "AveragePooling1D",
        "AveragePooling2D",
        "AveragePooling3D",
        "GlobalMaxPooling1D",
        "GlobalMaxPooling2D",
        "GlobalMaxPooling3D",
        "GlobalAveragePooling1D",
        "GlobalAveragePooling2D",
        "GlobalAveragePooling3D"
      ],

      "Locally-Connected" : [
        "LocallyConnected1D",
        "LocallyConnected2D"
      ],

      "Recurrent" : [
        "RNN",
        "SimpleRNN",
        "SimpleRNNCell",
        "GRU",
        "GRUCell",
        "LSTM",
        "LSTMCell",
        "ConvLSTM2D",
        "CuDNNGRU",
        "CuDNNLSTM"
      ],

      "Embedding" : [
        "Embedding"
      ],

      "Merge" : [
        "Add",
        "Subtract",
        "Multiply",
        "Average",
        "Maximum",
        "Concatenate",
        "Dot"
      ],

      "Activation" : [
        "LeakyReLU",
        "PReLU",
        "ReLU",
        "ELU",
        "ThresholdedReLU",
        "Softmax"
      ],

      "Normalization" : [
        "BatchNormalization"
      ],

      "Noise" : [
        "GaussianNoise",
        "GaussianDropout",
        "AlphaDropout"
      ]
    }

    var layerTypeToColor = {
      "Core" : "danger",
      "Convolutional" : "warning",
      "Pooling" : "success",
      "Locally-Connected" : "info",
      "Recurrent" : "default",
      "Embedding" : "primary",
      "Merge" : "secondary",
      "Activation" : "elegant",
      "Normalization" : "stylish",
      "Noise" : "unique"
    }

    var layerTypes = Object.keys(layersTypesToNodes);
    var panelCards = [];
    for (var i = 0; i < layerTypes.length; i++) {
      var layerType = layerTypes[i];
      var layerColor = layerTypeToColor[layerType];
      var headerColor = layerColor + "-color";
      var kerasNodes = layersTypesToNodes[layerType];
      var nodes = [];
      for (var j = 0; j < kerasNodes.length; j++) {
        nodes.push(<Node type='connection' color='#007E33' name={ kerasNodes[j] } />);
      }

      panelCards.push(
        <MDBCard color="special-color" border={layerColor} style={{ width: "22rem", marginTop: "1rem" }} className="text-center">
          <MDBCardHeader color={headerColor}>{ layerType } Layers</MDBCardHeader>
          <MDBCardBody> {nodes} </MDBCardBody>
        </MDBCard>
      );
    }    

    return (
      <div className='nodes-panel'>
        <NavbarBrand>
          <strong className="white-text">NeuroSketch</strong>
        </NavbarBrand>

        <hr />

        <MDBBtn outline color="info" onClick={onUndo} disabled={!canUndo}><i className="fa fa-undo" aria-hidden="true"></i></MDBBtn>
        <MDBBtn outline color="info" onClick={onRedo} disabled={!canRedo}><i className="fa fa-repeat" aria-hidden="true"></i></MDBBtn>
        <MDBBtn outline color="info" onClick={onShow}><i className="fa fa-save" aria-hidden="true"></i></MDBBtn>

        <hr />
        
        <div className='node-wrapper'>
          <Node type='output' name='Data Node' />
        </div>

        { panelCards }

        <div className='node-wrapper'>
          <Node type='input' name='Output Node' />
        </div>
      </div>
    );
  }
}
