import React, { useContext, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

import { Context } from './Provider';
import { DropdownSection } from './Section';

export function DropdownRoot() {
  const {
    options, cachedId, getOptionById, targetId,
  } = useContext(Context);

  const cachedOption = useMemo(() => getOptionById(cachedId), [
    cachedId,
    getOptionById,
  ]);

  let [width, height, x] = [0, 0, 0];

  if (cachedOption) {
    const { optionCenterX, optionDimentions } = cachedOption;
    // console.log(cachedOption);

    width = optionDimentions?.width;
    height = optionDimentions?.height;
    x = optionCenterX - width / 2;
  }

  const [hovering, setHovering] = useState(false);

  const isActive = targetId !== null || hovering;

  return (
    <div className="dropdown-root">
      <motion.div
        className="dropdown-container"
        animate={{
          x,
          width,
          height,
        }}
        onHoverStart={() => setHovering(true)}
        onHoverEnd={() => setHovering(false)}
      >
        <motion.div
          animate={{
            x: -x,
          }}
        >
          {options.map((item) => (
            <DropdownSection key={item.id} option={item} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
