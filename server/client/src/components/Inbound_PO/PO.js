import React, { Component } from "react";
import Quagga from "quagga";

const MyComponent = () => {
  return (
    <div>
      gg<div>gfgadfgaadsf</div>
    </div>
  );
};

export default MyComponent;

// import React, { Component } from "react";
// import AsyncSelect from "react-select/lib/Async";
// import { colourOptions } from "./data";

// const filterColors = inputValue =>
//   colourOptions.filter(i =>
//     i.label.toLowerCase().includes(inputValue.toLowerCase())
//   );

// const loadOptions = (inputValue, callback) => {
//   callback(filterColors(inputValue));
// };

// class WithCallbacks extends Component {
//   handleInputChange = newValue => {
//     const inputValue = newValue.replace(/\W/g, "");
//     this.setState({ inputValue });
//     return inputValue;
//   };

//   render() {
//     return (
//       <div>
//         <AsyncSelect
//           cacheOptions
//           loadOptions={loadOptions}
//           defaultOptions
//           onInputChange={this.handleInputChange}
//         />
//       </div>
//     );
//   }
// }

// export default WithCallbacks;
