import {ComponentState} from './modules/component-state/component-state.enum';

export const ROUTES_WITHOUT_BACK_ARROW = ['menu', 'result'];

export const ROUTES_WITH_BIG_ANGULATOR = ['menu', 'auth', 'result', 'game'];

export const defineState = (items: any[]): ComponentState => {
  if (!items) {
    return ComponentState.Error;
  } else if (items.length > 0) {
    return ComponentState.Success;
  } else {
    return ComponentState.Empty;
  }
};
