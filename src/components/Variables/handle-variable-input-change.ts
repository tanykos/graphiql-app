export default function handleVariableInputChange(
  ev: React.ChangeEvent<HTMLInputElement>,
  fieldType: 'name' | 'value',
  row: number,
  variables: string[][],
) {
  const orderInArray = fieldType === 'name' ? 0 : 1;
  variables[row - 1][orderInArray] = `${ev.target.value}`;
}

export function substituteVariables(inputValue: string, variables: string[][]) {
  let inputValueWithReplacements: string = inputValue;
  const variableRegexp = /\{{2}[^{]{1,}\}{2}/g;
  if (variableRegexp.test(inputValue)) {
    const varsInInputArray = inputValueWithReplacements.match(variableRegexp);
    if (!varsInInputArray) return inputValueWithReplacements;
    for (let i = 0; i < variables.length; i += 1) {
      for (let j = 0; j < varsInInputArray.length; j += 1) {
        const currentVarinArray = varsInInputArray[j].replace('{{', '').replace('}}', '');
        if (variables[i][0] === currentVarinArray) {
          inputValueWithReplacements = inputValueWithReplacements.replace(varsInInputArray[j], variables[i][1]);
        }
      }
    }
  }
  return inputValueWithReplacements;
}
