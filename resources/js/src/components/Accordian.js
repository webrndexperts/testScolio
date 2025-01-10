import React, { useState } from 'react';

function Accordion() {
  const [openItem, setOpenItem] = useState(null);

  const toggleAccordion = (index) => {
    setOpenItem((prevOpenItem) => (prevOpenItem === index ? null : index));
  };

  return (
    <div>
      {Array.from({ length: numberOfItems }, (_, index) => (
        <div
          key={index}
          className={`js-acc-item ${openItem === index ? 'is-open' : ''}`}
        >
          <button
            className="js-acc-single-trigger"
            onClick={() => toggleAccordion(index)}
          >
            Toggle Accordion
          </button>
          {/* Other content for the accordion item goes here */}
        </div>
      ))}
    </div>
  );
}

export default Accordion;
