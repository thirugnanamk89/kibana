/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { DraggableWrapper, DragEffects } from '../../drag_and_drop/draggable_wrapper';
import { Anomaly } from '../types';
import { IS_OPERATOR } from '../../timeline/data_providers/data_provider';
import { Provider } from '../../timeline/data_providers/provider';
import { Spacer } from '../../page';
import { getScoreString } from './get_score_string';

export const DraggableScore = React.memo<{
  id: string;
  index: number;
  score: Anomaly;
}>(
  ({ id, index, score }): JSX.Element => (
    <DraggableWrapper
      key={id}
      dataProvider={{
        and: [],
        enabled: true,
        id,
        name: score.entityName,
        excluded: false,
        kqlQuery: '',
        queryMatch: {
          field: score.entityName,
          value: score.entityValue,
          operator: IS_OPERATOR,
        },
      }}
      render={(dataProvider, _, snapshot) =>
        snapshot.isDragging ? (
          <DragEffects>
            <Provider dataProvider={dataProvider} />
          </DragEffects>
        ) : (
          <>
            {index !== 0 && (
              <>
                {','}
                <Spacer />
              </>
            )}
            {getScoreString(score.severity)}
          </>
        )
      }
    />
  )
);
