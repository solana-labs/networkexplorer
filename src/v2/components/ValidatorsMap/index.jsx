// @flow
import GoogleMap from 'google-map-react';
import {get, map, uniqueId} from 'lodash/fp';
import {observer} from 'mobx-react-lite';
import React, {useState} from 'react';

import Marker from './Marker';
import mapStyle from './mapStyle';

const apiKey = process.env.REACT_APP_GOOGLE_MAP_KEY;
const defaultCenter = [0, 0];
const mapOptions = {
  disableDefaultUI: true,
  minZoom: 1,
  styles: mapStyle,
};

function isFullscreen(element) {
  return (
    (document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement) === element
  );
}

function requestFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullScreen) {
    element.msRequestFullScreen();
  }
}
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msCancelFullScreen) {
    document.msCancelFullScreen();
  }
}

function addStylesToZoomBtn(btn) {
  btn.style.width = '47px';
  btn.style.height = '40px';
  btn.style.fontSize = '40px';
  btn.style.color = '#00FFAD';
  btn.style.fontWeight = 'bold';
  btn.style.textAlign = 'center';
  btn.style.cursor = 'pointer';
}

function FullScreenControl(controlDiv, map, maps) {
  const controlWrapper = document.createElement('div');
  const fullscreenButton = document.createElement('div');
  fullscreenButton.style.marginRight = '22px';
  fullscreenButton.style.marginTop = '22px';
  fullscreenButton.style.cursor = 'pointer';
  fullscreenButton.innerHTML = `
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26 9.63636V2H18.3636M9.09091 2H2V9.63636M2 18.9091V26H9.63636M18.9091 26H26V18.9091" stroke="#00FFAD" stroke-width="4"/>
  </svg>
  `;
  controlDiv.appendChild(controlWrapper);
  controlWrapper.appendChild(fullscreenButton);
  const elementToSendFullscreen = map.getDiv().firstChild;
  maps.event.addDomListener(fullscreenButton, 'click', () => {
    if (isFullscreen(elementToSendFullscreen)) {
      exitFullscreen();
    } else {
      requestFullscreen(elementToSendFullscreen);
    }
  });
}

function ZoomControl(controlDiv, map, maps) {
  const controlWrapper = document.createElement('div');
  const zoomOutButton = document.createElement('div');
  const zoomInButton = document.createElement('div');
  controlDiv.appendChild(controlWrapper);
  controlWrapper.style.marginRight = '11px';
  addStylesToZoomBtn(zoomInButton);
  zoomInButton.innerText = '+';
  controlWrapper.appendChild(zoomInButton);
  addStylesToZoomBtn(zoomOutButton);
  zoomOutButton.innerText = '-';
  controlWrapper.appendChild(zoomOutButton);
  maps.event.addDomListener(zoomInButton, 'click', () =>
    map.setZoom(map.getZoom() + 1),
  );
  maps.event.addDomListener(zoomOutButton, 'click', () =>
    map.setZoom(map.getZoom() - 1),
  );
}

const renderMarkers = zoom =>
  map(marker => {
    return (
      <Marker
        key={uniqueId('marker')}
        lng={get('coordinates[0]')(marker)}
        lat={get('coordinates[1]')(marker)}
        scale={zoom}
        marker={marker}
      />
    );
  });

const ValidatorsMap = ({markers}: {markers: []}) => {
  const [zoom, setZoom] = useState(1);
  const apiIsLoaded = (googleMap, maps) => {
    const zoomControlDiv = document.createElement('div');
    const fullscreenControlDiv = document.createElement('div');
    new ZoomControl(zoomControlDiv, googleMap, maps);
    new FullScreenControl(fullscreenControlDiv, googleMap, maps);
    zoomControlDiv.index = 1;
    fullscreenControlDiv.index = 1;
    googleMap.controls[maps.ControlPosition.RIGHT_BOTTOM].push(zoomControlDiv);
    googleMap.controls[maps.ControlPosition.RIGHT_TOP].push(
      fullscreenControlDiv,
    );
    googleMap.addListener('zoom_changed', () => setZoom(googleMap.getZoom()));
  };
  return (
    <GoogleMap
      bootstrapURLKeys={{
        key: apiKey,
      }}
      defaultCenter={defaultCenter}
      defaultZoom={1}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({map, maps}) => apiIsLoaded(map, maps)}
      options={mapOptions}
    >
      {renderMarkers(zoom)(markers)}
    </GoogleMap>
  );
};

export default observer(ValidatorsMap);
