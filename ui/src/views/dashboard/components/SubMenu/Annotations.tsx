import React, { FunctionComponent, useEffect, useState } from 'react';
import { LegacyForms } from 'src/packages/datav-core';
const { LegacySwitch } = LegacyForms;

interface Props {
  annotations: any[];
  onAnnotationChanged: (annotation: any) => void;
}

export const Annotations: FunctionComponent<Props> = ({ annotations, onAnnotationChanged }) => {
  const [visibleAnnotations, setVisibleAnnotations] = useState([]);
  useEffect(() => {
    setVisibleAnnotations(annotations.filter(annotation => annotation.hide !== true));
  }, [annotations]);

  if (visibleAnnotations.length === 0) {
    return null;
  }

  return (
    <>
      {visibleAnnotations.map(annotation => {
        return (
          <div
            key={annotation.name}
            className={annotation.enable ? 'submenu-item' : 'submenu-item annotation-disabled'}
          >
            <LegacySwitch
              label={annotation.name}
              className="gf-form"
              checked={annotation.enable}
              onChange={() => onAnnotationChanged(annotation)}
            />
          </div>
        );
      })}
    </>
  );
};
