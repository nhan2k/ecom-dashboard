import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import * as React from 'react';

type TRole = 'VENDOR' | 'ADMIN';

interface NavItemsInterface {
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  label: string;
  link: string;
  divider?: boolean;
  roleNav: Array<TRole>;
}

interface MiniDrawerInterface {
  children: JSX.Element;
}

export { NavItemsInterface, MiniDrawerInterface, TRole };
