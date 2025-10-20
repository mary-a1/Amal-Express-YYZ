// lib/directions.ts

export const openDirections = (address: string, lat?: number, lng?: number) => {
  const destination = lat && lng 
    ? `${lat},${lng}` 
    : encodeURIComponent(address);

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);

  if (isIOS) {
    // Opens Apple Maps on iOS
    window.open(`maps://maps.apple.com/?daddr=${destination}`, '_blank');
  } else if (isAndroid) {
    // Opens Google Maps app on Android
    window.open(`geo:0,0?q=${destination}`, '_blank');
  } else {
    // Opens Google Maps in browser on desktop
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
  }
};