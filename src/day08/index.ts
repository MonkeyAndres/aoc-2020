enum InstructionCodes {
  acc = "acc",
  jmp = "jmp",
  nop = "nop",
}

interface Instruction {
  code: InstructionCodes;
  argument: number;
}

interface RAM {
  acc: number;
  pointer: number;
  log: number[];
  error: boolean;
}

const parseInstruction = (instruction: string): Instruction => {
  const [code, argument] = instruction.split(" ");
  return { code: code as InstructionCodes, argument: parseInt(argument, 10) };
};

const runBootInstructions = (instructions: Instruction[]): RAM => {
  const RAM: RAM = {
    acc: 0,
    pointer: 0,
    log: [],
    error: false,
  };

  while (true) {
    // Exit when infinite loop
    if (RAM.log.includes(RAM.pointer)) {
      RAM.error = true;
      break;
    }
    // Exit when trying to run an instruction out of range
    else if (RAM.pointer >= instructions.length) {
      break;
    }

    const { code, argument } = instructions[RAM.pointer];

    RAM.log.push(RAM.pointer);

    if (code === InstructionCodes.acc) {
      RAM.acc += argument;
    } else if (code === InstructionCodes.jmp) {
      RAM.pointer += argument;
      continue;
    } else if (code === InstructionCodes.nop) {
    }

    RAM.pointer += 1;
  }

  return RAM;
};

export const part1 = (input: string) => {
  const instructions: Instruction[] = input.split("\n").map(parseInstruction);

  const { acc } = runBootInstructions(instructions);

  return acc;
};

const getNextExecution = (
  instructions: Instruction[],
  latestChangedIndex: number
) => {
  let _instructions: Instruction[] = instructions.slice();

  for (let i = latestChangedIndex + 1; i <= _instructions.length; i++) {
    if (_instructions[i].code === InstructionCodes.nop) {
      _instructions[i] = { ..._instructions[i], code: InstructionCodes.jmp };

      return {
        instructions: _instructions,
        latestChangedIndex: i,
      };
    } else if (_instructions[i].code === InstructionCodes.jmp) {
      _instructions[i] = { ..._instructions[i], code: InstructionCodes.nop };

      return {
        instructions: _instructions,
        latestChangedIndex: i,
      };
    }
  }

  throw new Error("Program cannot be fixed");
};

export const part2 = (input: string) => {
  const instructions: Instruction[] = input.split("\n").map(parseInstruction);

  let nextExecution = getNextExecution(instructions, 0);
  let RAM = runBootInstructions(nextExecution.instructions);

  while (RAM.error) {
    nextExecution = getNextExecution(
      instructions,
      nextExecution.latestChangedIndex
    );

    RAM = runBootInstructions(nextExecution.instructions);
  }

  return RAM.acc;
};
