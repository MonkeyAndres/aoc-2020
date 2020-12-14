enum OperationTypes {
  UPDATE_MASK = "UPDATE_MASK",
  WRITE_VALUE = "WRITE_VALUE",
}

type FluxAction = { type: string; payload: { [k: string]: any } };

type DockingStore = {
  mask: string;
  mem: { [k: string]: string };
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
      payload: { position, value: parseInt(value, 10) },
    };
  });
};

const decimalToBin = (decimal: number) => decimal.toString(2).padStart(36, "0");

const binToDecimal = (bin: string) => parseInt(bin, 2);

const maskBinValue = (mask: string, bin: string) => {
  let newValue = "";

  for (let i = 0; i < mask.length; i++) {
    const maskValue = mask[i];

    if (maskValue !== "X") {
      newValue += maskValue;
    } else {
      newValue += bin[i];
    }
  }

  return newValue;
};

const dockingDataReducer = (
  store: DockingStore,
  { type, payload }: FluxAction
): DockingStore => {
  if (type === OperationTypes.UPDATE_MASK) {
    return { ...store, mask: payload.value };
  }

  if (type === OperationTypes.WRITE_VALUE) {
    const bin = decimalToBin(payload.value);
    const newValue = maskBinValue(store.mask, bin);

    return {
      ...store,
      mem: { ...store.mem, [payload.position]: binToDecimal(newValue) },
    };
  }

  return store;
};

export const part1 = (input: string) => {
  const actions = parseInput(input);

  let store: DockingStore = {
    mask: "",
    mem: {},
  };

  for (let action of actions) {
    store = dockingDataReducer(store, action);
  }

  return Object.values(store.mem).reduce(
    (sum, value) => sum + parseInt(value, 10),
    0
  );
};
