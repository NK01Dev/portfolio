declare module 'jspdf' {
  const jsPDF: any;
  export default jsPDF;
}

declare module 'html2canvas' {
  const html2canvas: (element: HTMLElement, options?: any) => Promise<HTMLCanvasElement>;
  export default html2canvas;
}
