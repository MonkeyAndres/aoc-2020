enum EvasiveActionTypes {
  N = "N",
  S = "S",
  E = "E",
  W = "W",
  L = "L",
  R = "R",
  F = "F",
}

type Vector = [number, number];

type EvasiveAction = {
  action: EvasiveActionTypes;
  values: number;
};

type GenericBoatState = {
  position: Vector;
};

type NormalBoatState = GenericBoatState & {
  orientation: number;
};

type WayPointBoatState = GenericBoatState & {
  wayPoint: Vector;
};

const rotate = (orientation: number, values: number) => {
  let _orientation = (orientation + values) % 360;

  if (_orientation < 0) {
    _orientation += 360;
  }

  return _orientation;
};

const boatReducer = (initialState: NormalBoatState) => (
  state = initialState,
  { action, values }: EvasiveAction
): NormalBoatState => {
  let _state = { ...state };

  if (action === EvasiveActionTypes.N) {
    _state.position[1] += values;
  } else if (action === EvasiveActionTypes.S) {
    _state.position[1] -= values;
  } else if (action === EvasiveActionTypes.E) {
    _state.position[0] += values;
  } else if (action === EvasiveActionTypes.W) {
    _state.position[0] -= values;
  } else if (action === EvasiveActionTypes.R) {
    _state.orientation = rotate(_state.orientation, -values);
  } else if (action === EvasiveActionTypes.L) {
    _state.orientation = rotate(_state.orientation, values);
  } else if (action === EvasiveActionTypes.F) {
    if (_state.orientation === 90) {
      _state.position[1] += values;
    } else if (_state.orientation === 180) {
      _state.position[0] -= values;
    } else if (_state.orientation === 270) {
      _state.position[1] -= values;
    } else if (_state.orientation === 0) {
      _state.position[0] += values;
    }
  }

  return _state;
};

const createBoatRunner = (input: string, reducer: Function) => {
  const evasiveActions = input.split("\n");

  let store;

  for (let evasiveAction of evasiveActions) {
    const action = evasiveAction.slice(0, 1) as EvasiveActionTypes;
    const values = parseInt(evasiveAction.slice(1), 10);

    store = reducer(store, { action, values });
  }

  return Math.abs(store.position[0]) + Math.abs(store.position[1]);
};

export const part1 = (input: string) =>
  createBoatRunner(
    input,
    boatReducer({
      position: [0, 0],
      orientation: 0,
    })
  );

const rotateVector = (
  vector: [number, number],
  degrees: number
): [number, number] => {
  const rad = -degrees * (Math.PI / 180);

  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  return [
    Math.round(vector[0] * cos - vector[1] * sin),
    Math.round(vector[0] * sin + vector[1] * cos),
  ];
};

const createBoatWithWaypointStore = (initialState: WayPointBoatState) => (
  state = initialState,
  { action, values }: EvasiveAction
): WayPointBoatState => {
  const _state = { ...state };

  if (action === EvasiveActionTypes.N) {
    _state.wayPoint[1] += values;
  } else if (action === EvasiveActionTypes.S) {
    _state.wayPoint[1] -= values;
  } else if (action === EvasiveActionTypes.E) {
    _state.wayPoint[0] += values;
  } else if (action === EvasiveActionTypes.W) {
    _state.wayPoint[0] -= values;
  } else if (action === EvasiveActionTypes.R) {
    _state.wayPoint = rotateVector(_state.wayPoint, +values);
  } else if (action === EvasiveActionTypes.L) {
    _state.wayPoint = rotateVector(_state.wayPoint, -values);
  } else if (action === EvasiveActionTypes.F) {
    const [x, y] = _state.position;
    const [v1, v2] = _state.wayPoint;

    _state.position = [x + v1 * values, y + v2 * values];
  }

  return _state;
};

export const part2 = (input: string) =>
  createBoatRunner(
    input,
    createBoatWithWaypointStore({
      wayPoint: [10, 1],
      position: [0, 0],
    })
  );
