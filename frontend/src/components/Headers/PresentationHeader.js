/*eslint-disable*/
import React from "react";

// reactstrap components

// core components

function PresentationHeader() {
  return (
    <>
      <div className="page-header clear-filter">
        <div
            style={{
              backgroundImage:
                  "url(" +
                  require("assets/img/carey-building-hero.jpg") +
                  ")",
              backgroundSize: 'cover',   // Make the background image cover the entire div
              backgroundPosition: 'center',  // Center the background image
              backgroundRepeat: 'no-repeat',  // Do not repeat the background image
              height: '100%',  // Set the height to 100% of its parent
              width: '100%'  // Set the width to 100% of its parent
            }}
        >
          <div style={{
            display: 'flex', // Enable flexbox
            justifyContent: 'center', // Center horizontally
            alignItems: 'center', // Center vertically
            height: '100%', // Take full height of the parent container
            width: '100%', // Take full width of the parent container
            position: 'relative' // Positioning context for the absolute child
          }}>
            <h1 style={{
              position: 'absolute', // Position absolutely to allow precise positioning
              top: '30%', // Start at 30% from the top
              left: '50%', // Start at 50% from the left
              transform: 'translate(-50%, -50%) translateY(-0px)', // Shifts the element to be truly centered and move up 20px
              background: 'linear-gradient(to bottom, #FFFFFF 35%, #75a6c3 100%)', // Background gradient
              WebkitBackgroundClip: 'text', // Apply clipping to text
              WebkitTextFillColor: 'transparent', // Make text fill transparent
              fontSize: '9em', // Large font size
              marginBottom: '10px', // Margin at the bottom
              textTransform: 'uppercase', // Uppercase letters
              fontWeight: '700', // Bold font
              fontFamily: "'Open Sans Condensed', sans-serif", // Font family
              zIndex: 1, // Stack order
              letterSpacing: '-10px', // Letter spacing
              textAlign: 'center', // Center text horizontally
              lineHeight: '1.15', // Line height
              marginTop: '0', // No top margin
              boxSizing: 'border-box', // Border box model
              marginBlockStart: '0.67em', // Top margin
              marginBlockEnd: '0.67em', // Bottom margin
              marginInlineStart: '0px', // Left margin
              marginInlineEnd: '0px', // Right margin
            }} data-rellax-speed="-1">
              RAGOPENAI
            </h1>
          </div>

          <h3 className="h3-description rellax-text" data-rellax-speed="-1">
            Try to use and understand OEPNAI's API
          </h3>

        </div>


        <h6
            className="category category-absolute rellax-text"
            data-rellax-speed="-1"
        >
          Created by{" "}Sandipan Majhi, For any issues contact : smajhi1@jh.edu

        </h6>
      </div>
    </>
  );
}

export default PresentationHeader;
