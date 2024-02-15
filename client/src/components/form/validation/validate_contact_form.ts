import {
  SUBJECT_MIN_LENGTH,
  SUBJECT_MAX_LENGTH,
  MESSAGE_MIN_LENGTH,
  MESSAGE_MAX_LENGTH,
} from './validation_constants';
import {
  maxLength,
  minLength,
  mustHaveSelected,
  noNumbers,
  noSpecialChars,
  ValidationFunction,
} from './validation_rules';

/* 

💡 	Our validation functions are composed of an array of smaller validation rules.
	
	This way we only have to write the actual logic ONCE. See `validation_rules.ts` and `validation_rules.test.ts`

	With this design, it's easy to visually see that the code matches the spec for each input.

	This design also allows us to easily change the associated constants or mix/match rules on
	future components - each time we add a new rule, all inputs become more powerful
	as they can opt into using that rule.

*/

export const validateSubject: (value: string) => string[] = (value) => {
  const rules = [
    minLength(SUBJECT_MIN_LENGTH),
    maxLength(SUBJECT_MAX_LENGTH),
    noNumbers(),
    noSpecialChars(),
  ];

  return apply(rules, value);
};

export const validateMessage: (value: string) => string[] = (value) => {
  const rules = [
    minLength(MESSAGE_MIN_LENGTH),
    maxLength(MESSAGE_MAX_LENGTH),
    noSpecialChars(),
  ];

  return apply(rules, value);
};

export const validateReasonForContact: (value: string) => string[] = (
  value
) => {
  const rules = [mustHaveSelected()];

  return apply(rules, value);
};

const apply = (rules: ValidationFunction[], value: string) => {
  return (
    rules
      // this passes the value to each rule and builds an array of the results
      .map((r) => r(value))
      // then we filter out any "undefined", i.e. we only keep any error messages
      .filter(Boolean) as string[]
  );
};
