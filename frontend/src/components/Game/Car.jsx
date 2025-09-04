
const Car = ({ color, ...props }) => {
  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 48 48" style="enable-background:new 0 0 48 48;" xml:space="preserve">
    <g>
    </g>
    <g>
	<path fill= {color} d="M7.127,38c-1.352,0-2.535-0.897-2.893-2.201C3.669,33.748,3,30.217,3,25s0.669-8.748,1.234-10.799   C4.592,12.897,5.775,12,7.127,12h34.025c2.375,0,4.414,1.666,4.899,3.991C46.533,18.306,47,21.46,47,25s-0.467,6.694-0.95,9.009   C45.565,36.334,43.527,38,41.152,38H7.127z"/>
	<path fill= "#000000ff" d="M29,30l5,4l0,0c0,0,1-3.955,1-9s-1-9-1-9l0,0l-5,4V30z"/>
	<path fill= "#000000ff" d="M13,20l-4-4c0,0-1,3.062-1,8.996S9,34,9,34l4-4V20z"/>
	<polygon fill= "#000000ff" points="26,33 15.568,33 12.568,36 29.548,36  "/>
	<polygon fill= "#000000ff" points="26,17 15.568,17 12.568,14 29.548,14  "/>
	<rect x="30" y="9" fill = {color}  width="2" height="4"/>
	<rect x="30" y="37" fill = {color}  width="2" height="4"/>
    </g>
    <g>
    </g>
    </svg>
  );
};

export default Car;