"use strict";

import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";
import {AnterosNavigationPage, AnterosImage, AnterosZoomable } from "anteros-react-native";

export class ZoomableExample extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Zoomable image",
    showBackButton: true
  };

  constructor(props) {
    super(props);
  }

  renderPage() {
    return (
            <AnterosZoomable
                zoomScale={5}
                onScrollOrZoom={(e) => alert('did that thing!')}
                tapToZoomOut="double"
            >
                <AnterosImage source={{ uri:'https://source.unsplash.com/RKsLQoSnuTc/960x720' }} style={{ width: 100, height: 100 }} />
            </AnterosZoomable>
    );
  }
}

