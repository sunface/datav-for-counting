import React, { Dispatch, FC, SetStateAction } from 'react';
import { css } from 'emotion';
import { Button, Checkbox, stylesFactory, useTheme, HorizontalGroup } from 'src/packages/datav-core';
import { DatavTheme, SelectableValue } from 'src/packages/datav-core';
import { DashboardQuery } from '../types';
import { ActionRow } from './ActionRow';
import { FormattedMessage } from 'react-intl';

type onSelectChange = (value: SelectableValue) => void;

export interface Props {
  allChecked?: boolean;
  canDelete?: boolean;
  canMove?: boolean;
  deleteItem: () => void;
  hideLayout?: boolean;
  moveTo: () => void;
  onLayoutChange: Dispatch<SetStateAction<string>>;
  onSortChange: onSelectChange;
  onStarredFilterChange: onSelectChange;
  onTagFilterChange: onSelectChange;
  onToggleAllChecked: () => void;
  query: DashboardQuery;
  editable?: boolean;
}

export const SearchResultsFilter: FC<Props> = ({
  allChecked,
  canDelete,
  canMove,
  deleteItem,
  hideLayout,
  moveTo,
  onLayoutChange,
  onSortChange,
  onStarredFilterChange,
  onTagFilterChange,
  onToggleAllChecked,
  query,
  editable,
}) => {
  const showActions = canDelete || canMove;
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <div className={styles.wrapper}>
      {editable && <Checkbox value={allChecked} onChange={onToggleAllChecked} />}
      {showActions ? (
        <HorizontalGroup spacing="md">
          <Button disabled={!canMove} onClick={moveTo} icon="exchange-alt" variant="secondary">
            <FormattedMessage id="common.move"/>
          </Button>
          <Button disabled={!canDelete} onClick={deleteItem} icon="trash-alt" variant="destructive">
            <FormattedMessage id="common.delete"/>
          </Button>
        </HorizontalGroup>
      ) : (
        <ActionRow
          {...{
            hideLayout,
            onLayoutChange,
            onSortChange,
            onStarredFilterChange,
            onTagFilterChange,
            query,
          }}
          showStarredFilter
        />
      )}
    </div>
  );
};

const getStyles = stylesFactory((theme: DatavTheme) => {
  const { sm, md } = theme.spacing;
  return {
    wrapper: css`
      height: 35px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: ${sm};

      > label {
        height: 20px;
        margin: 0 ${md} 0 ${sm};
      }
    `,
  };
});
