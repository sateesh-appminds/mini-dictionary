import React, { memo } from 'react';
import { IMeaningList } from '../../interfaces';

function MeaningsList({ meanings }:{meanings:IMeaningList[]}) {
  return (
    <ol className="meanings-list">
      {
        meanings.map(({ definition }, index) => <li key={index}>{definition}</li>)
      }
    </ol>
  );
}

export default memo(MeaningsList);
