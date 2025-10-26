export const scrollToSection = (sectionId: string) => {
  // Check if we're on the home page
  if (window.location.pathname !== '/') {
    // If not on home page, navigate to home first, then scroll
    window.location.href = `/#${sectionId}`;
  } else {
    // If on home page, just scroll
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};