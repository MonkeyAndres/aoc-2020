enum OperationTypes {
  UPDATE_MASK = "UPDATE_MASK",
  WRITE_VALUE = "WRITE_VALUE",
}

type FluxAction = { type: string; payload: { [k: string]: any } };

type DockingStore = {
  mask: string;
  mem: { [k: string]: number };
};

const ASSIGNMENT_REGEXP = /^mem\[(\d+)\] = (\d+)$/;

const parseInput = (input: string): FluxAction[] => {
  const parsedInput = input.split("\n");

  return parsedInput.map((mem) => {
    const matches = mem.match(ASSIGNMENT_REGEXP);

    if (!matches) {
      const newMask = mem.split(" = ")[1];

      return { type: OperationTypes.UPDATE_MASK, payload: { value: newMask } };
    }

    const [_, position, value] = matches;

    return {
      type: OperationTypes.WRITE_VALUE,
      payload: { position: parseInt(position, 10), value: parseInt(value, 10) },
    };
  });
};

const decimalToBin = (decimal: number) => decimal.toString(2).padStart(36, "0");

const binToDecimal = (bin: string) => parseInt(bin, 2);

const createFerryDockingProgram = (input: string, reducer: Function) => {
  const actions = parseInput(input);

  let store: DockingStore = {
    mask: "",
    mem: {},
  };

  for (let action of actions) {
    reducer(store, action);
  }

  return Object.values(store.mem).reduce((sum, value) => sum + value, 0);
};

const dockingDataReducer = (
  store: DockingStore,
  { type, payload }: FluxAction
) => {
  if (type === OperationTypes.UPDATE_MASK) {
    store.mask = payload.value;
  } else if (type === OperationTypes.WRITE_VALUE) {
    const bin = decimalToBin(payload.value);
    let newValue = "";

    for (let i = 0; i < store.mask.length; i++) {
      const maskValue = store.mask[i];

      if (maskValue !== "X") {
        newValue += maskValue;
      } else {
        newValue += bin[i];
      }
    }

    store.mem[payload.position] = binToDecimal(newValue);
  }
};

export const part1 = (input: string) =>
  createFerryDockingProgram(input, dockingDataReducer);

const dockingDataReducerV2 = (
  store: DockingStore,
  { type, payload }: FluxAction
) => {
  if (type === OperationTypes.UPDATE_MASK) {
    store.mask = payload.value;
  } else if (type === OperationTypes.WRITE_VALUE) {
    const bin = decimalToBin(payload.position);

    let positions = [""];

    for (let i = 0; i < store.mask.length; i++) {
      const maskValue = store.mask[i];

      if (maskValue === "0") {
        positions = positions.map((position) => position + bin[i]);
      } else if (maskValue === "1") {
        positions = positions.map((position) => position + "1");
      } else if (maskValue === "X") {
        positions = positions.flatMap((position) => [
          position + "0",
          position + "1",
        ]);
      }
    }

    for (let position of positions) {
      const decimalPosition = binToDecimal(position);
      store.mem[decimalPosition] = payload.value;
    }
  }
};

export const part2 = (input: string) =>
  createFerryDockingProgram(input, dockingDataReducerV2);
