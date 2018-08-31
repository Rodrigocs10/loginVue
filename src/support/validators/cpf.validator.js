// // https://gist.github.com/IgorDePaula/86357e3a19730833fd56cdf46e03c73f
import CpfValidate from "./rules/cpf.rules.js";
const validator = {
  getMessage(field, args) {
    // will be added to default English messages.
    return "Invalid CPF";
  },
  validate(value, args) {
    return CpfValidate(value);
  }
};
export default validator;
