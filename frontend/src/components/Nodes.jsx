import * as React from "react";
import { TrayItem } from "./TrayItem";
import { MDBCard, MDBCardHeader, MDBCardBody } from "mdbreact";

/**
 * @author Dylan Vorster
 */
export class Nodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
      "Core" : ["danger", "#ff4444"],
      "Convolutional" : ["warning", "#ffbb33"],
      "Pooling" : ["success", "#00C851"],
      "Locally-Connected" : ["info", "#33b5e5"],
      "Recurrent" : ["default", "#2BBBAD"],
      "Embedding" : ["primary", "#4285F4"],
      "Merge" : ["secondary", "#aa66cc"],
      "Activation" : ["elegant", "#2E2E2E"],
      "Normalization" : ["stylish", "#4B515D"],
      "Noise" : ["unique", "#3F729B"]
    }
    var layerTypes = Object.keys(layersTypesToNodes);
    var panelCards = [];
    for (var i = 0; i < layerTypes.length; i++) {
      var layerType = layerTypes[i];
      var layerColor = layerTypeToColor[layerType][0];
      var layerColorHex = layerTypeToColor[layerType][1];
      var headerColor = layerColor + "-color";
      var kerasNodes = layersTypesToNodes[layerType];
      var nodes = [];
      
      for (var j = 0; j < kerasNodes.length; j++) {
        nodes.push(<TrayItem 
          model={{ type: "inout", color: layerColorHex, name: kerasNodes[j] }} 
          name={ kerasNodes[j] }></TrayItem>);
      }
       panelCards.push(
        <MDBCard color="special-color" border={layerColor} style={{ width: "22rem", marginTop: "1rem" }} className="text-center">
          <MDBCardHeader color={headerColor}>{ layerType } Layers</MDBCardHeader>
          <MDBCardBody> {nodes} </MDBCardBody>
        </MDBCard>
      );
    }

    return (
      <div className="tray">
        { panelCards }
      </div>
    )
  }
}