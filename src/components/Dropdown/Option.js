import React, {
  useRef, useState, useContext, useEffect,
} from 'react';
import { motion } from 'framer-motion';

import { useDimentions } from './dimentions';
import { Context } from './Provider';

let lastOptionId = 0;

export function DropdownOption({ name, content: Content, backgroundHeight }) {
  const idRef = useRef(++lastOptionId);
  const id = idRef.current;

  const [optionHook, optionDimentions] = useDimentions();
  const [registered, setRegistered] = useState(false);

  const {
    registerOptions,
    updateOptionProps,
    deleteOptionById,
    setTargetId,
    targetId,
  } = useContext(Context);

  useEffect(() => {
    if (!registered && optionDimentions) {
      const WrappedContent = () => {
        const contentRef = useRef();

        useEffect(() => {
          const contentDimentions = contentRef.current.getBoundingClientRect();
          updateOptionProps(id, { contentDimentions });
        }, [updateOptionProps]);

        return (
          <div ref={contentRef}>
            <Content />
          </div>
        );
      };

      registerOptions({
        id,
        optionDimentions,
        optionCenterX: optionDimentions.x + optionDimentions.width / 2,
        WrappedContent,
        backgroundHeight,
      });

      setRegistered(true);
    } else if (registered && optionDimentions) {
      updateOptionProps(id, {
        optionDimentions,
        optionCenterX: optionDimentions.x + optionDimentions.width / 2,
      });
    }
  }, [
    registerOptions,
    id, registered,
    optionDimentions,
    updateOptionProps,
    deleteOptionById,
    backgroundHeight,
  ]);

  const handleOpen = () => setTargetId(id);
  const handleClose = () => setTargetId(null);
  const handleTouch = () => { window.isMobile = true; };
  const handleClick = (e) => {
    e.preventDefault();

    return targetId === id ? handleClose() : handleOpen();
  };

  return (
    <motion.button
      className="dropdown-option"
      type="button"
      ref={optionHook}
      onMouseDown={handleClick}
      onHoverStart={() => !window.isMobile && handleOpen()}
      onHoverEnd={() => !window.isMobile && handleClose()}
      onTouchStart={handleTouch}
      onFocus={handleOpen}
      onBlur={handleClose}
    >
      {name}
    </motion.button>
  );
}

export const tst = '';
